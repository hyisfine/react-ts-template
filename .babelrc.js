module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					// babel-node 运行es6
					esmodules: true,
				},
			},
		],
	],
};
