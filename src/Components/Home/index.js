import React from 'react';

import { withAuthorization } from '../../Session';

import Year from '../application/year';

const HomePage = () => {
  return(
    <div>
      <Year />
    </div>
  )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage)
