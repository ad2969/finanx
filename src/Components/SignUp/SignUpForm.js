import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../../Firebase';
import { dataTemplate,
         settingsTemplate,
         widgetTemplate,
         WIDGET_COUNT } from '../../data/firebaseTemplate.js'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "../../styles/login.css";

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const INITIAL_STATE = {
  username:     '',
  email:        '',
  passwordOne:  '',
  passwordTwo:  '',
  isAdmin:      false,
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

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  }

  onSubmit = event => {
    const {username, email, passwordOne, isAdmin } = this.state;
    console.log(isAdmin);
    const roles = {};

    if(isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Initialize user in database
        this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
            roles,
        });
        // Initialize empty user data in database
        this.props.firebase
          .userData(authUser.user.uid)
          .set({
            months: dataTemplate,
            generalSettings: settingsTemplate,
            widgets: {
              widgets: widgetTemplate,
              counter: WIDGET_COUNT
            }
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
      isAdmin,
      error
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <div className="Login">
        <form onSubmit={this.onSubmit} className="stats">
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
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group controlId="passwordTwo" bssize="large">
            <Form.Control
              name="passwordTwo"
              value={passwordTwo}
              onChange={this.onChange}
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Group>
          <Form.Group controlId="isAdmin">
            <Form.Check
              name="isAdmin"
              type="checkbox"
              checked={isAdmin}
              onChange={this.onChangeCheckbox}
              label="Admin?" />
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

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);


export default SignUpForm
export { SignUpFormBase }
