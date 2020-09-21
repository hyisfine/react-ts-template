import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import A from './a';
import styled from 'styled-components';
import page from '@page/index';
const H1 = styled.h1`
	background: red;
	flex: 1;
	div {
		background: red;
	}
`;
class Ac extends React.Component {
	public render() {
		return <div>abc</div>;
	}
}
ReactDOM.render(
	<div>
		<Ac />
		<A />
		<div
			style={{
				background: '#111111',
			}}
		>
			aa
			<H1>123</H1>
		</div>
		<h1 />
		<div />
	</div>,
	document.getElementById('root'),
);
