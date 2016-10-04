var webpack = require("webpack"),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	CleanWebpackPlugin = require('clean-webpack-plugin')


module.exports = {
	entry: {
		main: './main.js',
		vendor: ['rx']
	},
	output: {
		path: './build',
		filename: "[name].js"
	},
	watch: true,
	devtool: 'source-map',
	progress: true,
	colors: true,
	module: {
		loaders: [
			{
				test: /\.scss$/,
				loader: "style!css!sass"
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.template.html',
			inject: 'body',
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			filename: "common.js"
		}),
		new CleanWebpackPlugin(['build']),
	],
	devServer: {
		contentBase: "./build",
	}
};