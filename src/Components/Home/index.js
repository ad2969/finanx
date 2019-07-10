import React from 'react';

import { withAuthorization } from '../../Session';

import Year from '../application/year';

const HomePage = () => {
  return(
    <div>
      <h1 className="stats">Dashboard</h1>
      <Year />
    </div>
  )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage)
