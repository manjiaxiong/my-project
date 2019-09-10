const express = require('express')
const swig = require('swig')//用于设置模板
const mongoose = require('mongoose')
const bodyParser=require('body-parser');//用于处理post put请求的参数
// const Cookies=require('cookies');
const session=require('express-session');
//app代表整个应用
const app = express()
const port = 3000
//1.连接数据库
mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true })
//解决findOneAndUpdate方法的警告
mongoose.set('useFindAndModify', false)
//获取db对象
const db = mongoose.connection

//连接数据库失败
db.on('error', (err) => {
    console.log('connection db error:',err)
    throw err
})
//连接数据库
db.once('open', () => {
    console.log('connection db success');
})


//静态资源
//所有静态资源会去public目录下面的资源
//请求的是一个目录 去目录下面找index.html并返回index.html
//找不到继续向下找
app.use(express.static('./public'))


//为了处理post请求的参数，设置的bodyParser中间件
//解析json
app.use(bodyParser.json());
//解析urlencoded内容
app.use(bodyParser.urlencoded({ extended: false }));
//bodyParser中间件执行完毕后 会把post、put请求携带的参数保存在res.body上



//-------------------------------模板设置开始

//1开发阶段设置不走缓存
swig.setDefaults({
  // cache: 'memory'
  cache:false
})
//2配置应用模板
//第一个参数是模板名称,同时也是模板文件的扩展名
//第二个参数是解析模板的方法
app.engine('html', swig.renderFile)

//3配置模板的存放目录
//第一参数必须是views
//第二个参数是模板存放的目录
app.set('views', './views')

//4注册模板引擎
//第一个参数必须是view engine
//第二个参数是模板名称,也就是app.engine的第一个参数
app.set('view engine', 'html')
//设置后就可以调用res.render方法渲染模板
//-------------------------------模板设置结束


//设置cookie中间件

// app.use((req,res,next)=>{
// 	//生成cookies对象并且保存到req对象
// 	req.cookies=new Cookies(req,res);
// 	let userInfo={}
// 	if(req.cookies.get('userInfo')){
// 		userInfo=JSON.parse(req.cookies.get('userInfo'));
// 	}
// 	req.userInfo=userInfo;
// 	next();
// })

//设置session中间件
const MongoStore = require("connect-mongo")(session);

app.use(session({
    //设置cookie名称
    name:'kzid',
    //用它来对session cookie签名，防止篡改
    secret:'abc',
    //强制保存session即使它并没有变化
    resave: true,
    //强制将未初始化的session存储
    saveUninitialized: true, 
    //如果为true,则每次请求都更新cookie的过期时间
    rolling:true,
    //cookie过期时间 1天
    cookie:{maxAge:1000*60*60*24},
    //设置session存储在数据库中
    store:new MongoStore({ mongooseConnection: mongoose.connection })
}))
 
app.use((req,res,next)=>{
	//生成cookies对象并且保存到req对象
	req.userInfo=req.session.userInfo||{};

	next();
})
//-------------------------------路由设置开始
 //从上向下匹配以指定路径开头
 //匹配到后再匹配路由对象的路径
 //以、/user/register为例
 //首先匹配到/去./routes/index.js的router对象上去找/user/register
 //找不到继续向下执行 匹配到/user 去./routes/user.js上的router对象找/register
app.use("/",require('./routes/index.js'))
app.use("/user",require('./routes/user.js'))
app.use("/admin",require('./routes/admin.js'))//管理员与用户列表在一块
app.use("/home",require('./routes/home.js'))
app.use("/category",require('./routes/category.js'))
app.use("/article",require('./routes/article.js'))
app.use("/comment",require('./routes/comment.js'))

app.listen(port, () => console.log(`app listening on port ${port}!`))








