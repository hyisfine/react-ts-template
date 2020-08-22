import path from 'path';
import fs from 'fs';

// 获取项目绝对路径
const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = relativePath => path.resolve(appDirectory, relativePath);

const appAlias={
	'@':resolvePath('src/component'),
	action:resolvePath('src/action'),
}


const pathConfig = {
	appPath: resolvePath('.'),
	appPublic: resolvePath('public'),
	appHtmlTemplate: resolvePath('public/index.html'),
	appSrc: resolvePath('src'),
	appIndexJs: resolvePath('src/index.js'),
	appPackageJson: resolvePath('package.json'),
	appNodeModules: resolvePath('node_modules'),
	appBin: resolvePath('bin'),
	appDist: resolvePath('dist'),
	publicPath:resolvePath('src/public'),
	resolvePath,
	appAlias
};

export default pathConfig;
