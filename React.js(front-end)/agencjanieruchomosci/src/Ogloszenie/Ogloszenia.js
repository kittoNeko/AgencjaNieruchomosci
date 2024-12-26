import React, { Component } from 'react';
import Ogloszenie from './Ogloszenie';

class Ogloszenia extends Component {
  render() {
    const ogloszenia = this.props.Ogloszenia.map((ogloszenie) => {
      return (
        <Ogloszenie
          key={ogloszenie.id}
          klucz = {ogloszenie.id}
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
