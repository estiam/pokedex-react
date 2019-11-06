import React, { useState } from 'react'


const View = ({ match }) => {
  const [pokemon, setPokemon] = useState(null);
  const [loaded, setLoaded] = useState(null);
  const pokeId = match.params.pokemonId;

  const loadPokemon = (id) => {
    setLoaded(true);
    fetch(`http://localhost:8000/pokemons/${id}`)
      .then(res => res.json())
      .then(data => {
        setPokemon(data);
      }).catch(err => console.log(err));
  }

  if (!loaded)
    loadPokemon(pokeId);

  if (pokemon)
    return (
      <div>
        <h1>{pokemon.name}</h1>
        <img src={pokemon.photo}></img>
        <p>{pokemon.description}</p>
      </div>
    );
  else
    return <div>Loading....</div>
}

export default View;