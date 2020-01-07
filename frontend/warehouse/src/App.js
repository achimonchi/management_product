import React from 'react';
import './App.css';
import Home from './components/home/Home'
import Admin from './components/admin/AdminHome'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      admin: ''
    }
  }

  componentDidMount = () => {
    this.setState({
      admin: localStorage.getItem('admin_login')
    });
  }

  render() {
    var component;

    if (this.state.admin) {
      component = <Admin />
    }
    else {
      component = <Home />
    }

    return (
      <div className="wrapper">
        {component}
      </div>
    )
  }
}

export default App;
