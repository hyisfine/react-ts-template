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
import pathConfig from './paths';

type WebpackEnv = 'development' | 'production';

const baseConfigFunc = (webpackEnv: WebpackEnv): Configuration => {
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
			filename: isEnvProduction ? 'static/js/[name].[contenthash:8].js' : 'static/js/main.js',
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
								presets: [
									[
										'@babel/preset-env',
										{
											modules: 'commonjs',
											targets: {
												browsers: 'last 2 versions',
											},
										},
									],
									'@babel/preset-react',
								],
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
					test: /\.(s[ac]ss|css)$/i,
					use: [
						isEnvProduction ? MiniCssExtractPlugin.loader : 'style-loader',
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
								/[\\/]node_modules[\\/](.*?)([\\/]|$)/,
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
			new ForkTsCheckerWebpackPlugin({}),
			new ForkTsCheckerNotifierWebpackPlugin({
				title: 'TypeScript',
				excludeWarnings: false,
			}),
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
					chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
				}),
			isEnvProduction && new BundleAnalyzerPlugin(),
			isEnvDevelopment && new HotModuleReplacementPlugin(),
			isEnvDevelopment &&
				new EslintWebpackPlugin({
					fix: true,
					// emitWarning: true,
					quiet: true,
					context: 'src',
					extensions: ['.tsx', '.ts', '.js'],
				}),
		].filter(Boolean),
	};

	return baseConfig;
};

export default baseConfigFunc;
