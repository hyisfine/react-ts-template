import webpack from 'webpack';
import paseConfigFunc from '../webpack/config';
import commonConfig from './common';

process.env.NODE_ENV = 'production';

const webpackConfig = paseConfigFunc('production');
const compiler = webpack(webpackConfig);

compiler.hooks.beforeCompile.tap('beforeCompile', commonConfig.clearTerminal);
compiler.run((error, stats) => {
	if (error) {
		console.log(error);
	}

	if (stats) {
		console.log(stats.toString(commonConfig.stats));
	}
});
