import React from "react";
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../constants/routes';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "../../styles/login.css";

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
}

class SignInFormBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        alert("Account not found!");
        this.setState({ error });
      });

    event.preventDefault();
  }

  render() {

    const {
      email,
      password,
      error
    } = this.state;

    const isInvalid =
      password === '' || email === '';

    return (
      <div className="Login">
        <Form onSubmit={this.onSubmit} className="stats">
          <Form.Group controlId="email" bssize="large">
            <Form.Control
              autoFocus
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              type="text"
              placeholder="Enter e-mail"
            />
          </Form.Group>
          <Form.Group controlId="password" bssize="large">
            <Form.Control
              name="password"
              value={this.state.password}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button
            block
            bssize="large"
            disabled={isInvalid}
            type="submit"
          >
            Login
          </Button>

          {error && <p>{error.message}</p>}

        </Form>
      </div>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInForm
export { SignInFormBase }
