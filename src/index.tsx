// import styled from 'styled-components';
import React from 'react';
import ReactDOM from 'react-dom';

let a = {};

let b = (a) => {
	console.log(a.b.c);
};

b(a);

ReactDOM.render(
	<div
		className='1'
		data-index='1'
		style={{
			fontSize: '30px',
		}}
	></div>,
	document.getElementById('root')
);
