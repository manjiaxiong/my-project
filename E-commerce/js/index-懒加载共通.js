(function($){

	//html加载共通样式
	function loadHtmlContebnt($elem,callback){
		// var $layer=$elem.find('.dropdown-layer');
		var url=$elem.data('load');//得到数据地址
		var isLoadin=false;//是否加载完毕
		if(!url) return; 
		if(!isLoadin){//第一次加载
			if(url){//有数据加载
			$.getJSON(url,function(data){
				typeof callback=='function'&&callback(data);
					})
				}
			}
		}
	//图片加载共通样式
	function loadImage(imgUrl,success,error){
		var image = new Image();
		image.onload = function(){
			typeof success == 'function' && success(imgUrl);
		}
		image.onerror = function(){
			typeof error == 'function' && error(imgUrl);
		}
		image.src = imgUrl;
	}
	//加载轮播共通
	function CoursrlLoad($elem){
		var item={};
		var itemLength= $elem.find('.carousel-img').length-1;
		 // console.log(itemLength)
		var totalNum=0;
		var loadFn=null;
		$elem.on('courselShow',loadFn=function(ev,index,elem){
			if(!item[index]){//判断是否加载过
				$elem.trigger('coursel-load',[index,elem])//数据加载
			}
		})
		$elem.on('coursel-load',function(ev,index,elem){
			console.log('loadimg222');
			var $elem=$(elem);
			var $imgs=$elem.find('.carousel-img');
			// console.log($imgs)
			$imgs.each(function(){
				var $todayImg=$(this);
				var imgUrl=$todayImg.data('src');
				loadImage(imgUrl,function(){
					$todayImg.attr('src',imgUrl);
				},function(){
					$todayImg.attr('src','images/focus-carousel/placeholder.png');
				 })
			})
		 	item[index]='loaded';
			totalNum++;
			if(totalNum>itemLength){
				$elem.trigger('coursel-loaded',[index,elem])//数据加载完毕
			}
			
		})
		$elem.on('coursel-loaded',function(index){
				$elem.off('courselShow',loadFn);
		})
	}
//顶部下拉开始
	var $dropdownLi=$('.top .dropdown-li');
	// console.log($dropdownLi);
	$dropdownLi.dropdown({
		js:true,
		mode:'slide',
		delay:300//阻止用户快速滑动
		// eventm:'click'
	}); 
	//加载数据
	$dropdownLi.on('dropdown-show dropdown-shown dropdown-hide dropdown-hidden',function(ev){
		if(ev.type=='dropdown-show'){
			
				loadHtmlContebnt($(this),function(data){
					// console.log(data);
					var $layer=$(this).find('.dropdown-layer');
					var html="";
					for(var i=0;i<data.length;i++){
						html+="<li><a href="+data[i].url+">"+data[i].name+"</a></li>"
					}
					setTimeout(function(){//定时器
						$layer.html(html);
						isLoadin=true;
					},1000)
				}.bind(this));
			}
			
	})
//顶部下拉结束

//头部搜索开始

	var $search=$('.search');
	$search.search({});//初始化(第一次进入)
	$search.on('getData',function(ev,data){
			var $elem=$(this);
			var $layer=$elem.find('.search-layer');
			var html= creatHTML(data,6);
			//2插入HTML
			$elem.search('appendLayer',html);
			//3显示HTML(成功)
			 if(html==''){
			 	$elem.search('hideLayer');
			}else{
				$elem.search('showLayer');
			}
	 })
	 $search.on('getNodata',function(ev){
	 	var $elem=$(this);
	 	$elem.search('appendLayer','');
		$elem.search('hideLayer');
	 })
	 function creatHTML(data,Max){
	 	var data=data.result;
	 	var html='';
			for(var i=0;i<data.length;i++){
				if(i>=Max) break;
				html+="<li class='search-Li'>"+data[i][0]+"</li>"
			};
			return html;
	 }

//头部搜索结束

//焦点滑动开始

	var $focusDropdownLi=$('.focus .dropdown');
	// console.log($dropdownLi);
	 $focusDropdownLi.dropdown({
			js:true,
			mode:'fade',
			delay:300,//阻止用户快速滑动
			// eventm:'click'
		}); 
	 //数据加载
	 $focusDropdownLi.on('dropdown-show dropdown-shown dropdown-hide dropdown-hidden',function(ev){
		if(ev.type=='dropdown-show'){
		
				loadHtmlContebnt($(this),function(data){
					// console.log(data);
					var $layer=$(this).find('.dropdown-layer');
					var html="";
					console.log(data);
					for(var i=0;i<data.length;i++){
						html += '<dl class="category-details">';
						html +=	'	<dt class="category-details-title fl">';
						html +=	'		<a href="#" class="category-details-title-link">'+data[i].title+'</a>';
						html +=	'	</dt>';
						html +=	'	<dd class="category-details-item fl">';
						for(var j = 0;j<data[i].items.length;j++){
							html +=	'		<a href="#" class="link">'+data[i].items[j]+'</a>';
						}
						html +=	'	</dd>';
						html +=	'</dl>'
					}
					setTimeout(function(){//定时器
						$layer.html(html);
						isLoadin=true;
					},1000)
				}.bind(this));
			}
		});
//焦点滑动结束
//轮播图逻辑开始
	var $coursel=$('.carousel .carousel-wrap');
	
	// CoursrlLoad($coursel)
	LazyLoad({
		$elem:$coursel,
		prixyName:'coursel',
		eventName:'courselShow',
		itemLength:$coursel.find('.carousel-img').length-1
	});
	$coursel.on('coursel-load',function(ev,index,elem,success){
			console.log('loadimg222');
			var $elem=$(elem);
			var $imgs=$elem.find('.carousel-img');
			// console.log($imgs)
			$imgs.each(function(){
				var $todayImg=$(this);
				var imgUrl=$todayImg.data('src');
				loadImage(imgUrl,function(){
					$todayImg.attr('src',imgUrl);
				},function(){
					$todayImg.attr('src','images/focus-carousel/placeholder.png');
				 })
			})
		 	success();
			
		})
	$coursel.coursel({});//初始化
//轮播图逻辑结束
//今日热销开始
	var $todayCoursel=$('.todays .carousel-wrap');
	
	 // CoursrlLoad($todayCoursel)
	 LazyLoad({
		$elem: $todayCoursel,
		prixyName:'coursel',
		eventName:'courselShow',
		itemLength:$todayCoursel.find('.carousel-img').length-1
	});
	$todayCoursel.on('coursel-load',function(ev,index,elem,success){
			console.log('loadimg222');
			var $elem=$(elem);
			var $imgs=$elem.find('.carousel-img');
			// console.log($imgs)
			$imgs.each(function(){
				var $todayImg=$(this);
				var imgUrl=$todayImg.data('src');
				loadImage(imgUrl,function(){
					$todayImg.attr('src',imgUrl);
				},function(){
					$todayImg.attr('src','images/focus-carousel/placeholder.png');
				 })
			})
		 	success();
		})

	$todayCoursel.coursel({});
//今日热销结束
/*
options{
	$elem:$elem,
	prixyName:'coursel',
	eventName:'coursel',
	itemLength:$elem.find('.carousel-img').length-1
}
*/

//懒加载共通
function LazyLoad(options){
		var item={};
		 // console.log(itemLength)
		var totalNum=0;
		var loadFn=null;
		var itemLength= options.itemLength;
		var $elem=options.$elem;
		var prixyName=options.prixyName;
		var eventName=options.eventName;
		// var eventName=options.eventName
		$elem.on(eventName,loadFn=function(ev,index,elem){
			if(!item[index]){//判断是否加载过
				$elem.trigger(prixyName+'-load',[index,elem,function(){
					item[index]='loaded';
					totalNum++;
					if(totalNum>itemLength){
						$elem.trigger(prixyName+'-loaded',[index,elem])//数据加载完毕
					}
				}])//数据加载
			}
		})
		// $elem.on('coursel-load',function(ev,index,elem,success){
		// 	console.log('loadimg222');
		// 	var $elem=$(elem);
		// 	var $imgs=$elem.find('.carousel-img');
		// 	// console.log($imgs)
		// 	$imgs.each(function(){
		// 		var $todayImg=$(this);
		// 		var imgUrl=$todayImg.data('src');
		// 		loadImage(imgUrl,function(){
		// 			$todayImg.attr('src',imgUrl);
		// 		},function(){
		// 			$todayImg.attr('src','images/focus-carousel/placeholder.png');
		// 		 })
		// 	})
		//  	success();
			
		// })
		$elem.on(prixyName+'-loaded',function(index){
				$elem.off(prixyName+'Show',loadFn);
		})
	}
//楼层开始
//楼层图片懒加载
	// function floorImgLazyLoad($elem){
	// 	var item = {};//0:loaded 1:loaded
	// 	var totalNum = $elem.find('.floor-img').length - 1;
	// 	var totalLoadedNum = 0;
	// 	var loadFn = null;
	// 	// console.log(111);
	// 	//1.开始加载
	// 	$elem.on('tabShow',loadFn = function(ev,index,elem){
	// 		console.log(222);
	// 		//判断图片有没有被加载
	// 		if(!item[index]){
	// 			$elem.trigger('tab-load',[index,elem]);
	// 		}
	// 	})
	// 	//2.执行加载
	// 	$elem.on('tab-load',function(ev,index,elem){
	// 		console.log('will load img',index);
	// 		var $elem = $(elem);
	// 		var $imgs = $elem.find('.floor-img');
	// 		$imgs.each(function(){
	// 			var $img = $(this);
	// 			var imgUrl = $img.data('src');
	// 			loadImage(imgUrl,function(){
	// 				$img.attr('src',imgUrl);
	// 			},function(){
	// 				$img.attr('src','images/focus-carousel/placeholder.png');
	// 			});
	// 			//图片已经被加载
	// 			item[index] = 'isLoaded';
	// 			totalLoadedNum++;
	// 			//所有图片都被加载则移除事件
	// 			if(totalLoadedNum > totalNum){
	// 				$elem.trigger('tab-loaded');
	// 			}
	// 		})
			
	// 	})
	// 	//3.加载完毕
	// 	$elem.on('tab-loaded',function(){
	// 		$elem.off('tabShow',loadFn);
	// 	})
	// }
//只加载一次数据
	function getDataOnce($elem,url,callback){
		var data=$elem.data('data');
		if(!data){//只加载一次
			$.getJSON(url,function(resData){
				callback(resData);
				$elem.data('data',resData);
				// console.log(resData)
			})
		}else{
			callback(data);
		}
	}
	//生成html
	function HtmlLoad(oneFloorData){
		var html = '';
		html += '<div class="container">';
		html += buildFloorHeaderHtml(oneFloorData);
		html += buildFloorBodyHtml(oneFloorData);
		html += '</div>';
		return html;
	}
	function buildFloorHeaderHtml(oneFloorData){
		var html ='';
		html += '<div class="floor-hd">';
		html +=	'	<h2 class="floor-title fl">';
		html +=	'		<span class="floor-title-num">'+oneFloorData.num+'F</span>';
		html +=	'		<span class="floor-title-text">'+oneFloorData.text+'</span>';
		html +=	'	</h2>';
		html +=	'	<ul class="tab-item-wrap fr">';
		for(var i = 0;i<oneFloorData.tabs.length;i++){
			html +=	'<li class="fl">';
			html +=	'	<a class="tab-item" href="javascript:;">'+oneFloorData.tabs[i]+'</a>';
			html +=	'</li>';
			if(i != oneFloorData.tabs.length - 1){
				html +=	'<li class="fl tab-divider"></li>';
			}
		}
		html +=	'	</ul>';
		html +=	'</div>';

		return html;
	}
	function buildFloorBodyHtml(oneFloorData){
		var html = '';
		html += '<div class="floor-bd">';
		for(var i = 0;i<oneFloorData.items.length;i++){
			html +=	'	<ul class="tab-panel clearfix">';
			for(var j = 0;j<oneFloorData.items[i].length;j++){
				html +=	'		<li class="floor-item fl">';
				html +=	'			<p class="floor-item-pic">';
				html +=	'				<a href="#">';
				html +=	'					<img class="floor-img" src="images/floor/loading.gif" data-src="images/floor/'+oneFloorData.num+'/'+(i+1)+'/'+(j+1)+'.png" alt="">';
				html +=	'				</a>';
				html +=	'			</p>';
				html +=	'			<p class="floor-item-name">';
				html +=	'				<a class="link" href="#">'+oneFloorData.items[i][j].name+'</a>';
				html +=	'			</p>';
				html +=	'			<p class="floor-item-price">￥'+oneFloorData.items[i][j].price+' </p>';
				html +=	'		</li>';
			}
			html +=	'	</ul>';
		}
		html +=	'</div>';
		return html;
	}
	// function FloorHtmlLoad(){
	// 	var item={};
	// 	var itemLength= $tab.length-1;
	// 	var totalNum=0;
	// 	var loadFn=null;
	// 	$doc.on('floorShow',loadFn=function(ev,index,elem){
	// 		if(!item[index]){//判断是否加载过
	// 			$doc.trigger('floor-load',[index,elem])//数据加载
	// 		}
	// 	})
	// 	$doc.on('floor-load',function(ev,index,elem){
	// 		//加载数据
	// 		getDataOnce($doc,'data/floor/floorData.json',function(data){
	// 			//1生成html
	// 			var html =HtmlLoad(data[index]);
	// 			// console.log(data[index]);
	// 			//2加载html
	// 			$(elem).html(html);
	// 			//3图片赖加载
	// 			floorImgLazyLoad($(elem));
	// 			//4.激活选项卡
	// 			$(elem).tab({});
	// 		})
	// 	 	item[index]='loaded';
	// 		totalNum++;
	// 		if(totalNum>itemLength){
	// 			$doc.trigger('floor-loaded',[index,elem])//数据加载完毕
	// 		}
			
	// 	})
	// 	$doc.on('floor-loaded',function(index){
	// 			$doc.off('floorShow',loadFn);
	// 	})
	// }
	var $tab=$('.floor');
	$tab.timer=null;
	var $win=$(window);
	var $doc=$(document);
	// FloorHtmlLoad();
	//绑定楼层图片加载
	 $tab.on('tab-load',function(ev,index,elem,success){
			var $elem=$(elem);
			var $imgs=$elem.find('.floor-img');
			// console.log($imgs)
			$imgs.each(function(){
				var $todayImg=$(this);
				var imgUrl=$todayImg.data('src');
				loadImage(imgUrl,function(){
					$todayImg.attr('src',imgUrl);
				},function(){
					$todayImg.attr('src','images/focus-carousel/placeholder.png');
				 })
			})
		 	success();
		})
	//懒加载HTML
	 LazyLoad({
		$elem: $doc,
		prixyName:'floor',
		eventName:'floorShow',
		itemLength:$tab.length-1
	});
	 //绑定html加载事件
	 $doc.on('floor-load',function(ev,index,elem,success){
			//加载数据
			getDataOnce($doc,'data/floor/floorData.json',function(data){
				//1生成html
				var html =HtmlLoad(data[index]);
				// console.log(data[index]);
				//2加载html
				$(elem).html(html);
				//3图片赖加载
				LazyLoad({
					$elem: $tab,
					prixyName:'tab',
					eventName:'tabShow',
					itemLength:$tab.find('.carousel-img').length - 1
				});
				//4.激活选项卡
				$(elem).tab({});
			})
			 	success();
			
		})
	 
	// $tab.each(function(){
	// 	BigLoad($(this),'tab','.floor-img');
	// })
	function isVisible($elem){
		return ($win.height() + $win.scrollTop() > $elem.offset().top) && ($elem.offset().top + $elem.height() > $win.scrollTop())
	};
	function TimeToShow(){
		$tab.each(function(index,elem){
			if(isVisible($(elem))) {
				$doc.trigger('floorShow',[index,elem]);
				// console.log(index,elem)
			}
		})
	}
	$win.on('resize load scroll',function(){
		clearTimeout($tab.timer);
		$tab.timer=setTimeout(TimeToShow,200);
	});

	// $tab.tab({});
//楼层结束
})(jQuery)