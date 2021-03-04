import React, { Component } from 'react';

export interface Props {}
export interface State {}

export interface Index {
	props: Props;
	state: State;
}

export class Index extends Component {
	render() {
		return <div>about</div>;
	}
}

export default Index;
