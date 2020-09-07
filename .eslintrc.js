module.exports = {
	parserOptions: {
		ecmaVersion: 6,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	extends: ['eslint:recommended', 'plugin:react/recommended'],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	rules: {
		semi: 1,
		//禁止在 return、throw、continue 和 break 语句之后出现不可达代码
		'no-unreachable': 1,
		//要求使用 === 和 !==
		eqeqeq: 1,
		//禁止不必要的 .bind() 调用
		'no-extra-bind': 1,
		//要求使用 let 或 const 而不是 var
		'no-var': 1,
		'react/destructuring-assignment': 1,
		'react/no-will-update-set-state': 1,
		'react/jsx-equals-spacing': 1,
		'no-unused-vars': 1,
	},
	settings: {
		react: {
			version: '16.13.1',
		},
	},
	env: {
		browser: true,
		commonjs: true,
		es6: true,
		node: true,
	},
};