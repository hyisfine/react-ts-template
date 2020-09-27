import fs from 'fs';
import chalk from 'chalk';

const gitEmoji = {
	feat: {
		emoji: '🦋',
	},
	fix: {
		emoji: '🐛',
	},
	docs: {
		emoji: '📚',
	},
	style: {
		emoji: '📝',
	},
	refactor: {
		emoji: '🔨',
	},
	chore: {
		emoji: '👷',
	},
	perf: {
		emoji: '🚀',
	},
};
const commitType = Object.keys(gitEmoji);
// prettier-ignore
const commitEmoji = Object.values(gitEmoji).reduce((eomjiArr, item) => [...eomjiArr, item.emoji],[]);
const commitPath = process.env.HUSKY_GIT_PARAMS || '';
const commit = fs.readFileSync(commitPath, 'utf-8').trim();

const typeRegExp = commitType.reduce((re, item) => re + item + '|', '');
const emojiRegExp = commitEmoji.reduce((re, item) => re + item + '|', '');
const commitRegExp = new RegExp(`\^\(${typeRegExp}\)\(\\(\.\+\\)\)\?: \.\{1,50\}`, 'g');
// prettier-ignore
const commitRpalceRegExp = new RegExp(`\^\(${typeRegExp}\)\(\\(\.\+\\)\)\?: \(${emojiRegExp}\)\?`,'g',);
const verifyCommit = commitRegExp.test(commit);

if (!verifyCommit) {
	const errorMessage =
		`${chalk.bgRed.white('ERROR:')}\n` +
		`	${chalk.red('Invalid commit-message format')}\n` +
		`	${chalk.red('The correct commit-message format looks like this:')}\n` +
		`	${chalk.green('chore(compiler?): add webpack options')}\n\n` +
		`	${chalk.red('The type value must be one of the following:')}\n` +
		`	${chalk.green(typeRegExp)}\n`;

	console.log(errorMessage);
	process.exit(1);
}

const commitMoji = commit.replace(commitRpalceRegExp, (match) => {
	const type = match.split('(', 1)[0].split(':', 1)[0];
	const _match = match.split(' ');
	_match.pop();
	return _match.join('') + ' ' + gitEmoji[type].emoji;
});

fs.writeFileSync(commitPath, commitMoji, 'utf-8');
