(function($){
	function init($elem,callback){
		if($elem.is(':hidden')){
				$elem.data('status','hidden');
				typeof callback=='function'&& callback();
			}
		else{
				$elem.data('status','show');
			}
	};
	function show($elem,callback){
		if($elem.data('status')=='shown') return;
		if($elem.data('status')=='show') return;
		$elem.trigger('show').data('status','show');
		typeof callback=='function'&& callback();
	};
	function hide($elem,callback){
		if($elem.data('status')=='hidden') return;
		if($elem.data('status')=='hide') return;
		$elem.trigger('hide').data('status','hide');
		callback();
	};
	var slient={
		init:function($elem){
			$elem.removeClass('transition');
			init($elem);
		},
		show:function($elem){
				show($elem,function(){
					$elem.show().trigger('shown').data('status','shown');;
				});
		},
		hide:function($elem){
			hide($elem,function(){
				$elem.hide().trigger('hidden').data('status','hidden');
			})
		}
	};
	var js={
		fade:{
			init:function($elem){
				js._init($elem);
			},
			show:function($elem){
					js._show($elem,'fadeIn');
			},
			hide:function($elem){
				js._hide($elem,'fadeOut');
			}
		},
		slide:{
			init:function($elem){
				js._init($elem);
			},
			show:function($elem){
					js._show($elem,'slideDown');
			},
			hide:function($elem){
				js._hide($elem,'slideUp');
			}
		},
		slideLeftRight:{
			init:function($elem){
				js._custominit($elem,{
					width:0,
					paddingLeft:0,
					paddingRight:0,
					borderLeft:0,
					borderRight:0
				})
			},
			show:function($elem){
				// console.log(11)
				js._customshow($elem);
			},
			hide:function($elem){
				js._customhide($elem,{
						width:0,
						paddingLeft:0,
						paddingRight:0,
						borderLeft:0,
						borderRight:0,
						});
			}
		},
		fadeslideLeftRight:{
			init:function($elem){
				js._custominit($elem,{
						width:0,
						paddingLeft:0,
						paddingRight:0,
						borderLeft:0,
						borderRight:0,
						opacity:0
						})
			},
			show:function($elem){
				js._customshow($elem);
			},
			hide:function($elem){
				js._customhide($elem,{
						width:0,
						paddingLeft:0,
						paddingRight:0,
						borderLeft:0,
						borderRight:0,
						opacity:0
						});
			}
		},
	}
	js._init=function($elem){
		$elem.removeClass('transition');
				init($elem);
	}
	js._show=function($elem,mode){
		show($elem,function(){
			$elem.stop()[mode](function(){
				$elem.trigger('shown').data('status','shown');	
			});
		})
	};
	js._hide=function($elem,mode){
		$elem.stop()[mode](function(){
			$elem.trigger('hidden').data('status','hidden');
		});
	};
	js._custominit=function($elem,options){
		$elem.removeClass('transition');
				// 记录所有值
		var styles={};
		for(var key in options){
			styles[key]=$elem.css(key);
		}
		$elem.data('styles',styles);//用data存值
		init($elem,function(){
			$elem.css(options)
		})
	};
	js._customshow=function($elem){
		$elem.show();//display:block
		show($elem,function(){
			$elem
			.stop()
			.animate($elem.data('styles'),100,function(){
				$elem.trigger('shown').data('status','shown');
			})
		});
	};
	js._customhide=function($elem,options){
		hide($elem,function(){
			$elem
			.stop()
			.animate(options,100,function(){
				$elem.trigger('hidden').data('status','hidden');
			})
		})
	}
		//获取显示隐藏动画的方法
	// function getShowHide($elem,options){
	// 	var showhideFn = slient;
	// 	if(options.js){
	// 		showhideFn = js[options.mode]
	// 	}
	// 	//初始化
	// 	showhideFn.init($elem);

	// 	//返回对应的显示隐藏方法
	// 	return {
	// 		show:showhideFn.show,
	// 		hide:showhideFn.hide
	// 	}
	// }
	function getShowHide($elem,options){
		var showhideFn = slient;
		if(options.js){
			showhideFn = js[options.mode]
		}

		//初始化
		showhideFn.init($elem);

		//返回对应的显示隐藏方法
		return {
			show:showhideFn.show,
			hide:showhideFn.hide
		}
	}
 
	var DEFAULTS = {
		js:false,
		mode:'fade'
	}

	//封装showHide插件
	$.fn.extend({
		showHide:function(options){
			//遍历元素,实现隐式迭代
			return this.each(function(){//实现单例模式
				var $elem = $(this);
				var showHideObj = $elem.data('showHideObj');
				if(!showHideObj){
					options = $.extend({},DEFAULTS,options);
					showHideObj = getShowHide($elem,options);
					$elem.data('showHideObj',showHideObj);
				}
				//第二次进入该函数则是调用显示隐藏的动画方法
				if(typeof showHideObj[options] == 'function'){
					showHideObj[options]($elem)
				}
			})
		}
	})
})($)
