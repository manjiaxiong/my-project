const path=require('path');
const fs=require('fs');
const util=require('util');
const dataPath = path.normalize(__dirname+'./../data/item.json');
const readFile=util.promisify(fs.readFile)
const writeFile=util.promisify(fs.writeFile)
const UserModel=require('./../modules/users.js')
async function get(){
	const data=await UserModel.find({})
	console.log("data11111111111",data)
	return data
}
async function add(task){
   
   /*
   //1读取数据文件
   const data=await readFile(dataPath);
   //2将读取文件的字符串转化为数组
    const arr = JSON.parse(data)
   //3根据参数任务生成对象并且将任务插入数组
   const obj={
   	id:Date.now().toString(),
   	task:task
   }
   arr.push(obj)
   // console.log(arr)
   //4新数组转化为字符串   //把字符串覆盖写入到数据文件
   await writeFile(dataPath, JSON.stringify(arr));
  
   //5返回任务对象
   return obj
   */
  const obj={
   	_id:Date.now().toString(),
   	task:task
   }
   UserModel.insertMany({id:obj.id,task:obj.task})
   return obj
}
async function del(id){
	/*
	console.log(id)
	//1读取文件
	const data=await readFile(dataPath);
	//2把文件转换成数组
	 const arr = JSON.parse(data)
	//3根据id删除数组中对应的数据
	const newArr=arr.filter((item)=>{
		return item.id !=id;
	})
	//4把新数组转换为字符串，并写进数据
	await writeFile(dataPath, JSON.stringify(newArr));
	*/
	console.log(id)
	UserModel.deleteOne({id:id})
	.then(data=>{
		console.log(data)
	})
	.catch(err=>{
		console.log("err",err)
	})
}
module.exports={
	get,
	add,
	del
}