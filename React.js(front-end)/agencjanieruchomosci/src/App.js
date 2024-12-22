import React, { Component } from 'react';
import axios from 'axios';
import Ogloszenia from './Ogloszenie/Ogloszenia';

class App extends Component {
  state = {
    ogloszeniaList: []
  };

  componentDidMount() {
    // Make GET request
    axios.get('https://localhost:7093/api/Ogloszenia')
      .then(response => {
        console.log(response);
        this.setState({ ogloszeniaList: response.data }); // Set state with the fetched data
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  render() {
    return (
      <div className="App">
        <h1>yes</h1>
        <Ogloszenia Ogloszenia={this.state.ogloszeniaList}/>
      </div>
    );
  }
}

export default App;
