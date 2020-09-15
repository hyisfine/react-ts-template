import React, { PureComponent } from 'react';

function sealed(constructor: Function) {
	console.log(arguments);

	Object.seal(constructor);
	Object.seal(constructor.prototype);
}
@sealed
export class index extends PureComponent {
	render() {
		return <div>测试</div>;
	}
}

// as
export default index;
