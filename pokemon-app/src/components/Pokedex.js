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
                    <p> {pokemon.name}</p>
                    {/* <p>Level: {pokemon.stats.level}</p>
                        <p>Health: {pokemon.stats.hp}</p>
                        <p>Attack: {pokemon.stats.attack}</p>
                        <p>Defense: {pokemon.stats.defense}</p> */}


                    <img src={pokemon.sprites.back_shiny} alt={pokemon.name}></img>
                    <button onClick={() =>{
                        setPage("battle")
                        sellectPokemon(pokemon)}}>choose</button>
                </div>
            }
        </div>
    )
}
export default Pokedex;