import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from './protected-route';
import { SignUpPage} from './sign-up';
import { LoginPage } from './login';
import { ErrandsListPage } from './errands-list';
import { NewErrandPage } from './new-errand';
import { MyErrandsListPage } from './my-errands';
import { ErrandDetailPage } from './errand-detail';
import { ModifyMyErrandPage } from './modify-my-errand';
import { UserProfilePage } from './user-profile';
import { CreateOfferPage} from'./create-offer';
import { SeeOfferPage} from './see-offer';
import { MyAccountPage} from './my-account';

export class ErrandApp extends React.Component {

    render() {
       

        return <div style={{marginTop : 50}}>
            <Switch>
                <Route exact path="/" component={LoginPage} />
                <Route exact path ="/signup" component={SignUpPage}/>
                <ProtectedRoute exact path="/errands-list" component={ErrandsListPage} />
                <ProtectedRoute exact path="/create-errand" component={NewErrandPage}/>
                <ProtectedRoute exact path="/my-errands-list" component={MyErrandsListPage}/>
                <ProtectedRoute exact path="/errand/:id" component={ErrandDetailPage}/>
                <ProtectedRoute exact path="/my-errand/:id" component={ModifyMyErrandPage}/>
                <ProtectedRoute exact path="/user/:email" component={UserProfilePage}/>
                <ProtectedRoute exact path="/create-offer/:id" component={CreateOfferPage}/>
                <ProtectedRoute exact path="/see-offers/:id" component={SeeOfferPage}/>
                <ProtectedRoute exact path="/my-account" component={MyAccountPage}/>
            </Switch>
        </div>

    }
} 