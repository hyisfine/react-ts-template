import { Configuration, HotModuleReplacementPlugin } from 'webpack';
import TerserWebpackPlugin from 'terser-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import styledComponentsTransformer from 'typescript-plugin-styled-components';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import Autoprefixer from 'autoprefixer';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ForkTsCheckerNotifierWebpackPlugin from 'fork-ts-checker-notifier-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import EslintWebpackPlugin from 'eslint-webpack-plugin';
import StylelintWebpackPlugin from 'stylelint-webpack-plugin';
import pathConfig from './paths';

type webpackEnv = 'development' | 'production';

const baseConfigFunc = (webpackEnv: webpackEnv): Configuration => {
	const isEnvDevelopment = webpackEnv === 'development';
	const isEnvProduction = webpackEnv === 'production';

	const baseConfig: Configuration = {
		name: 'yoo',
		context: pathConfig.resolvePath('../yoo'),
		mode: isEnvProduction ? 'production' : 'development',
		devtool: isEnvProduction ? false : 'cheap-module-eval-source-map',
		entry: pathConfig.appIndexJs,
		bail: isEnvProduction,
		output: {
			path: pathConfig.appDist,
			filename: isEnvProduction
				? 'static/js/[name].[contenthash:8].main.js'
				: 'static/js/[name].main.js',
			chunkFilename: isEnvProduction
				? 'static/js/[name].[contenthash:8].chunk.js'
				: 'static/js/[name].chunk.js',
			pathinfo: isEnvProduction,
			// publicPath: pathConfig.publicPath,
		},
		resolve: {
			alias: { ...pathConfig.appAlias },
			extensions: ['.tsx', '.ts', '.js', '.jsx'],
			modules: ['node_modules'],
		},
		module: {
			rules: [
				{
					test: /\.(ts|tsx)$/,
					include: /src/,
					exclude: /(node_modules|bower_components)/,
					use: [
						{
							loader: 'babel-loader',
							options: {
								cacheDirectory: true,
								presets: ['@babel/preset-env', '@babel/preset-react'],
								plugins: [
									'@babel/plugin-transform-runtime',
									[
										'babel-plugin-styled-components',
										{
											minify: isEnvProduction,
											transpileTemplateLiterals: isEnvProduction,
											pure: isEnvProduction,
										},
									],
									isEnvDevelopment && 'react-hot-loader/babel',
								].filter(Boolean),
							},
						},
						{
							loader: 'ts-loader',
							options: {
								transpileOnly: true,
								getCustomTransformers: () => ({
									before: [styledComponentsTransformer()],
								}),
							},
						},
					],
				},
				{
					test: /\.(s?css)$/i,
					use: [
						isEnvProduction
							? 'style-loader'
							: {
									loader: MiniCssExtractPlugin.loader,
									options: {
										esModule: true,
									},
							  },
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
					terserOptions: {
						output: {
							comments: false,
						},
					},
					extractComments: false,
					parallel: true,
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
				maxSize: isEnvDevelopment ? 0 : 300000,
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name(module) {
							const packageName = module.context.match(
								/[\\/]node_modules[\\/](.*?)([\\/]|$)/,
							)[1];
							return `${packageName.replace('@', '')}`;
						},
						chunks: 'all',
						priority: 10,
						minChunks: 2,
						reuseExistingChunk: true,
					},
				},
			},
		},
		plugins: [
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
			isEnvProduction && new HardSourceWebpackPlugin(),
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
					filename: 'static/css/[name].css',
					chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
				}),
			isEnvProduction && new BundleAnalyzerPlugin(),
			isEnvDevelopment && new ForkTsCheckerWebpackPlugin({ async: true }),
			isEnvDevelopment && new HotModuleReplacementPlugin(),
			isEnvDevelopment &&
				new EslintWebpackPlugin({
					fix: true,
					// emitWarning: true,
					quiet: true,
					context: 'src',
					extensions: ['.tsx', '.ts', '.js'],
				}),
			isEnvDevelopment &&
				new StylelintWebpackPlugin({
					context: 'src',
					fix: true,
					lintDirtyModulesOnly: true,
					quiet: true,
				}),
		].filter(Boolean),
	};

	return baseConfig;
};

export default baseConfigFunc;
