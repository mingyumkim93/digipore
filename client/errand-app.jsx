import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from './protected-route';
import { SignUpPage} from './sign-up';
import { LoginPage } from './login';
import { ErrandsListPage } from './errands-list';
import { NewErrandPage } from './new-errand';
import { MyErrandsPage } from './my-errands';
import { ErrandDetailPage } from './errand-detail';
import { ModifyMyErrandPage } from './modify-my-errand';
import { UserProfilePage } from './user-profile';

export class ErrandApp extends React.Component {

    render() {
        return <div>
            <Switch>
                <Route exact path="/" component={LoginPage} />
                <Route exact path ="/signup" component={SignUpPage}/>
                <ProtectedRoute exact path="/main" component={ErrandsListPage} />
                <ProtectedRoute exact path="/createrequest" component={NewErrandPage}/>
                <ProtectedRoute exact path="/mypage" component={MyErrandsPage}/>
                <ProtectedRoute exact path="/request/:id" component={ErrandDetailPage}/>
                <ProtectedRoute exact path="/myrequest/:id" component={ModifyMyErrandPage}/>
                <ProtectedRoute exact path="/user/:email" component={UserProfilePage}/>
            </Switch>
        </div>

    }
} 