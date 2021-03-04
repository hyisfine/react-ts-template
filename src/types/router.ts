import { RouteProps, RedirectProps } from 'react-router-dom';

export interface ExtraCommonProps {
	key?: string;
	routes?: ExtraAllRouterProps[]; // 子路由
	hide?: boolean; // 不渲染
	describe: string;
}

export type ExtraRouteProps = RouteProps & ExtraCommonProps;
export interface ExtraRedirectProps extends RedirectProps, ExtraCommonProps {
	redirect: boolean;
}

export type ExtraAllRouterProps = ExtraRouteProps | ExtraRedirectProps;
