import React from 'react';
import ReactDOM from 'react-dom';
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
