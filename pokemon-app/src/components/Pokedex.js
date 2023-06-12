import './Pokedex.css';
import { useState, useEffect } from 'react';

const Pokedex = ({ setPage, pokemonURL, sellectPokemon }) => {

    const [pokemon, setPokemon] = useState(null);

    async function getPokemon(pokemonURL) {
        const response = await fetch(pokemonURL);
        const data = await response.json();
        setPokemon(data)
    };

    useEffect(() => {
        getPokemon(pokemonURL).catch(error => console.error('Error fetching data:', error));
    }, []);

    return (

        <div className="pokedex--pokemon">
            {(pokemon) &&
                <div>
                    <p> {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
                    <div className='pokedex--info'>
                        <div className='pokedex--stats'>
                            <p>HP: {pokemon.stats[0]["base_stat"]}</p>
                            <p>Attack: {pokemon.stats[1]["base_stat"]}</p>
                            <p>Def: {pokemon.stats[2]["base_stat"]}</p>
                        </div>
                        <img src={pokemon.sprites.front_shiny} alt={pokemon.name}></img>
                    </div>
                    <button onClick={() => {
                        setPage("battle")
                        sellectPokemon(pokemon)
                    }}>Choose</button>
                </div>
            }
        </div>
    )
}
export default Pokedex;