import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ExtraAllRouterProps } from 'types/router';

const renderRoutes = (
	routesConfig: ExtraAllRouterProps[] = [],
	extraProps: { [name: string]: any; route?: ExtraAllRouterProps | null } = { route: null },
	switchProps = {},
) => {
	if (routesConfig.length === 0) return null;

	return (
		<Switch {...switchProps}>
			{routesConfig.map((route, index) => {
				// ===============
				//  将当前路由在路由表上的信息传递给匹配组件
				// ===============
				extraProps.route = route;

				if (route.hide) return null;

				if ('redirect' in route) {
					return (
						<Redirect
							key={route.key || `${route.path}-${index}`}
							from={route.from}
							to={route.to}
							exact={route.exact}
							strict={route.strict}
						/>
					);
				}

				return (
					<Route
						key={route.key || `${route.path}-${index}`}
						path={route.path}
						exact={route.exact}
						strict={route.strict}
						render={(props) => {
							if (route.render) {
								return route.render({
									...props,
									...extraProps,
								});
							}
							if (route.component) {
								return <route.component {...props} {...extraProps} />;
							}

							return null;
						}}
					/>
				);
			})}
		</Switch>
	);
};

export default renderRoutes;
