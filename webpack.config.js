var path = require('path');
var webpack = require('webpack');
 
module.exports = {
  entry: './client/app.jsx',
  mode: 'development',
  output: { publicPath:'' },
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
  }
};