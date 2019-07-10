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
// import AdminPage from './components/Admin';

import * as ROUTES from './constants/routes';
import { withAuthentication } from './Session';

function App() {
  return(
    <Router>
      <Navigation />

      <hr />

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      {
      // <Route path={ROUTES.ADMIN} component={AdminPage} />
      }

    </Router>
  )
}

export default withAuthentication(App);
