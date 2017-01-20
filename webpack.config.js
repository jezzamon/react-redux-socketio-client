const webpack = require('webpack');

module.exports = {
  entry: [
		'webpack-dev-server/client?http://localhost:8090',
    'webpack/hot/only-dev-server',
    './src/index.js'
  ],
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
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel'
    }]
  },
  devServer: {
    contentBase: './dist',
		hot: true
  },
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
};