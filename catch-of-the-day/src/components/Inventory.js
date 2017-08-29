import React, { Component } from 'react';
import AddFishForm from './AddFishForm';
import base from '../base';

class Inventory extends Component {
  constructor() {
    super()
    this.renderInventory = this.renderInventory.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.logout = this.logout.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      uid: null,
      owner: null
    }
  }

  componentDidMount() {
    base.onAuth((user) => {
      if(user) {
        this.authHandler(null, { user })
      }
    })
  }

  handleChange(e, key) {
    const fish = this.props.fishes[key];
    const updatedFish = {...fish, [e.target.name] : e.target.value}

    this.props.updateFish(key, updatedFish);
    console.log(updatedFish)
  }

  authenticate(provider) {
    console.log(`Trying to log in with ${provider}`);
    base.authWithOAuthPopup(provider, this.authHandler)
  }

  logout() {
    base.unauth()
    this.setState({ uid: null })
  }

  authHandler(err, authData) {
    if(err) {
      console.log(err)
      return;
    }  
    
    const storeRef = base.database().ref(this.props.storeId)

    storeRef.once('value', (snapshot) => {
      const data = snapshot.val() || {}

      if(!data.owner) {
        storeRef.set({
          owner: authData.user.uid
        })
      }

      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      })
    })
  }

  renderLogin() {
    return (
      <nav>
        <h2>Inventory</h2>
        <p>Sign in manage this your store's inventory</p>
        <button className="github" onClick={() => this.authenticate('github')}>Log in with github</button>
        <button className="facebook" onClick={() => this.authenticate('facebook')}>Log in with facebook</button>
        <button className="twitter" onClick={() => this.authenticate('twitter')}>Log in with twitter</button>
      </nav>
    )
  }

  renderInventory(key) {
    const fish = this.props.fishes[key];

    return (
      <div className="fish-edit" key={key}>
        <input type='text' name='name' value={fish.name} placeholder='fish name' onChange={(e) => this.handleChange(e, key)} />
        <input type='text' name='price' value={fish.price} placeholder='fish price' onChange={(e) => this.handleChange(e, key)} />
        <select type='text' name='status' value={fish.status} placeholder='fish status' onChange={(e) => this.handleChange(e, key)} >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textArea type='text' name='desc' value={fish.desc} placeholder='fish desc' onChange={(e) => this.handleChange(e, key)} ></textArea>
        <input type='text' name='image' value={fish.image} placeholder='fish image' onChange={(e) => this.handleChange(e, key)} />
        <button onClick={() => this.props.removeFish(key)} >Remove Fish</button>
      </div>
    )
  }

  render() {
    const logout = <button onClick={this.logout}>Log out</button>

    if(!this.state.uid) {
      return <div>{this.renderLogin()}</div>
    }

    if(this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you aren't the owner of this store!</p>
          {logout}
        </div>
      )
    }

    return (
      <div>
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFish}>Load Sample fishes</button>
      </div>
    )
  }
}

Inventory.propTypes = {
  fishes: React.PropTypes.object.isRequired,
  updateFish: React.PropTypes.func.isRequired,
  removeFish: React.PropTypes.func.isRequired ,
  addFish: React.PropTypes.func.isRequired,
  loadSampleFish: React.PropTypes.func.isRequired,
  storeId: React.PropTypes.string.isRequired
}

export default Inventory;