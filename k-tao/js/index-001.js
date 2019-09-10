(function($){ 
	var $DropLi=$('.dropdown-li');
	$DropLi.hover(function(){
		// $(this).addClass('menu-active');
		// console.log(this); 这个this是DOM节点
		// console.log($(this).data('active'));
		var oCloss=$(this).data('active')+'-active';
		$(this).addClass(oCloss);
	},function(){
		// $(this).removeClass('menu-active');
		var oCloss=$(this).data('active')+'-active';
		$(this).removeClass(oCloss);
	})
})(jQuery)