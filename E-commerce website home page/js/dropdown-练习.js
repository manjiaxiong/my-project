(function($){
	function Dropdown($elem,options){
		//罗列属性
		this.$elem=$elem;
		this.options=options,
		this.layer=this.$elem.find('.dropdown-layer');
		this.activeClass = this.$elem.data('active') + "-active";
		this.timer=null;
		//初始化
		this.init();
	}
	Dropdown.prototype={
		constructor:Dropdown,
		init:function(){
			//1初始化下拉层
			this.layer.showHide(this.options);
			//监听自定义事件
			this.layer.on('show shown hide hidden',function(ev){
					this.$elem.trigger('dropdown-' + ev.type)
				}.bind(this));
			//绑定事件
			if(this.options.eventm=='click'){
				this.$elem.on('click',function(ev){
					ev.stopPropagation();
					this.show();
					$(document).on('click',function(){
						this.hide()
					})
				})
			}else{
				this.$elem.hover($.proxy(this.show,this),$.proxy(this.hide,this))
			}
		},
		show:function(){
			if(this.options.delay){
				clearTimeout(this.timer);
				this.timer=setTimeout(function(){
					this.layer.showHide('show');
					this.$elem.addClass(this.activeClass);
				}.bind(this),this.options.delay);
			}else{
					this.layer.showHide('show');
					this.elem.addClass(this.activeClass);
			}
			
			
		},
		hide:function(){
			clearTimeout(this.timer);
			this.layer.showHide('hide');
			//隐藏时移除对应class
			this.$elem.removeClass(this.activeClass);
		}
	}
	//默认样式
	var DEFAULT={
		js:true,
		mode:'fade'
	}
	//暴露
$.fn.extend({
	dropdown:function(options){
		//1.实现隐式迭代
		return this.each(function(){//实现单例模式
			var $elem = $(this);
			var dropdown = $elem.data('dropdown');
			if(!dropdown){
				options = $.extend({},Dropdown.DEFAULTS,options);
				dropdown = new Dropdown($elem,options);
				//将实例信息存储在当前dom节点上
				$elem.data('dropdown',dropdown);
			}
			//第二次调用dropdown则是调用实例上的方法
			if(typeof dropdown[options] == 'function'){
				dropdown[options]();
			}
		})
	}
})
})($)