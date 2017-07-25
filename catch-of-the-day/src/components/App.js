import React, { Component } from 'react';
// import StorePicker from './components/StorePicker';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';

class App extends Component {
  render() {
    return ( 
      // <StorePicker />
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
        </div>
        <Order /> 
        <Inventory /> 
      </div>
    )
  }
}

export default App;