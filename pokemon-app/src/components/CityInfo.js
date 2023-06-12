import './CityInfo.css';
import { useState, useEffect } from 'react';

const CityInfo = ({ cityInfo, setPage, onBack, setRivalPokemonURL }) => {
    const [LocationEncounters, setLocationEncounters] = useState([]);

    useEffect(() => {
        getLocation().catch(error => console.error('Error fetching data:', error));
    }, []);

    async function getLocation() {
        const responseLocation = await fetch(cityInfo.url);
        const dataLocation = await responseLocation.json();
        const responseLocationArea = await fetch(dataLocation.areas[0].url);
        const dataLocationArea = await responseLocationArea.json();
        const listOfPockemons = dataLocationArea.pokemon_encounters
        setLocationEncounters(listOfPockemons)
    };

    const handleComeButton = () => {
        const newPokemon = LocationEncounters[(Math.floor(Math.random() * LocationEncounters.length))]
        const pokemonURL = newPokemon.pokemon.url
        setRivalPokemonURL(pokemonURL)
        setPage("encounter");
    }

    const handleBackButton = () => {
        setPage("mainpage");
    }

    return (
        <div>

            <div className={"cityInfo--info"}>
                <div className="cityInfo-box">
                <h1>Hello there! Welcome to {cityInfo.name.replace(/-/g, ' ').replace(/(?:^|\s)\S/g, (word) => word.toUpperCase())}</h1>
                {LocationEncounters ?
                    (<div className="cityInfo--pokemon">
                       <h2>Oh! There is a rare pokemon nearby...</h2> 
                    </div>)
                    :
                    (
                        <div className="cityInfo--message">
                            "This location doesn't seem to have any pokémon"
                        </div>)}
                <div className="cityInfo--buttons">
                    <button className="cityInfo--come-button" onClick={handleComeButton}>Come closer...</button>
                    {/* <button className="cityInfo--back-button" onClick={handleBackButton}>Back</button> */}
                </div>
                </div>
            </div>
        </div >
    );
};

export default CityInfo;