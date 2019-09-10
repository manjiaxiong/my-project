//js等文件保存在服务器端但是最终会返回客户端，由客户端解析

;(function($){  
	//1登录注册切换
	var $register=$('#register');
	var $login=$('#login');
	//1.1从登陆面板到注册面板
	$('#go-register').on('click',function (){
		$login.hide();
		$register.show()
	})
	//1.2注册到登陆
	$('#go-login').on('click',function(){
		$login.show();
		$register.hide()
	})
	
	//用户名3-10位且以字母开头(包含数字和下划线)
	var usernameReg=/^[a-z][a-z0-9_]{2,9}$/i;
	//密码为3-6任意字符
	var passwordReg=/^\w{3,6}$/
	//2.注册
	$('#sub-register').on('click',function(){
		//2.1获取表单数据

		var username=$register.find('[name=username]').val();
		var password=$register.find('[name=password]').val();
		var repassword=$register.find('[name=repassword]').val();
		var errMsg='';
		var $err = $register.find('.err')
		
		
		//2.2验证

		if(!usernameReg.test(username)){
			errMsg='用户名不正确'
		}else if(!passwordReg.test(password)){
			errMsg='密码为3-6位'
		}else if(password!=repassword){
			errMsg='两次密码不一致'
		}


		if(errMsg){//不通过
		 	$err.html(errMsg);
		 	return
		 }
		 else{//通过
		 	$err.html('');
		 	$.ajax({//2.3发送ajax请求
		 		url:'/user/register',
		 		type:'post',
		 		dataType:'json',
		 		data:{
		 			username:username,
		 			password:password
		 		}
		 	})
		 	.done(function(result){
		 		// console.log(result)
		 		if(result.status==0){//成功
		 			$('#go-login').trigger('click')
		 		}else{//失败
		 			$err.html(result.message);
		 		}
		 	})
		 	.fail(function(err){
		 		$err.html('请求失败，请稍后再试');
		 	})
		 }
		
	})
	//3登陆
	$('#sub-login').on('click',function(){
		//2.1获取表单数据
		var username=$login.find('[name=username]').val();
		var password=$login.find('[name=password]').val();
		var errMsg='';
		var $err = $login.find('.err')
		
		//3.2验证

		if(!usernameReg.test(username)){
			errMsg='用户名不正确'
		}else if(!passwordReg.test(password)){
			errMsg='密码为3-6位'
		}

		if(errMsg){//不通过
		 	$err.html(errMsg);
		 	return
		 }
		 else{//通过
		 	$err.html('');
		 	$.ajax({//2.3发送ajax请求
		 		url:'/user/login',
		 		type:'POST',
		 		dataType:'json',
		 		data:{
		 			username:username,
		 			password:password
		 		}
		 	})
		 	.done(function(result){
		 		// console.log(result)
		 		$err.html('');
		 		if(result.status==0){
		 		
		 			window.location.reload();
		 			// $('#user-info').find('span').html(result.user.username)
		 			// $('#user-info').show();
		 			//
		 			// $login.hide();
		 		}else{
		 			$err.html(result.message);
		 		}
		 		
		 	})
		 	.fail(function(err){
		 		$err.html('请求失败，请稍后再试');
		 	})
		 }
		
	})
	//4退出
	$("#logout").on('click',function(){
		$.ajax({
			url:'/user/logout'
		})
		.done(function(result){
			window.location.href='/';
			console.log(result)
		})
		.fail(function(err){
		 		$('#user-info .err').html('请求失败，请稍后再试');
		 	})
	})
	//5处理文章节点
	//列表 
	function buildArticleHtml(articles){
		var html=""
		articles.forEach(function(article){
            var createdTime = moment(article.createdAt).format('YYYY-MM-DD HH:mm:ss')
            html += `
              <div class="panel panel-default content-item">
                <div class="panel-heading">
                  <h3 class="panel-title">
                    <a href="/detail/${article._id.toString()}" class="link" target="_blank">${article.title}</a>
                  </h3>
                </div>
                <div class="panel-body">
                  ${ article.intro }
                </div>
                <div class="panel-footer">
                  <span class="glyphicon glyphicon-user"></span>
                  <span class="panel-footer-text text-muted">${ article.user.username }</span>
                  <span class="glyphicon glyphicon-th-list"></span>
                  <span class="panel-footer-text text-muted">${ article.category.name }</span>
                  <span class="glyphicon glyphicon-time"></span>
                  <span class="panel-footer-text text-muted">${ createdTime }</span>
                  <span class="glyphicon glyphicon-eye-open"></span>
                  <span class="panel-footer-text text-muted"><em>${ article.click }</em>已阅读</span>
                </div>
              </div>
            `
        })    
        return html;
	} 
	//分页
	function buildPaginationHtml(page,pages,list){
		var html='';
		if(page==1){
			html+=' <li class="disabled">'
		}else{
			html+='<li>'
		}
		html+=` <a href="javascript:;" aria-label="Previous">
			        <span aria-hidden="true">&laquo;</span>
			    </a>
			</li>`
		list.forEach(function(i){
			if(i==page){
				html+='<li class="active"><a href="javascript:;">'+i+'</a></li>'
			}else{
				html+=' <li><a href="javascript:;">'+i+'</a></li>'
			}
		}) 
		 if(page == pages){
            html += '<li class="disabled">'
        }else{
            html += '<li>'
        }
        html += `<a href="javascript:;" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>`
        // console.log(html)
        return html
	}
	var $articlePage = $('#article-page');
	 $articlePage.on('get-data',function(ev,data){
	 	// console.log(data.docs)
	 	//构建文章html
	 	$('#article-wrap').html(buildArticleHtml(data.docs))//写入数据
	 	//构建分页器html
	 	$pagination=$articlePage.find('.pagination')//下面的分页器
	 	if(data.pages>1){

	 		$pagination.html(buildPaginationHtml(data.page,data.pages,data.list))
	 	}else{
	 		$pagination.html('')
	 	}
	 }) 
    $articlePage.pagination({
        url:'/articles'  
    })
    //6用户处理评论分页
    function buildCommentHtml(comments){
    	var html='';
    	comments.forEach(function(comment){
    		var createdTime = moment(comment.createdAt).format('YYYY-MM-DD HH:mm:ss')
    		html+=` <div class="panel panel-default">
				        <div class="panel-heading">${ comment.user.username } 发表于 ${createdTime } </div>
				        <div class="panel-body">
				          ${ comment.content }
				        </div>
				      </div>`
    	})
    	return html
    }
    var $commentPage = $('#comment-page');
    // console.log($commentPage)
     $commentPage.on('get-data',function(ev,data){
	 	// console.log(data.docs)
	 	//构建文章html
	 	$('#comment-wrap').html(buildCommentHtml(data.docs))//写入数据
	 	//构建分页器html
	 	$pagination=$commentPage.find('.pagination')//下面的分页器
	 	if(data.pages>1){

	 		$pagination.html(buildPaginationHtml(data.page,data.pages,data.list))
	 	}else{
	 		$pagination.html('')
	 	}
	 }) 
    $commentPage.pagination({
        url:'/comment/list'  
    })
})(jQuery)