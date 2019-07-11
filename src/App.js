import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './styles/App.scss';
// import Year from './Components/Application/year';

import Navigation from './navigation/navbar';
import LandingPage from './components/Landing';
import SignInPage from './components/SignIn';
import SignUpPage from './components/SignUp';
import PasswordForgetPage from './components/PasswordForget';
import HomePage from './components/Home';
import AccountPage from './components/Account';
import AdminPage from './components/Admin';

import * as ROUTES from './constants/routes';
import { withAuthentication } from './Session';

function App() {
  return(
    <Router>
      <Navigation />

      <hr />

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route exact path={ROUTES.HOME} component={HomePage} />
      <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route exact path={ROUTES.ADMIN} component={AdminPage} />

    </Router>
  )
}

export default withAuthentication(App);
