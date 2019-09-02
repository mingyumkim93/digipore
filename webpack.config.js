var path = require('path');
var webpack = require('webpack');
 
module.exports = {
  entry: './client/app.jsx',
  mode: 'development',
  output: { path: __dirname+'/wwwroot/app', filename: 'app.bundle.js' },
  module: {
    rules: [
      {
        test: /.jsx?$/,
		exclude: /node_modules/,
		use:{
			loader: 'babel-loader',
			options:{
				presets:["env","react"]
			}
		}
      }
      ,{
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  
};