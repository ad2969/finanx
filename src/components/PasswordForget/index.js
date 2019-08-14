import React from "react";
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../constants/routes';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "../../styles/login.css";

const PasswordForgetPage = () => {
  return(
    <div>
      <h1 className="stats">Forgot Your Password</h1>
      <PasswordForgetForm />
    </div>
  )
}

const INITIAL_STATE = {
  email: '',
  error: null,
}

class PasswordForgetFormBase extends React.Component {

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
    const {email} = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        alert("Reset Password Error!");
        this.setState({ error });
      })

    event.preventDefault();
  }

  render() {

    const {
      email,
      error
    } = this.state;

    const isInvalid =
      email === '';

    return (
      <div className="Login">
        <form onSubmit={this.onSubmit}>
          <Form.Group controlId="email" bssize="large" className="mid">
            <Form.Control
              autoFocus
              name="email"
              type="text"
              value={this.state.newPass}
              onChange={this.onChange}
              placeholder="Email address"
            />
          </Form.Group>
          <Button
            disabled={isInvalid}
            type="submit"
          >
            Reset Password
          </Button>

          {error && <p>{error.message}</p>}

        </form>
      </div>
    );
  }
}

const PasswordForgetLink = () => {
  return(
    <p>
      <Link to={ROUTES.PASSWORD_FORGET}>Forget Password?</Link>
    </p>
  )
}

const PasswordForgetForm = compose(
  withRouter,
  withFirebase,
)(PasswordForgetFormBase);

export default PasswordForgetPage
export { PasswordForgetForm, PasswordForgetLink }
