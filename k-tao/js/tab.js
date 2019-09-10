(function($){

function Tab($elem,options){
	//1.罗列属性
	this.$elem = $elem;
	this.options = options;
	this.tabItems=this.$elem.find('.tab-item');
	this.tabPanels=this.$elem.find('.tab-panel');
	this.itemsLength=this.tabItems.length;
	this.now = this._getCorrectIndex(this.options.activeIndex);
	this.timer = 0;
	// console.log(this.itemsLength)
	//2.初始化
	this.init();
}
Tab.prototype = {
	constructor:Tab,
	init:function(){
		var _this=this;
		//1.选中默认标签和显示默认商品
		this.tabItems.eq(this.now).addClass('tab-item-active');
		this.tabPanels.eq(this.now).show();
		// this.$elem.trigger('tabShow',[this.now,this.tabPanels.eq(this.now)]);
		//2.初始化商品
		this.tabPanels.showHide(this.options);
		// console.log(this.tabPanels.showHide('show'))
		//监听选项卡显示隐藏状态事件
		this.$elem.trigger('tabShow',[this.now,this.tabPanels.eq(this.now)]);
		this.tabPanels.on('show',function(ev){
			_this.$elem.trigger('tabShow',[_this.tabPanels.index(this),this]);
		})
		//3.确定事件类型
		var evType=''
		if(this.options.eventName=='click'){
			evType='click';
		}else{
			evType='mouseenter';
		}

		//4处理事件委托
		
		this.$elem.on(evType,'.tab-item',function(){
			var index=_this.tabItems.index(this);
			// console.log(index)
			_this._toggle(index);
		});
		//5.是否自动轮播
		if(this.options.autoplay){
			this.autoplay();
			//6.鼠标移入容器停止轮播移出开始轮播
			this.$elem.hover($.proxy(this.paused,this),$.proxy(this.autoplay,this));
		}
	},
	_toggle:function(index){
		//1隐藏当前
		this.tabItems.eq(this.now).removeClass('tab-item-active');
		this.tabPanels.eq(this.now).showHide('hide');
		//2显示期待的
		this.tabItems.eq(index).addClass('tab-item-active');
		this.tabPanels.eq(index).showHide('show');
		//3更新索引
		this.now=index;
	},
	_getCorrectIndex:function(num){
		if(num >= this.itemsLength) return 0;
		if(num <0) return this.itemsLength -1;
		return num;
	},
	autoplay:function(){
		clearInterval(this.timer);
		this.timer = setInterval(function(){
			this._toggle(this._getCorrectIndex(this.now+1))
		}.bind(this),this.options.autoplay)
	},
	paused:function(){
		clearInterval(this.timer);
	}
}

//当不传参数时的默认配置信息
Tab.DEFAULTS = {
	activeIndex:0,
	js:true,
	mode:'fade',
	eventName:'click',
	autoplay:0
}

//封装dropdown插件
$.fn.extend({
	tab:function(options){
		//1.实现隐式迭代
		this.each(function(){//实现单例模式
			var $elem = $(this);
			var tab = $elem.data('tab');
			if(!tab){
				options = $.extend({},Tab.DEFAULTS,options);
				tab = new Tab($elem,options);
				//将实例信息存储在当前dom节点上
				$elem.data('tab',tab);
			}
			//第二次调用tab则是调用实例上的方法
			if(typeof tab[options] == 'function'){
				tab[options]();
			}
		})
	}
})


})(jQuery);