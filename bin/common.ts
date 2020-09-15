const commonConfig = {
	clearTerminal() {
		process.stdout.write(
			process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H',
		);
	},
	stats: {
		chunks: false, // 静默无输出
		colors: true, // 展示颜色
		modules: false, // 模块信息
		version: false, // webpack版本信息
		builtAt: false, // 构建时间
		hash: false, // hash值
		entrypoints: false, //	入口文件
		children: false, //	子组件
	},
};

export default commonConfig;
