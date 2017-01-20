const webpack = require('webpack');

module.exports = {
  entry: [
		'webpack-dev-server/client?http://localhost:8090', // necessary for hot module
    'webpack/hot/only-dev-server',  // necessary for hot module reloader
    './src/index.js'
  ],
	//turn on sourcemaps
	devtool: 'source-map',
	resolve: {
		extensions: ['','.js','.jsx']
	},
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
	module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel' //load hot-module-loader and babel -loader
    }]
  },
  devServer: {
    contentBase: './dist',
		hot: true  //necessary for hot module
  },
	plugins: [
		new webpack.HotModuleReplacementPlugin()  // necessary for hot module loader
	]
};