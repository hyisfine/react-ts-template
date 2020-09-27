import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import A from './page/a';

let a = '12345678';
let b = Number(a);

ReactDOM.render(
	<App>
		<A />
		{b}
	</App>,
	document.getElementById('root'),
);
