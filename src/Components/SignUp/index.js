import React from 'react';
import SignUpLink from './SignUpLink';
import SignUpForm from './SignUpForm';

const SignUpPage = () => {
  return(
    <div>
      <h1 className="stats">Create a New Account</h1>
      <SignUpForm />
    </div>
  )
}

export default SignUpPage
export { SignUpForm, SignUpLink }
