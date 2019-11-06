import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const List = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const loadPokemons = () => {
    setLoaded(true);

    fetch('http://localhost:8000/pokemons')
      .then(response => response.json())
      .then(data => {
        setPokemons(data.map(pokemon => {
          return pokemon;
        }));
      }).catch(error => {
        alert(JSON.stringify(error));
      });
  }

  if (!loaded)
    loadPokemons();

  return (
    <div>
      <h1>All Pokemons</h1>
      {pokemons.map(pokemon => {
        return <Link to={`/View/${pokemon._id}`}>{pokemon.name}</Link>
      })}
    </div>
  );
}

export default List;