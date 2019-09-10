(function($){
	function init($elem){
		this.$elem=$elem;
		this.$elem.removeClass('transition');
		this.clientX=parseFloat(this.$elem.css('left'));
		this.clientY=parseFloat(this.$elem.css('top'));
	}
	function to(x,y,callback){
		x= (typeof x=='number') ? x :this.clientX;
		y= (typeof y=='number') ? y :this.clientY;
		if(this.clientX==x && this.clientY==y) return;
		//触发改变前事件
		this.$elem.trigger('move');
		typeof callback=='function' &&callback();
		//触发改变后事件
		this.$elem.trigger('moved');
		//更新clientX clientY
		this.clientX=x;
		this.clientY=y;
	}
	//共通结束
	function Slient($elem){
		// 初始化
		init.call(this,$elem);
	}
	Slient.prototype={
		constructor:Slient,
		to:function(x,y){
			to.call(this,x,y,function(){
				this.$elem
				.css({
					top:y,
					left:x
				})
			}.bind(this))
		},
		x:function(x){
			this.to(x);
		},
		y:function(y){
			this.to(null,y);
		}
	};
	function JS($elem){
		// 初始化
		init.call(this,$elem);
	}
	JS.prototype={
		constructor:JS,
		to:function(x,y){
				to.call(this,x,y,function(){
				this.$elem
				.stop()
				.animate({
					top:y,
					left:x
				})
			}.bind(this))
		},
		x:function(x){
			this.to(x);
		},
		y:function(y){
			this.to(null,y);
		}
	}
		//获取运行动画的方法
	function getmove($elem,options){
		if(options.js){//初始化方法
			move=new JS($elem);
		}else{
			move=new Slient($elem);
		}
		// return move;
		return{
			to:move.to.bind(move),
			x:move.x.bind(move),
			y:move.y.bind(move)
		}
	}
 
	var DEFAULTS = {
		js:true
	}

	//暴露showHide插件
	$.fn.extend({
		move:function(options,x,y){
			//遍历元素,实现隐式迭代
			return this.each(function(){//实现单例模式
				var $elem = $(this);
				var moveObj = $elem.data('moveObj');
				if(!moveObj){
					options = $.extend({},DEFAULTS,options);
					moveObj = getmove($elem,options);
					$elem.data('moveObj',moveObj);
				}
				//第一次之后进入该函数则是调用move的动画方法
				if(typeof moveObj[options] == 'function'){
					moveObj[options](x,y);
				}
			})
		}
	})
})(jQuery)