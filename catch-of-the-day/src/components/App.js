import React, { Component } from 'react';
// import StorePicker from './components/StorePicker';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';

class App extends Component {
  constructor() {
    super()
    this.addFish = this.addFish.bind(this);
    this.loadSampleFish = this.loadSampleFish.bind(this);
    this.addToOrder = this.addToOrder.bind(this);

    this.state = {
      fishes: {},
      order: {}
    }
  }

  addFish(fish){
    const fishes = {...this.state.fishes};
    const timeStamp = Date.now();
   
    fishes[`fish-${timeStamp}`] = fish;
    this.setState({ fishes });
  }

  loadSampleFish() {
    this.setState({
      fishes: sampleFishes
    })
  }

  addToOrder(key) {
    const order = {...this.state.order};
    order[key] = order[key] + 1 || 1;

    this.setState({ order })
  }

  render() {
    return ( 
      // <StorePicker />
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
          <ul className="list-of-fishes">
            {
              Object
                .keys(this.state.fishes)
                .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)
            }
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} /> 
        <Inventory addFish={this.addFish} loadSampleFish={this.loadSampleFish} /> 
      </div>
    )
  }
}

export default App;