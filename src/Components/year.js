import React from 'react';
import Month from './month'

class Year extends React.Component {
  constructor() {
    super();
    console.log("Year constructed!");
    this.state = {
      userSet: {
        currency: "CAD",
        defaultSort: "Id"
      },
      testState: null,
    }
  }

  componentDidMount() {
    console.log("Year mounted!");

  }

  render() {
    return <Month />
  }
}

export default Year
