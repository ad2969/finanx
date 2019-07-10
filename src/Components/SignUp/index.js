import React from "react";
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../constants/routes';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "../../styles/login.css";

const SignUpPage = () => {
  return(
    <div>
      <h1 className="stats">Create a New Account</h1>
      <SignUpForm />
    </div>
  )
}

const INITIAL_STATE = {
  username:     '',
  email:        '',
  passwordOne:  '',
  passwordTwo:  '',
  error:        null
}

class SignUpFormBase extends React.Component {

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
    const {username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        return this.props.firebase
          .user(authUser.user.id)
          .set({
            username,
            email,
          });
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        alert("Create account error!");
        this.setState({ error });
      });

    event.preventDefault();
  }


  render() {

    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <div className="Login">
        <form onSubmit={this.onSubmit}>
          <Form.Group controlId="username" bssize="large">
            <Form.Control
              name="username"
              value={username}
              onChange={this.onChange}
              type="text"
              placeholder="Username"
            />
          </Form.Group>
          <Form.Group controlId="email" bssize="large">
            <Form.Control
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              placeholder="Email Address"
            />
          </Form.Group>
          <Form.Group controlId="passwordOne" bssize="large">
            <Form.Control
              name="passwordOne"
              value={passwordOne}
              onChange={this.onChange}
              type="text"
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group controlId="passwordTwo" bssize="large">
            <Form.Control
              name="passwordTwo"
              value={passwordTwo}
              onChange={this.onChange}
              type="text"
              placeholder="Confirm Password"
            />
          </Form.Group>
          <Button
            disabled={isInvalid}
            type="submit"
          >
            Sign Up
          </Button>

          {error && <p>{error.message}</p>}

        </form>
      </div>
    );
  }
}

const SignUpLink = () => {
  return(
    <p>
      Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
  )
}

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage
export { SignUpForm, SignUpLink }
