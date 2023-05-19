import React, { Component } from 'react'
import Parent from './Parent'

const name = {firstname: 'brijesh'}
export const UserContext = React.createContext(name);

class Context extends Component {

  render() {
    return (
      <div>
        <UserContext.Provider value={name}>
          <Parent />
        </UserContext.Provider>
      </div>
    )
  }
}

export default Context