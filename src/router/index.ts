import React from 'react';
import { ExtraAllRouterProps } from 'types/router';

const InfinityPage = React.lazy(() => import('page/Infinity'));
const ArticlesPage = React.lazy(() => import('page/Articles'));
const ArchivePage = React.lazy(() => import('page/Archive'));
const NotesPage = React.lazy(() => import('page/Notes'));
const TipsPage = React.lazy(() => import('page/Tips'));
const AboutPage = React.lazy(() => import('page/About'));
const NotFounddPage = React.lazy(() => import('page/NotFound'));

// 通过renderRoutes(this.props.route)渲染子级页面
const getRouterConfig = () => {
	const RouterMap: ExtraAllRouterProps[] = [
		{
			redirect: true,
			from: '/',
			to: '/infinity',
			exact: true,
			describe: '跳转首页',
		},
		{
			path: '/infinity',
			component: InfinityPage,
			exact: true,
			describe: '首页',
		},
		{
			path: '/articles',
			component: ArticlesPage,
			exact: true,
			describe: '文章',
		},
		{
			path: '/notes',
			component: NotesPage,
			exact: true,
			describe: '笔记',
		},
		{
			path: '/tips',
			component: TipsPage,
			exact: true,
			describe: '提示',
		},
		{
			path: '/archive',
			component: ArchivePage,
			exact: true,
			describe: ' 归档',
		},
		{
			path: '/about',
			component: AboutPage,
			exact: true,
			describe: ' 关于',
		},
		// 顺序先于通配路径
		{
			path: '/404',
			component: NotFounddPage,
			exact: true,
			describe: ' not found',
		},
		{
			redirect: true,
			from: '*',
			to: '/404',
			exact: true,
			describe: '跳转404',
		},
	];

	return RouterMap;
};

export default getRouterConfig;
