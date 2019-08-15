import React from "react";

import { AuthUserContext, withAuthorization } from '../../Session';

import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';

const AccountPage = () => {
  return(
    <AuthUserContext.Consumer>
      { authUser => (
        <div>
          <h1 className="stats stats--nobottom">Account:</h1>
          <h3 className="desc desc--notop">{authUser.email}</h3>
          { authUser
            ? <PasswordChangeForm />
            : <PasswordForgetForm />
          }
        </div>
      )}
    </AuthUserContext.Consumer>
  )
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(AccountPage)
