import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

let root = document.getElementById('root');
if (!root) {
	root = document.createElement('div');
	root.id = 'root';
	document.body.insertAdjacentElement('afterbegin', root);
}

ReactDOM.render(<App />, root);
