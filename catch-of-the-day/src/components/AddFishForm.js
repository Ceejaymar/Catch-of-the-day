import React, { Component } from 'react';

class AddFishForm extends Component {
  createFish(e){
    e.preventDefault();
    console.log('Gonna make some fish');

    const fish = {
      name: this.name.value,
      price: this.price.value,
      status: this.status.value,
      desc: this.desc.desc,
      image: this.image.value
    }
    this.props.addFish(fish);
    this.fishForm.reset();
  }

  render() {
    return (
      <form ref={(input) => this.fishForm = input} className='fish-edit' onSubmit={(e) => (this.createFish(e))}>
        <input ref={(input) => this.name = input} type="text" placeholder='fish Name'/>
        <input ref={(input) => this.price = input} type="text" placeholder='fish Price'/>
        <select ref={(input) => this.status = input}>
          <option value="available">Fresh !</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textArea ref={(input) => this.desc = input} type="text" placeholder='fish Desc'/>
        <input ref={(input) => this.image = input} type="text" placeholder='fish Image'/>
        <button type='submit'>Submit</button>
      </form>
    )
  }
}

AddFishForm.propTypes = {
  addFish: React.PropTypes.func.isRequired
}

export default AddFishForm;