import React, { PureComponent } from 'react';
// import router from './router';
interface App {
	state: {
		num: number;
	};
}
class App extends PureComponent {
	constructor(params) {
		super(params);
		this.state = {
			num: 1,
		};
	}

	render() {
		return <div>ceshi1</div>;
	}
}

export default App;
