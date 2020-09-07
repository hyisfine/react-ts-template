import webpack, { Configuration, HotModuleReplacementPlugin } from 'webpack';
import TerserWebpackPlugin from 'terser-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import styledComponentsTransformer from 'typescript-plugin-styled-components';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import AutoDllPlugin from 'autodll-webpack-plugin';
import PostcssPresetEnv from 'postcss-preset-env';
import Autoprefixer from 'autoprefixer';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';
import pathConfig from './paths';

type WebpackEnv = 'development' | 'production';

const baseConfigFunc = (webpackEnv: WebpackEnv) => {
	const isEnvDevelopment = webpackEnv === 'development';
	const isEnvProduction = webpackEnv === 'production';

	const baseConfig: Configuration = {
		name: 'yoo',
		mode: isEnvProduction ? 'production' : 'development',
		devtool: isEnvProduction ? false : 'eval-source-map',
		entry: pathConfig.appIndexJs,
		bail: isEnvProduction,
		output: {
			path: pathConfig.appDist,
			filename: isEnvProduction
				? 'static/js/[name].[contenthash:8].js'
				: 'static/js/main.js',
			chunkFilename: isEnvProduction
				? 'static/js/[name].[contenthash:8].chunk.js'
				: 'static/js/[name].chunk.js',
			pathinfo: isEnvDevelopment,
			// publicPath: pathConfig.publicPath,
		},
		resolve: {
			alias: pathConfig.appAlias,
			extensions: ['.tsx', '.ts', '.js', '.jsx'],
			modules: ['node_modules', pathConfig.appSrc],
		},
		module: {
			rules: [
				{
					test: /\.(ts|tsx)$/,
					include: /src/,
					exclude: /(node_modules|bower_components)/,
					use: [
						{
							loader: 'babel-loader?cacheDirectory',
							options: {
								presets: ['@babel/env', '@babel/preset-react'],
								plugins: [
									'@babel/plugin-transform-runtime',
									'@babel/plugin-syntax-dynamic-import',
									[
										'babel-plugin-styled-components',
										{
											minify: isEnvProduction,
											transpileTemplateLiterals: isEnvProduction,
											pure: isEnvProduction,
										},
									],
									isEnvDevelopment &&
										'react-hot-loader/babel',
								].filter(Boolean),
							},
						},
						{
							loader: 'ts-loader?cacheDirectory',
							options: {
								getCustomTransformers: () => ({
									before: [styledComponentsTransformer()],
								}),
							},
						},
						{
							loader: 'eslint-loader',
							options: {
								fix: true,
							},
						},
					],
				},
				{
					test: /\.(s[ac]ss|css)$/i,
					use: [
						isEnvProduction
							? MiniCssExtractPlugin.loader
							: 'style-loader',
						'css-loader',
						{
							loader: 'postcss-loader',
							options: {
								ident: 'postcss',
								plugins: [
									Autoprefixer({
										env: webpackEnv,
									}),
								],
							},
						},
						'sass-loader',
					],
				},
				{
					loader: 'file-loader',
					include: /\.(png|jpe?g|gif)$/i,
					options: {
						name: isEnvProduction
							? 'static/media/[contenthash:8].[ext]'
							: 'static/media/[name].[ext]',
					},
				},
				{
					test: /\.(png|jpe?g|gif)$/i,
					loader: 'url-loader',
					options: {
						limit: 1024 * 20,
					},
				},
			],
		},
		optimization: {
			minimize: isEnvProduction,
			minimizer: [
				new TerserWebpackPlugin({
					sourceMap: false,
					extractComments: true,
					parallel: 4,
					cache: true,
				}),
				new OptimizeCSSAssetsPlugin({}),
			],

			moduleIds: 'hashed',
			runtimeChunk: {
				name: (entrypoint) => `runtimechunk~${entrypoint.name}`,
			},
			splitChunks: {
				chunks: 'all',
				name: isEnvDevelopment,
				maxInitialRequests: Infinity,
				minSize: 1024 * 50,
				minChunks: 2,
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name(module) {
							const packageName = module.context.match(
								/[\\/]node_modules[\\/](.*?)([\\/]|$)/
							)[1];
							return `vendor.${packageName.replace('@', '')}`;
						},
						chunks: 'all',
						reuseExistingChunk: false,
						priority: 10,
					},
				},
			},
		},
		plugins: [
			new HardSourceWebpackPlugin(),
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				template: pathConfig.appHtmlTemplate,
				title: 'yoo',
				inject: 'body',
				minify: {
					collapseWhitespace: isEnvProduction,
					minifyJS: isEnvProduction,
					minifyCSS: isEnvProduction,
					minifyURLs: isEnvProduction,
				},
			}),
			// new AutoDllPlugin({
			// 	inject: true, // will inject the DLL bundle to index.html
			// 	debug: true,
			// 	filename: '[name]_[hash].js',
			// 	path: './dll',
			// 	entry: {
			// 		vendor: ['react', 'react-dom','styled-components'],
			// 	},
			// }),
			isEnvProduction &&
				new CopyWebpackPlugin({
					patterns: [
						{
							from: pathConfig.appPublic,
							to: pathConfig.appDist,
							globOptions: {
								ignore: ['**/*.ejs'],
							},
						},
					],
				}),
			isEnvProduction &&
				new MiniCssExtractPlugin({
					filename: 'static/css/[name].[contenthash:8].css',
					chunkFilename:
						'static/css/[name].[contenthash:8].chunk.css',
				}),
			isEnvDevelopment && new HotModuleReplacementPlugin(),
		].filter(Boolean),
	};

	return baseConfig;
};

export default baseConfigFunc;
