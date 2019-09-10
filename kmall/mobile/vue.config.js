const path= require('path');

module.exports = {
	//less设置
	 pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
      	path.resolve(__dirname, './src/assets/less/index.less')
      ]
    }
  },
  //端口设置
  devServer:{
    port:3003,
    proxy: 'http://127.0.0.1:3000',
  },
  //别名设置
  chainWebpack:config =>{
    config.resolve.alias
    .set('pages',path.resolve(__dirname,'./src/pages'))
    .set('api',path.resolve(__dirname,'./src/api'))
    .set('util',path.resolve(__dirname,'./src/util'))
  } 
}