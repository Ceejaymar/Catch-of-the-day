import React, { Component } from 'react';

class StorePicker extends Component {
    render() {
        return (
            <form className="store-selector">
                  <h2>Please choose a store</h2> 
                 <input type="text" required placeholder='Store name' />
                 <button>Visit store</button>
            </form>
        )
    }
}

export default StorePicker;