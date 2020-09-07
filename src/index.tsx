import styled from 'styled-components';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

let H1 = styled.h1`
	flex: 1;
	flex-direction:column;
`;

new Promise((a)=>{
	setTimeout(() => {
		a();
	}, 0);
});

ReactDOM.render(
	<div
	>
		<H1>测试</H1>
	</div>,
	document.getElementById('root')
);

