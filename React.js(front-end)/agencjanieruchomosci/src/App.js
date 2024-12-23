import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Ogloszenia from './Ogloszenie/Ogloszenia';
import OgloszenieDetails from './Ogloszenie/OgloszenieDetails';

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
      <Router>
        <div className="App">
          <Routes>
            {/* Strona główna */}
            <Route 
              path="/" 
              element={<Ogloszenia Ogloszenia={this.state.ogloszeniaList} />} 
            />
            {/* Detale */}
            <Route 
              path="/ogloszenie/:id" 
              element={<OgloszenieDetails />} 
            />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
