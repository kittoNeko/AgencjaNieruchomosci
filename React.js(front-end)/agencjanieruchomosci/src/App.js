import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Ogloszenia from './Ogloszenie/Ogloszenia';
import OgloszenieDetails from './Ogloszenie/OgloszenieDetails';
import Navbar from './Navbar';
import DodajOgloszenie from './Ogloszenie/DodajOgloszenie';

class App extends Component {
  state = {
    ogloszeniaList: []
  };

  componentDidMount() {
    axios.get('https://localhost:7093/api/Ogloszenia')
      .then(response => {
        console.log(response);
        this.setState({ ogloszeniaList: response.data });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Ogloszenia Ogloszenia={this.state.ogloszeniaList} />} />
            <Route path="/ogloszenie/:id" element={<OgloszenieDetails />} />
            <Route path='/dodawanie' element={<DodajOgloszenie/>}/>
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
