import React, { Component } from 'react'
import HomePage from '../../components/homePage/homePage'
import Login from '../../components/login/loginPage';
import Register from '../../components/register/Register'
import RegisterAdmin from '../../components/register/RegisterAdmin'
import UserPage from '../../components/userHampage/userHamepage'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
export default class main extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path='/'><HomePage /></Route>
                        <Route exact path='/Login'><Login /></Route>
                        <Route exact path='/:status/Login'><Login /></Route>
                        <Route exact path='/Register'><Register /></Route>
                        <Route exact path='/RegisterAdmin'><RegisterAdmin /></Route>
                        <Route exact path='/userHome'> <UserPage/> </Route>
                        <Route exact path='/profile'> <UserPage/> </Route>
                        <Route exact path='/createInquiry'> <UserPage/> </Route>
                        <Route exact path='/myInquiry'> <UserPage/> </Route>
                        <Route exact path='/dailyUpdate'> <UserPage/> </Route>
                        <Route exact path='/createdaily'> <UserPage/> </Route>
                    </Switch>
                </Router>
            </div>
        )
    }
}
