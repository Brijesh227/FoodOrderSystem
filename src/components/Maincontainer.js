import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom';

// import Lifecycle from './lifecycle/Lifecycle';
// import FragmentDemo from './fragment/Fragment';
// import PureComponentDemo from './pure-component/PurecomponentDemo';
// import RefsDemo from './refs/RefsDemo';
// import Context from './context/Context';

class Maincontainer extends Component {
  render() {
    return (
      <div>
        <Header />
        <Sidebar />
        <Outlet />
        {/* <Lifecycle />
        <FragmentDemo />
        <PureComponentDemo />
        <RefsDemo />
        <Context /> */}
      </div>
    )
  }
}

export default Maincontainer