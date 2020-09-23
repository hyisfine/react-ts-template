import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

let a = (a) => {
	console.log(a.test());
};

a(1);

ReactDOM.render(<App />, document.getElementById('root'));
