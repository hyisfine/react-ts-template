import React, { PureComponent } from 'react';
// import router from './router';

import('./router').then((router) => {
	console.log(router);
});

export class App extends PureComponent {
	render() {
		return <div>ceshi1</div>;
	}
}

export default App;
