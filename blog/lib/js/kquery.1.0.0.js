(function(w){
	function Kquery(selecor){
		return new Kquery.prototype.init(selecor);
	}
	Kquery.fn= Kquery.prototype={
		constuctor:Kquery,
		init:function(selecor){
			if(!selecor){//布尔值为0
				return this;
			}
			else if(Kquery.isFunction(selecor)){//函数
				this[0]=document;
				this.context=document;
				this.lenght=1;
				document.addEventListener('DOMContentLoaded',selecor);
				return this;
			}else if(Kquery.isString(selecor)){
				if(Kquery.isHTML(selecor)){//3.1标签
					var tempDiv = document.createElement('div');
					tempDiv.innerHTML = selecor;
					for(var i = 0;i<tempDiv.children.length;i++){
						this[i] = tempDiv.children[i]
					}
					this.length = tempDiv.children.length;

					return this;

				}else{//3.2选择器
					var doms = document.querySelectorAll(selecor);
					for(var i = 0;i<doms.length;i++){
						this[i] = doms[i];
					}
					this.length = doms.length;
					return this;
				}
			}
			//4.数组
			else if(Kquery.isArray(selecor)){
				console.log(this)
				for(var i = 0;i<selecor.length;i++){
					this[i] = selecor[i];
				}
				this.length = selecor.length;
				return this;
			}
			//5.对象(其他)
			else{
				this[0] = selecor;
				this.context = document;
				this.length = 1;
				return this;
			}
		},
		get:function(index){
			//有无参数
			if(index==0||index){
				if(Kquery.isNumber(index)){//是数字
					if(index>=0){//下标大于0
						return this[index];
					}else{//下标小于0
						return this[this.length+index]
					}
				}
			}
			else{
				 var err=[];
				 for(var i=0;i<this.length;i++){
				 	err[i]=this[i];
				 }
				 return err;
			}
		}
	}
	//extend方法
	Kquery.extend=Kquery.prototype.extend=function(options){
		for(key in options){
			this[key]=options[key];
		}
	}
	//Kquery的静态方法
	Kquery.extend({
		isFunction:function(str){//函数
			return typeof str=="function";
		},
		isString:function(str){//字符串
			return  typeof str=="string"
		},
		isHTML:function(str){//标签
			return /<[^<>]+>/.test(str);
		},
		isArray:function(str){//数组
			return  typeof str=='object'&&(length in str);
		},
		isNumber:function(str){//判断是否为数字
			return typeof str=='number';
		},
		
	})
	// Kquery.isFunction=function(str){//函数
	// 	return typeof str=="function";
	// }
	// Kquery.isString=function(str){//字符串
	// 	return  typeof str=="string"
	// }
	// Kquery.isHTML=function(str){//标签
	// 	return /<[^<>]+>/.test(str);
	// }
	// Kquery.isArray=function(str){//数组
	// 	return  typeof str=='object'&&(length in str);
	// }
	// Kquery.isNumber=function(str){//判断是否为数字
	// 	return typeof str=='number';
	// }

	Kquery.prototype.init.prototype=Kquery.prototype;
	w.Kquery=w.$=Kquery;
})(window);