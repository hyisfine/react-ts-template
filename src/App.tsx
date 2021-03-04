/* eslint-disable react/no-children-prop */
import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import getRouterConfig from 'router';
import renderRoutes from 'router/renderRoutes';

const routeConfig = getRouterConfig();

function App() {
	return (
		<Suspense fallback={<div>Loading... </div>}>
			<Router>{renderRoutes(routeConfig)}</Router>
		</Suspense>
	);
}

export default App;
