import webpack from 'webpack';
import WebpackDevServer, { Configuration } from 'webpack-dev-server';
import chalk from 'chalk';
import paseConfigFunc from '../webpack/config';
import pathConfig from '../webpack/paths';
import commonConfig from './common';

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

WebpackDevServer.addDevServerEntrypoints(webpackConfig, webpackDevServerOptions);
const compiler = webpack(webpackConfig);
const server = new WebpackDevServer(compiler, webpackDevServerOptions);

compiler.hooks.beforeCompile.tap('beforeCompile', () => {
	commonConfig.clearTerminal();
	console.log(chalk.cyan.bold(`🏃🏻‍♂️🏃🏻‍♂️🏃🏻‍♂️🏃🏻‍♂️🏃🏻‍♂️♲`));
	console.log(chalk.cyan.bold(`dev server listening on port ${process.env.PORT}`));
});
// compiler.hooks.afterEmit.tap('afterEmit', () => {});

server.listen(~~process.env.PORT, 'localhost', (error) => {
	if (error) {
		console.log(error);
	}
});
