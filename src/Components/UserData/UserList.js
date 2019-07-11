import React from 'react';

const UserList = ({ users }) => (
  <table>
    <tbody>
      <tr>
        <th>Username</th>
        <th>E-Mail</th>
        <th>ID</th>
      </tr>
      {users.map(user => (
        <tr key={user.uid}>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.uid}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default UserList
