import webpack from 'webpack';
import path from 'path';
import paseConfigFunc from '../webpack/base';

webpack(paseConfigFunc('production')).run((error, stats) => {
	if (error) {
		console.log(error);
	}

	if (stats) {
		console.log(
			stats.toString({
				chunks: false, // 使构建过程更静默无输出
				colors: true, // 在控制台展示颜色
			})
		);
	}
});
