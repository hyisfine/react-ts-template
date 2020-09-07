import webpack from 'webpack';
import webpackDevServer, { Configuration } from 'webpack-dev-server';
import paseConfigFunc from '../webpack/config';
import pathConfig from '../webpack/paths';
import commonConfig from './common';
import chalk from 'chalk';

process.env.NODE_ENV = 'development';
process.env.PORT = '8080';

const webpackConfig = paseConfigFunc('development');
const webpackDevServerOptions: Configuration = {
	contentBase: pathConfig.appPublic,
	hot: true,
	host: 'localhost',
	open: true,
	port: ~~process.env.PORT,
	compress: true,
	stats: commonConfig.stats,
};

webpackDevServer.addDevServerEntrypoints(
	webpackConfig,
	webpackDevServerOptions
);
const compiler = webpack(webpackConfig);
const server = new webpackDevServer(compiler, webpackDevServerOptions);

compiler.hooks.beforeCompile.tap('beforeCompile', commonConfig.clearTerminal);
compiler.hooks.afterEmit.tap('afterEmit', () => {
	console.log(
		chalk.cyan.bold(`dev server listening on port ${process.env.PORT}`)
	);
});

server.listen(~~process.env.PORT, 'localhost', () => {
	console.log(chalk.cyan.bold(`🏃🏻‍♂️🏃🏻‍♂️🏃🏻‍♂️🏃🏻‍♂️🏃🏻‍♂️♲`));
});
