import React from 'react';
import ReactDOM from 'react-dom';
import { ErrandApp } from './errand-app';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'

window.onload = function () {


	ReactDOM.render(
		<BrowserRouter>
			<ErrandApp/>
		</BrowserRouter>
		,
		document.getElementById('appcontent')
	);
};
