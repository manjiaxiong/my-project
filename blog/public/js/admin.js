;(function($){
	$('.delete').on('click',function(){
		if(!window.confirm("您确认要删除吗?")){
            return false
        }
	})
})(jQuery)