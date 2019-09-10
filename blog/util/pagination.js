 /*
page:当前页
model：模型
query：条件
sort：排序方式
projection:投影
*/
 
async function pagination(options){
	/*
 
        分页分析：
        前提条件：要知道获取第几页，前端发送参数，page=？
        约定：每页显示几条数据，约定好每页显示两条数据limit=2
        第一页：显示第一条第二条（跳过0条）skip(0) limit(2)
        第二页：显示第三条第四条。。。。。（跳过2条）skip(2)limit(2)
        第三页：跳过四条显示5,6条 skip(4)limit(2) 
        第page 页skin(page-1)*limit
        populates:是一个数组

*/
    let {page,model,query,sort,projection,populates}=options
    const limit=2;
    page=parseInt(page);
    if(isNaN(page)){
        page=1
    }

    //上一页边界控制
    if(page==0){
        page=1;
    } 
    //生成页码数组
    const count= await model.countDocuments(query)//按条件查询总数
   
    const pages=Math.ceil(count / limit);//总页数
    
    //下一页边界
    if(page>pages){
        page=pages
    }
    if(page==0){
        page=1;
    }
    // console.log(page)
    // console.log(pages)
    const list=[];
    for(let i=1;i<=pages;i++){
        list.push(i)
    }
    const skip=(page-1)*limit;

    let result= model.find(query,projection) 
    // console.log("result::::::",result) 
    //关联处理
    if(populates){
        populates.forEach(populate=>{
            result = result.populate(populate)//异步
        })
    }
    const docs=await result.sort(sort).skip(skip).limit(limit);
    return {
    	docs:docs,//数据
    	page:page,
    	list:list,//页数数据
        pages:pages//总页数
    }

}

module.exports=pagination;