;(function($){
	 //配置富文本编辑器 ckeditor
    ClassicEditor.create(document.querySelector( '#content' ),{
        language:'zh-cn',
        ckfinder:{
			uploadUrl:'/article/uploadImage'
		}
    })
    .catch(error => {
        console.log( 'ckeditor config err:',error );
    })
})(jQuery)