;(function ($){
	$.fn.extend({ 
		pagination:function(options){
			var $elem=this;
			// console.log(this) 
			$elem.on('click','a',function(){
				var $this=$(this)
				//获取当前页，根据当前页计算请求页码
				//1获取当前页\
				// console.log(this)
				var currentPage=$elem.find('.active a').html()//获取当前页
				//2根据当前页计算请求页码
				var labelText=$this.attr('aria-label');//点击时是否为上下页翻页
				if(labelText=='Previous'){
					page=currentPage-1;
				}else if(labelText=="Next"){
					page=currentPage*1+1;
				}else{
					page=$this.html()
				}
				// console.log(page)
				//如果点击当前页面阻止请求
				if(page==currentPage){
					return false
				}
				var url = options.url+"?page="+page
                var id = $elem.data('id');//得到当前分类 (list时)
                console.log(id)
                if(id){
                    url = url + "&id="+id
                }
				$.ajax({
					url:url,
					dataType:"json"
				})
				.done(function(result){
					// console.log(result)
					if(result.status==0){
						$elem.trigger('get-data',result.data)//返回成功触发写入事件
					}
				})
				.fail(function(err){
					alert("请求失败 请再试一下")
				})
			})
		}
	})
})(jQuery)