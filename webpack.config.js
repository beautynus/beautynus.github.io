
const
  ExtractTextPlugin = require("extract-text-webpack-plugin"),
  autoprefixer      = require('autoprefixer');

//const styles = require('./common/css/ui.beautynus.scss');

module.exports = {
  context: __dirname,
  entry: {
    beautynus: './common/js/ui.common.js'
  },
  output: {
    path: __dirname + '/common/js/',
    filename: 'ui.beautynus.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_module/,
        loader: 'babel',
        query: {
  				presets: ['es2015', 'stage-0']
  			}
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!autoprefixer-loader?browsers=android 2.3!sass')
          //'style!autoprefixer-loader?{browsers:["last 2 version"]}', 'css!sass'
      }
    ]
  },
  // postcss: function(){
  //   return {
  //     defaults: [autoprefixer],
  //     cleaner: [autoprefixer({browsers:["last 2 version"]})]
  //   }
  // },
  plugins: [
    new ExtractTextPlugin('../css/ui.beautynus.css')
  ],
  devServer: {
		port: 3000,
    hot: true
	},
	devtool: '#inline-source-map'
}
