

import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import ActiveMenuContext from './context/ActiveMenuContext'


import Dashboard from './components/Dashboard';
// import Tasks from './components/Tasks'
import Completed from './components/Completed';

// import TaskDetails from './components/TaskDetails'




class App extends Component {
  state = {
    isActive: false,

  }

  toggleActive = () => {
    this.setState(prevState => ({
      isDarkTheme: !prevState.isDarkTheme,
    }))
  }
  render() {
    const { isActive } = this.state

    return (
      <ActiveMenuContext.Provider
        value={{
          isActive,
          toggleActive: this.toggleActive,

        }}
      >


        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          {/* <Route exact path="/tasks" element={<Tasks />} /> */}

          <Route exact path="/completed" element={<Completed />} />

          {/* <Route exact path="/task/:taskId" component={TaskDetails} /> */}
        </Routes>
      </ActiveMenuContext.Provider>
    );
  }
}

export default App;

