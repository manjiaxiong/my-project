(function($){
//顶部下拉开始
var $topDrop=$('.top .dropdown-li');
//监听下拉事件
//获得下拉列表函数
function OnceLoadHTML($elem,callback){
	var url=$elem.data('load');
	var isLoaded=$elem.data('isLoaded');
	if(!isLoaded){//第一次加载
		if(url) {//有地址
			$.getJSON(url,function(data){
				console.log(data);
				typeof callback=='function'&&callback($elem,data);
				})
		}
	}
	
	
}
	function buildTop($elem,data){
			var $layer=$elem.find('.dropdown-layer');
			var html='';
			var timer=null
			for(var i=0;i<data.length;i++){
				html+='<li><a href='+data[i].url+'>'+data[i].name+'</a></li>'
			}
			//设置定时器写入html
			clearTimeout(timer);
			timer =setTimeout(function(){
				$layer.html(html);
				//加载完毕改变加载状态
				$elem.data('isLoaded',true);
			},1000)
		
		}
$topDrop.on('dropdown-show dropdown-shown dropdown-hide dropdown-hidden',function(ev){
	if(ev.type=='dropdown-show'){
		// console.log(111)
		var $elem=$(this);
		
		//获得下拉列表的html结构
		OnceLoadHTML($elem,buildTop);
	}
}) 
$topDrop.dropdown({
	delay:300
});
//顶部下拉结束
//头部搜索开始
$search=$('.search');
function getData(data){
	console.log(data);
}
$search.on('getData',function(ev,data){//获取数据成功
	var $elem=$(this);
	var data=data.result;//得到淘宝发来的数据
	var $layer=$elem.find('.search-layer');
	// console.log($layer)
	// console.log(data);
	//把数据写入下拉列表内
	var html='';
	for(var i=0;i<data.length;i++){
		html+='<li><a href="javascript:;">'+data[i][0]+'</a></li>'
	}
	// console.log(html);
	$elem.search('appendLayer',html);//写入html
	if(!html==''){
		$elem.search('showLayer');
	}else{
		$elem.search('hideLayer')
	}
})
$search.on('getNodata',function(ev){
	var $elem=$(this);
	$elem.search('appendLayer',html);
	$elem.search('hideLayer')
})
$search.search({
	js:true,
	mode:'slide'
});
//头部搜索结束
//焦点滑动开始
var $focusDrop=$('.focus .dropdown');
function buildFocus($elem,data){
	var $layer=$elem.find('.dropdown-layer');
		var html='';
		var timer=null
		for(var i = 0;i<data.length;i++){
			html += '<dl class="category-details">';
			html +=	'	<dt class="category-details-title fl">';
			html +=	'		<a href="#" class="category-details-title-link">'+data[i].title+'</a>';
			html +=	'	</dt>';
			html +=	'	<dd class="category-details-item fl">';
			for(var j = 0;j<data[i].items.length;j++){
				html +=	'<a href="#" class="link">'+data[i].items[j]+'</a>';
			}
			html +=	'	</dd>';
			html +=	'</dl>';
		}
		//设置定时器写入html
		clearTimeout(timer);
		timer= setTimeout(function(){
			$layer.html(html);
			//加载完毕改变加载状态
			$elem.data('isLoaded',true);
		},1000)
}
$focusDrop.on('dropdown-show dropdown-shown dropdown-hide dropdown-hidden',function(ev){
	if(ev.type=='dropdown-show'){
			var $elem=$(this);
				OnceLoadHTML($elem,buildFocus);
			}
	})
$focusDrop.dropdown({
	js:true,
	mode:'fade',
	delay:300
})
//焦点滑动结束
//焦点轮播开始
//轮播图懒加载共通
//判断图片是否存了地址、
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
function courselLazyLoad($elem){
	var item={};
	var totalLength=$elem.find('.carousel-img').length-1;//找到轮播图下面所有图片
	var totalNum=0;
	var loadFn=null;
	//开始加载
	$elem.on('courselShow',loadfn=function(ev,index,elem){
		if(!item[index]){//判断这张图片是否加载过
			//去加载
			$elem.trigger('coursel-load',[index,elem]);
		}
	});
	$elem.on('coursel-load',function(ev,index,elem){
		var $elem1=$(elem);
		var $imgs=$elem1.find('.carousel-img');//找到每一个li下面的图片
		$imgs.each(function(){//开始加载每一个li下面的图片
			var $img=$(this);
			var imgUrl=$img.data('src');
			console.log('load')
			loadImage(imgUrl,function(){
					$img.attr('src',imgUrl);
				},function(){
					$img.attr('src','images/focus-carousel/placeholder.png');
				});
			totalNum++;
			item[index]='isLoaded';//每个li里面只要有一张加载则证明这个li已经被加载了
			if(totalNum>totalLength){
				$elem.trigger('coursel-loaded')
			}	
		})
		

	});
	$elem.on('coursel-loaded',function(){
		$elem.off('courselShow',loadfn)
	})
}

var $coursel=$('.focus .carousel-wrap');
courselLazyLoad($coursel);
$coursel.coursel({})
//焦点轮播结束
//今日热点开始
var $todayscoursel=$('.todays .carousel-wrap');
courselLazyLoad($todayscoursel);
$todayscoursel.coursel({delay:300})
//今日热点结束
//楼层开始
var $floor=$('.floor');
var $doc=$(document);
var $win=$(window);
floorHtmlLoad();
//是否在可视区
function isVisible($elem){
		return ($win.height() + $win.scrollTop() > $elem.offset().top) && ($elem.offset().top + $elem.height() > $win.scrollTop())
	};
	//
function TimeToShow(){
		$floor.each(function(index,elem){
			if(isVisible($(elem))) {//在可视区
				$doc.trigger('floorShow',[index,elem]);
			}
		})
	}
	 // TimeToShow();
	//防抖
$win.on('resize load scroll',function(){
		// clearTimeout($floor.timer);
	setTimeout(TimeToShow,200);

	});
//只获取一次数据
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
//楼层图片懒加载
function floorImgLoad($elem){
	var item={};
	var totalLength=$elem.find('.floor-img').length-1;//找到轮播图下面所有图片
	var totalNum=0;
	var loadFn=null;
	//开始加载
	$elem.on('tabShow',loadfn=function(ev,index,elem){
		if(!item[index]){//判断这张图片是否加载过
			//去加载
			$elem.trigger('tab-load',[index,elem]);
		}
	});
	$elem.on('tab-load',function(ev,index,elem){
		var $elem1=$(elem);
		var $imgs=$elem1.find('.floor-img');//找到每一个li下面的图片
		$imgs.each(function(){//开始加载每一个li下面的图片
			var $img=$(this);
			var imgUrl=$img.data('src');
			// console.log('111')
			loadImage(imgUrl,function(){
					$img.attr('src',imgUrl);
				},function(){
					$img.attr('src','images/focus-carousel/placeholder.png');
				});
			totalNum++;
			item[index]='isLoaded';//每个li里面只要有一张加载则证明这个li已经被加载了
			if(totalNum>totalLength){
				$elem.trigger('tab-loaded')
			}	
		})
		

	});
	$elem.on('tab-loaded',function(){
		$elem.off('tabShow',loadfn)
	})
}
//生成楼层html
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
//楼层html结构懒加载
function floorHtmlLoad(){
	var item={};
	var totalLength=$floor.length-1;//找到轮播图下面所有图片
	var totalNum=0;
	var loadFn=null;
	//开始加载
	$doc.on('floorShow',loadfn=function(ev,index,elem){
		if(!item[index]){//判断这张图片是否加载过
			//去加载
			console.log(11);
			$doc.trigger('floor-load',[index,elem]);
		}
	});
	$doc.on('floor-load',function(ev,index,elem){
		getDataOnce($doc,'data/floor/floorData.json',function(data){
			//1生成html
			var html =HtmlLoad(data[index]);
			// console.log(html)
			//2加载html结构
			$(elem).html(html)
			//3填充图片
			floorImgLoad($(elem));
			item[index]='loaded';//已经加载过
			// //激活选项卡
			$(elem).tab({})
			
			// totalNum++;
			// if(totalNum>totalLength){
			// 	$doc.trigger('floor-loaded')//数据加载完毕
			// }
		})
		
	});
	$doc.on('floor-loaded',function(){
		$doc.off('floorShow',loadfn)
	})
}

//楼层结束
//电梯开始
	$elevator=$('.elevator');
	$elevatorItem=$('.elevator-item');
	//获取楼层号
	function getFloorNum(){
		var num=-1;
		$floor.each(function(index,elem){
			num=index;
			if($(elem).offset().top>$win.height()/2 + $win.scrollTop()){
				num=index-1;
				return false
			}
		})
		return num;
	}

	//改变电梯属性
	function Chanelevator(){
		var num=getFloorNum();
		if(num==-1){
			$elevator.fadeOut()
			}else{
				$elevator.fadeIn();
				$elevatorItem.removeClass('elevator-active');
				$elevatorItem.eq(num).addClass('elevator-active')
				
			}

	}
	//点击改变电梯
	$elevator.on('click','.elevator-item',function(){
		var index=$elevatorItem.index(this);
		$('html,body').animate({
			scrollTop:$floor.eq(index).offset().top
		})
	})
	$win.on('resize load scroll',function(){
		clearTimeout($elevator.timer);
		$floor.elevator=setTimeout(Chanelevator,200);
	});
	console.log(getFloorNum());
	//电梯结束
	//工具栏
	$toolbar=$('.toolbar');
	$backToTop=$('#backToTop');
	console.log($backToTop);
	$toolbar.on('click','#backToTop',function(){
		$('html,body').animate({
			scrollTop:0
		})
	})
})(jQuery)
