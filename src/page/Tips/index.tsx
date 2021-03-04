import React, { Component } from 'react';

export interface Props {}
export interface State {}

export interface Index {
	props: Props;
	state: State;
}

export class Index extends Component {
	render() {
		return <div>tips</div>;
	}
}

export default Index;
