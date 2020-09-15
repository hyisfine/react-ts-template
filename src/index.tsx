import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import A from './a';

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
		</div>

		<div />
	</div>,
	document.getElementById('root'),
);
