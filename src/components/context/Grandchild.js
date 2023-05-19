import React, { Component } from 'react';
import { UserContext } from './Context';

class Grandchild extends Component {
  render() {
    return (
        <UserContext.Consumer >
            {
                name => {
                    return <div> contect name {name.firstname}</div>    
                }
            }
        </UserContext.Consumer>
    )
  }
}

export default Grandchild