;(function($){
	var $input=$('.todo-input');
  var $wrap=$('.todo-wrap');
 //添加
	$input.on('keydown',function(ev){
		if(ev.keyCode == 13){
            //1发送ajax
           $.ajax({
           	url:'/item/add',
           	dataType:"json",
           	type:'post',
           	data:{
                    task:$input.val()
                },
            success:function(result){
                 //2根据返回结果做相应的处理
                 //2.1成功时，后台返回任务对象，根据任务对象的结果生成DOM节点
                 console.log(111)
                 if(result.code==0){
                  var data=result.data;
                  // console.log(data)
                  var $DOM=$(`<li class="todo-item" data-id=${data.id}>${data.task}</li>`);
                  $wrap.append($DOM);
                  $input.val("");
                 }else{ //2.2失败弹出消息
                    alert(' add is fail')
                 }
                
               
                }
           })
        }
	})
//删除
  //注意动态添加，所以需要事件代理
  $wrap.on('click','li',function(){
    var $this=$(this);
    $.ajax({
       url:'/item/del/'+$this.data('id'),
      dataType:'json',
      success:function(result){
        // console.log($this.data('id'))
       //前端删除节点    
        if(result.code==0){//成功
             $this.remove()
        }else{
          alert('删除失败')
        }
      }
    })
  })
})(jQuery)