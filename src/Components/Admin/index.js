import React from 'react';
import { compose } from 'recompose';

import { withFirebase } from '../../Firebase';
import { withAuthorization } from '../../Session';
import { UserList } from '../UserData';

import * as ROLES from '../../constants/roles';

class AdminPageBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();
      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;

    return(
      <div>
        <h1 className="stats">Admin</h1>
        <p className="desc">The Admin Page is accessible by every signed in <strong>admin</strong> user.</p>

        {loading && <div className="desc">Loading . . .</div>}

        {!loading && <UserList users={users} />}
      </div>
    )
  }
}

const authCondition = authUser =>
  authUser && !!authUser.roles[ROLES.ADMIN];

const AdminPage = compose(
  withAuthorization(authCondition),
  withFirebase,
)(AdminPageBase);

export default AdminPage
