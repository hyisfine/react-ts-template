import fs from 'fs';
import chalk from 'chalk';

const commitPath = process.env.HUSKY_GIT_PARAMS || '';
const commit = fs.readFileSync(commitPath, 'utf-8').trim();
const commitRegExp = /^(feat|fix|docs|style|refactor|chore)(\(.+\))?: .{1,50}/;
const verifyCommit = commitRegExp.test(commit);

if (!verifyCommit) {
	const errorMessage =
		`${chalk.bgRed.white('ERROR:')}\n` +
		`	${chalk.red('Invalid commit-message format')}\n` +
		`	${chalk.red('The correct commit-message format looks like this:')}\n\n` +
		`	${chalk.green('chore(compiler?): add webpack options')}\n`;

	console.log(errorMessage);
	process.exit(1);
}
