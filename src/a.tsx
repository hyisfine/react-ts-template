import React, { PureComponent } from 'react';

function sealed(constructor: Function) {
	// return Bool
	console.log(arguments);
}
let a = 1;

interface State {
	a: 1;
}

@sealed
export class index extends PureComponent<{}, State> {
	constructor(params) {
		super(params);
		// this.state = {
		// 	a: 1,
		// };
	}
	render() {
		return <div>11测试</div>;
	}
}

// as
export default index;
