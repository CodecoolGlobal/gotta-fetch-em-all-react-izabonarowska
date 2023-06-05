import React, { useEffect, useState } from 'react';
import LocationList from './components/LocationList';
import Pokemon from './components/Pokemon';
import './App.css';

const App = () => {
  const [locations, setLocations] = useState([]);
  const [pokemon, setPokemon] = useState(null);
  const [noPokemonFound, setNoPokemonFound] = useState(false);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/location?limit=20")
      .then(response => response.json())
      .then(data => {
        setLocations(data.results);
      })
      .catch(error => {
        console.error("Error");
      });
  }, []);

  const handleLocationClick = async (clickedLocation) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${getRandomPokemonId()}`);
      const data = await response.json();

      const pokemonData = {
        name: data.name,
        sprite: data.sprites.front_default,
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        specialAttack: data.stats[3].base_stat,
        specialDefense: data.stats[4].base_stat,
        speed: data.stats[5].base_stat
      };

      if (data.name) {
        setPokemon(pokemonData);
        setLocations([]); // Usunięcie wszystkich lokalizacji
        setNoPokemonFound(false);
      } else {
        setNoPokemonFound(true);
      }
    } catch (error) {
      console.error("Error");
    }
  };

  const getRandomPokemonId = () => {
    return Math.floor(Math.random() * 151) + 1; // Zaktualizowany zakres dla ID pokemona
  };

  const handleRetryClick = () => {
    setNoPokemonFound(false);
    setLocations([]);
    fetch("https://pokeapi.co/api/v2/location?limit=20")
      .then(response => response.json())
      .then(data => {
        setLocations(data.results);
      })
      .catch(error => {
        console.error("Error");
      });
  };

  return (
    <div className="App">
      <div className="location-container">
        {noPokemonFound ? (
          <div className="no-pokemon-found">
            <p>Wygląda na to, że w tej lokalizacji nie ma żadnego pokémona.</p>
            <button onClick={handleRetryClick}>Spróbuj ponownie</button>
          </div>
        ) : (
          <LocationList locations={locations} onLocationClick={handleLocationClick} />
        )}
      </div>
      {pokemon && (
        <Pokemon
          name={pokemon.name}
          sprite={pokemon.sprite}
          hp={pokemon.hp}
          attack={pokemon.attack}
          defense={pokemon.defense}
          specialAttack={pokemon.specialAttack}
          specialDefense={pokemon.specialDefense}
          speed={pokemon.speed}
        />
      )}
    </div>
  );
};

export default App;