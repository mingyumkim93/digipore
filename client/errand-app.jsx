import React from 'react';
import { LoginPage } from './login-page';
import { Main } from './main';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from './protected.route';
import { RequestPage } from './request-page';
import { MyPage } from './my-page';
import { AcceptPage } from './accept-page';
import { RequestDetail } from './requestdetail';

export class ErrandApp extends React.Component {

    render() {
        return <div>
            <Switch>
                <Route exact path="/" component={LoginPage} />
                <ProtectedRoute exact path="/main" component={Main} />
                <ProtectedRoute exact path="/createrequest" component={RequestPage}/>
                <ProtectedRoute exact path="/mypage" component={MyPage}/>
                <ProtectedRoute exact path="/accept" component={AcceptPage}/>
                <ProtectedRoute exact path="/request/:id" component={RequestDetail}/>

            </Switch>
        </div>

    }
} 