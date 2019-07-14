import React from 'react';
import ReactDOM from 'react-dom';
import { Main } from './main';
import { LoginPage } from './login-page';
import { RequestPage } from './request-page';
import { AcceptPage } from './accept-page';
import { MyPage } from './my-page';
import { ErrandApp } from './errand-app';
import { BrowserRouter } from 'react-router-dom';

window.onload = function () {
	ReactDOM.render(
		<BrowserRouter>
			<ErrandApp />
		</BrowserRouter>
		,
		document.getElementById('appcontent')
	);
};
