import webpack from 'webpack';
import fs from 'fs';
import path from 'path';
import pathConfig from '../webpack/paths';

type webpackEnv = 'development' | 'production';

export default (webpackEnv: webpackEnv) => {
	const isEnvDevelopment = webpackEnv === 'development';
	const isEnvProduction = webpackEnv === 'production';

	const baseConfig: webpack.Configuration = {
		name: 'yoo',
		mode: isEnvProduction ? 'production' : 'development',
		devtool: isEnvProduction ? 'source-map' : 'cheap-module-source-map',
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
			publicPath: pathConfig.publicPath,
		},
		resolve: {
			alias: pathConfig.appAlias,
			extensions: ['js', 'ts', 'css', 'sass', 'scss'],
			modules: ['node_modules', pathConfig.appSrc],
		},
		// module: {
		// 	rules: {},
		// },
		optimization: {
            minimize:isEnvProduction,
			moduleIds: 'hashed',
			runtimeChunk: {
				name: entrypoint => `runtimechunk~${entrypoint.name}`,
			},
			splitChunks: {
                chunks: 'all',
                name: false,
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendors',
						chunks: 'all',
					},
                },
			},
		},
	};

	return baseConfig;
};
