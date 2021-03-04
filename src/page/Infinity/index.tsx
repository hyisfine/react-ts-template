import React, { Component } from 'react';
import renderRoutes from 'router/renderRoutes';
import { ExtraAllRouterProps } from 'types/router';
import { Link, Switch, useLocation, Route, useHistory } from 'react-router-dom';
import './index.scss';

export interface Props {
	route: ExtraAllRouterProps;
}
export interface State {}

export interface Index {
	props: Props;
	state: State;
}

const Index = (props) => {
	return (
		<div>
			infinity <br />
			<div
				className='click'
				contentEditable
				onClick={(e) => {}}
				onInput={(e) => {
					e.persist();
					console.log('%c+++++++++++++++++++++', 'font-size:16px;color:red');
					console.log(e);
				}}
			>
				click
			</div>
			<Link to='/about'>to a</Link> <br />
		</div>
	);
};

export default Index;
