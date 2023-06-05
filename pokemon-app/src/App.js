import './App.css';
import { useState, useEffect } from 'react';
import CityInfo from './components/CityInfo'
import Encounter from './components/Encounter'
import Pokedex from './components/Pokedex'
import Battle from './components/Battle'

function App() {
  const [page, setPage] = useState("mainpage")
  const [citiesList, setCitiesList] = useState([]);
  const [cityInfo, setCityInfo] = useState(null);
  const [rivalPokemonURL, setRivalPokemonURL] = useState(null)
  const [rivalPokemon, setRivalPokemon] = useState()
  const [sellectedPokemon, setSellectedPokemon] = useState(null)
  const [ownedPokemons, setOwnedPokemons] = useState(
    [
      "https://pokeapi.co/api/v2/pokemon/bulbasaur",
      "https://pokeapi.co/api/v2/pokemon/charizard",
      "https://pokeapi.co/api/v2/pokemon/poliwhirl"
    ]
  );

  useEffect(() => {
    getCities().catch(error => console.error('Error fetching data:', error));
  }, []);

  async function getCities() {
    const response = await fetch('https://pokeapi.co/api/v2/location');
    const data = await response.json();
    setCitiesList(data.results);
  };

  const handleCityInfoClick = (city) => {
    setCityInfo(city)
    setPage("cityinfo")
  }

  const managePageState = () => {

    switch (page) {
      case "mainpage":
        return (
          <div className="cities-container">
            {citiesList.map((city, index) => (
              <div className="city-card" key={index} onClick={() => handleCityInfoClick(city)}>
                {city.name.replace(/-/g, ' ').replace(/(?:^|\s)\S/g, (word) => word.toUpperCase())}
              </div>
            ))}
          </div>
        )

      case "cityinfo":
        return (
          <div>
            {< CityInfo cityInfo={cityInfo}
              setPage={setPage}
              setRivalPokemonURL={setRivalPokemonURL} />}
          </div>
        )
      case "encounter":
        return (
          <div>
            {<Encounter
              setPage={setPage}
              rivalPokemonURL={rivalPokemonURL}
              rivalPokemon={rivalPokemon}
              setRivalPokemon={setRivalPokemon} />}
          </div>
        )
      case "pokedex":
        return (
          <div>
            <div className='pokedex--main'>
              {ownedPokemons.map((pokemonURL, index) =>
                <Pokedex
                  key={index}
                  setPage={setPage}
                  pokemonURL={pokemonURL}
                  sellectPokemon={setSellectedPokemon}
                />
              )
              }
              {sellectedPokemon&&
              sellectedPokemon.name}
            </div>
          </div>
        )
        case "battle":
          return (
           <div className='battle-container'>
            {<Battle
              setPage={setPage}
              rivalPokemonURL={rivalPokemonURL}
              rivalPokemon={rivalPokemon}
              sellectedPokemon={sellectedPokemon}
              />}
          </div>
          )
    }
  }
  return (
    <div className="App">
      {managePageState()}
    </div>
  );

}

export default App;
