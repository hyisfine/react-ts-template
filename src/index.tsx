import React, { Component } from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import { a } from '@page/index';
import A from './a';
import './index.scss';

const H1 = styled.h1`
	background: red;
	flex: 1;
	div {
		background: red;
	}
`;
class Ac extends Component {
	handleBack = () => {};
	render() {
		return (
			<div onClick={this.handleBack}>
				<div>策四 </div>
			</div>
		);
	}
}

interface Props {
	Enabled: boolean;
}
const Hello = (props: Props) => <div />;

ReactDOM.render(
	<div>
		<Ac />
		<A b />
		<div
			className='11'
			style={{
				background: 'red',
			}}
			data-a='1'
			data-v='1'
		>
			<H1>123</H1>
			{true && <div>111</div>}
		</div>
		<h1 />
		<div />
	</div>,
	document.getElementById('root'),
);
