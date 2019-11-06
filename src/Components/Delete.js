import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const Delete = ({ match }) => {
  const pokemonId = match.params.pokemonId;
  const [ran, setRan] = useState(false);

  const runDelete = () => {
    fetch("http://localhost:8000/pokemons/" + pokemonId,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'DELETE',
      }).then(data => setRan(true))
      .catch(err => console.log(err))
  }

  if (ran)
    return <Redirect to='/' />
  else
    return (
      <div>
        T'es sur que tu veux supprimer ce pokemon ?
      <button onClick={runDelete}>Oui, il doit partir !</button>
      </div>
    );
}

export default Delete;