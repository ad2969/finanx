import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session'
import SignOutButton from '../components/SignOut';
import * as ROUTES from '../constants/routes';
import * as ROLES from '../constants/roles';

const Navigation = () => {
  return (
    <div>
      <AuthUserContext.Consumer>
        {authUser =>
          authUser ? (
            <NavigationAuth authUser={authUser} />
          ) : (
            <NavigationNoAuth />
          )
        }
      </AuthUserContext.Consumer>
    </div>
  )
};

const NavigationAuth = ({ authUser }) => {
  return(
    <ul>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </li>
      {!!authUser.roles[ROLES.ADMIN] && (
        <li>
          <Link to={ROUTES.ADMIN}>Admin</Link>
        </li>
      )}
      <li>
        <SignOutButton />
      </li>
    </ul>
  )
};

const NavigationNoAuth = () => {
  return(
    <ul>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
    </ul>
  )
};

export default Navigation
