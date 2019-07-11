import React from "react";
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../constants/routes';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "../../styles/login.css";

class SignInGoogleBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        return this.props.firebase
          .user(socialAuthUser.user.uid)
          .set({
            username: socialAuthUser.user.displayName,
            email:    socialAuthUser.user.email,
            roles:    {},
          });
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <div className="Login">
        <Form onSubmit={this.onSubmit}>
          <Button type="submit">Sign In with Google</Button>

          {error && <p>{error.message}</p>}
        </Form>
      </div>
    );
  }
}

const SignInGoogle = compose(
  withRouter,
  withFirebase,
)(SignInGoogleBase);

export default SignInGoogle
export { SignInGoogleBase }
