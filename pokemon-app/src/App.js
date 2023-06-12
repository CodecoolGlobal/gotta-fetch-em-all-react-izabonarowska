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
          <div className='mainpage-background'>
            <div className="cities-header">
              <h1>Hello stranger! </h1>
              <h3>What's your next destination?</h3>
              <div className="cities-container">
                {citiesList.map((city, index) => (
                  <div className="city-card" key={index} onClick={() => handleCityInfoClick(city)}>
                    {city.name.replace(/-/g, ' ').replace(/(?:^|\s)\S/g, (word) => word.toUpperCase())}
                  </div>
                ))}
              </div>
            </div>
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
              <h1>Choose your fighter:</h1>
              <p>
                {ownedPokemons.map((pokemonURL, index) =>
                  <Pokedex
                    key={index}
                    setPage={setPage}
                    pokemonURL={pokemonURL}
                    sellectPokemon={setSellectedPokemon}
                  />
                )
                }
              </p>
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
      case "won_battle":
        return (
          <div className='won_battle'>
            <div className='won_box'>
              <h1>Congratulations! </h1>
              <h2>{rivalPokemon.name.charAt(0).toUpperCase() + rivalPokemon.name.slice(1)} has been caught!</h2>
              <button className='back_button' onClick={() => {
                setPage("mainpage")
                setOwnedPokemons([...ownedPokemons, rivalPokemonURL])
              }
              }>Explore more!</button>
            </div>
          </div>
        )
      case "lost_battle":
        return (
          <div className='lost_battle'>
            <div className='lost_box'>
              <h1>You lost the battle!</h1>
              <div>
                <button className='back_button' onClick={() => setPage("mainpage")}>Explore more!</button>
              </div>
            </div>
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
