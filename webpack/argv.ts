const argvStr = process?.env?.npm_config_argv || '';

const useBundleAnalyzer = argvStr.includes('--a');

const argvConfig = {
	useBundleAnalyzer,
};

export default argvConfig;
