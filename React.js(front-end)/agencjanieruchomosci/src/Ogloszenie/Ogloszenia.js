import React, { Component } from 'react';
import Ogloszenie from './Ogloszenie';

class Ogloszenia extends Component {
  render() {
    // Destructure properties of each "Ogloszenie" item in the map function
    const ogloszenia = this.props.Ogloszenia.map((ogloszenie) => {
      // Assuming each "ogloszenie" has the properties: tytul, opis, ulica, cena
      return (
        <Ogloszenie
          key={ogloszenie.id}
          klucz = {ogloszenie.id} // Make sure there's a unique key for each item
          Tytul={ogloszenie.tytuł}
          Opis={ogloszenie.opis}
          Ulica={ogloszenie.ulica}
          Cena={ogloszenie.cena}
          Zdjecia={ogloszenie.zdjecia}
        />
      );
    });

    return <div>{ogloszenia}</div>;
  }
}

export default Ogloszenia;
