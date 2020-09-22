import React, { PureComponent } from 'react';

function sealed(constructor: Function) {
	// return Bool
	console.log(arguments);
}

interface Props {
	b: boolean;
}

interface State {
	a: boolean;
}

@sealed
export class index extends PureComponent<Props, State> {
	constructor(params) {
		super(params);
		const { b } = this.props;
		this.state = {
			a: false,
		};
		console.log(b);
	}
	render() {
		return <div>11测试</div>;
	}
}

// as
export default index;
