import React, { Component } from 'react';
import { getFunName } from '../helpers';

class StorePicker extends Component {
  // constructor(){
  //   super()
  //   this.goToStore = this.goToStore.bind(this);
  // }
  goToStore(e){
    e.preventDefault();

    console.log(this.storeInput.value)
  }

  render() {
    return (
      <form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
        <h2>Please choose a store</h2> 
        <input type="text" required placeholder='Store name' defaultValue={getFunName()} ref={(input) => {this.storeInput = input}} />
        <button>Visit store</button>
      </form>
    )
  }
}

export default StorePicker;