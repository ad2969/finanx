import React from 'react';

import SignInForm from './SignInForm';
import SignInGoogle from './SignInGoogle';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';

const SignInPage = () => {
  return(
    <div>
      <h1 className="stats">SIGN IN</h1>
      <SignInForm />
      <SignInGoogle />
      <div className="stats"><PasswordForgetLink /></div>
      <div className="stats"><SignUpLink /></div>
    </div>
  )
}

export default SignInPage
