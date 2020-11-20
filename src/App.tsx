import React, { PureComponent } from 'react';
// import router from './router';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
	return (
		<Router>
			<div>
				<nav>
					<ul>
						<li>
							<Link to='/'>Home</Link>
						</li>
						<li>
							<Link to='/about'>About</Link>
						</li>
						<li>
							<Link to='/users'>Users</Link>
						</li>
					</ul>
				</nav>
				<Switch>
					<Route path='/about'>关于</Route>
					<Route path='/users'>用户</Route>
					<Route path='/'>首页</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
