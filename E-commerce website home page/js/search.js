(function($){
 //缓存数据 
 var cache={
 	data:{},
 	count:0,
 	addData:function(key,val){
 		this.data[key]=val;
 		this.count++;
 	},
 	getData:function(val){
 		return this.data[val];
 	}
 }

function Search($elem,options){
	//1.罗列属性
	this.$elem = $elem;
	this.options = options;
	this.searchForm=$elem.find('.search-form');
	this.searchInput=$elem.find('.search-input');
	this.searchSub=$elem.find('.search-submit');
	this.searchLayer=$elem.find('.search-layer');
	this.timer=null;
	this.jqXHR=null;
	//2.初始化
	this.init();
	
}
Search.prototype = {
	constructor:Search,
	init:function(){
		//初始化下拉菜单
		this.searchLayer.showHide(this.options);
		//监听提交事件
		this.searchSub.on('click',$.proxy(this.submit,this));
		//监听input请求事件
	
		if(this.options.autocomplete){	//(判断是否有下拉层)
			if(this.options.delayGetData){//请求延时
				this.searchInput.on('input',function(){
					clearTimeout(this.timer);//清除定时器
					this.timer= setTimeout(function(){
						this.getData();
					}.bind(this),this.options.delayGetData)
				}.bind(this))
				
			}else{
			this.searchInput.on('input',$.proxy(this.getData,this));

			}
			// this.searchInput.on('input',$.proxy(this.getData,this));
		}
		//清除冒泡
		this.searchInput.on('click',function(ev){
				ev.stopPropagation()
		})
		//点击别处消失
		$(document).on('click',function(){
			this.hideLayer();
		}.bind(this))
		
		//点击获取数据且跳转
		var _this=this;
		this.$elem.on('click','.search-Li',function(){
			//1获取数据
			var val=$(this).html();
			//2添加到input框
			_this.searchInput.val(val);
			//3跳转
			_this.submit();
		})
	},
	submit:function(){
		if(!this.getVal()){
			return false;
		};
		this.searchForm.trigger('submit');
	},
	getVal:function(){
		return $.trim(this.searchInput.val());
	},
	getData:function(){
		//如果输入为空不获取数据//且并不显示下拉
		if(!this.getVal()){//输入为空不获取数据
			this.hideLayer();
			return;
		};

		if(this.jqXHR){
			this.jqXHR.abort();
		}
		if(cache.getData(this.getVal())){//判断是否为缓存数据
			var cacheData=cache.getData(this.getVal());
			console.log('cacheData::::',cacheData);
			this.$elem.trigger('getData',cacheData);
			console.log('trigger cache:::::');
			console.log(cache.data);
			return;
		}
		//如果不是缓存数据 向下进行数据请求
		console.log('well get data');
		

		this.jqXHR= $.ajax({
			url:this.options.url + this.getVal(),
			dataType:'jsonp',
			jsonp:'callback'
		})
		.done(function(data){
			//1创建html
			// data=data.result;
			// var html='';
			// for(var i=0;i<data.length;i++){
			// 	html+="<li>"+data[i][0]+"</li>"
			// };
			// //2插入HTML
			// this.appendLayer(html);
			// //3显示HTML
			// this.showLayer();
			// if(html==''){
			// 	this.hideLayer();
			// }else{
			// 	this.showLayer();
			// }
			console.log(data);
			this.$elem.trigger('getData',data);
			cache.addData(this.getVal(),data);
		}.bind(this))
		.fail(function(err){
			// console.log(err);
			this.$elem.trigger('getNodata');
		}) 
		.always(function(){
			this.jqXHR=null;
		}.bind(this))
	},
	appendLayer:function(html){
		this.searchLayer.html(html);
	},
	showLayer:function(){
		this.searchLayer.showHide('show');
	},
	hideLayer:function(){
		this.searchLayer.showHide('hide');
		// console.log('hide')
	}
	
}

Search.DEFAULTS = {
	autocomplete:true,
	url:'https://suggest.taobao.com/sug?_tb_token_=5eb3eeb61e57e&__ajax__=1&pid=mm_46714769_45242704_740290430&unid=&clk1=&code=utf-8&q=',
	delayGetData:200
	
}

//封装search插件
// $.fn.extend({
// 	search:function(options){
// 		//1.实现隐式迭代
// 		this.each(function(){
// 			var $elem = $(this);
// 			options = $.extend({},Search.DEFAULTS,options);
// 			new Search($elem,options);
// 		})
// 	}
// })

$.fn.extend({
	search:function(options,val){
		//1.实现隐式迭代
		this.each(function(){//实现单例模式
			var $elem = $(this);
			var search = $elem.data('search');
			if(!search){
				options = $.extend({},Search.DEFAULTS,options);
				search = new Search($elem,options);
				//将实例信息存储在当前dom节点上
				$elem.data('search',search);
			}
			//第二次调用search则是调用实例上的方法
			if(typeof search[options] == 'function'){
				search[options](val);
			}
		})
	}
})
})(jQuery);