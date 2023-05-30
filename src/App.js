import './App.css';
import { useEffect, useState } from 'react';
import ListedLocations from './components/ListedLocations';

function App() {

  const [locations, setLocations] = useState([]);

  async function fetchLocations() {
    const response = await fetch(`https://pokeapi.co/api/v2/location`)
    const data = await response.json()
    setLocations(data.results)
  }

  useEffect(() => {
    fetchLocations().catch(error => console.error('Error while fetching data:', error))
  }, [])
  
  const handleChooseCity = (event) => {
    // event.preventDefault();
    console.log('click works')
  }

  return (
    <div className="App">
      <div className='grid-container'>
      <div className='backgroud-container'></div>
        <div className='map'>
          <img src='./Hokkaidō_géolocalisation_relief.png' alt='Map of Poke World'/>
        </div>
        <div className='pokedex'>
          <img src ='./Pokedex_screen_blank.png' alt='Pokedex'/>
        </div>
        <div className='cities-container'>
          {locations.map((location, index) => {
              return <ListedLocations key={index} location={location} onClick={handleChooseCity}/>
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
