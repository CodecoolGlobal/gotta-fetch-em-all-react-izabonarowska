import './Encounter.css';
import { useEffect } from 'react';

const Encounter = ({ setPage, rivalPokemonURL, setRivalPokemon, rivalPokemon }) => {

    useEffect(() => {

        async function getPokemon() {
            const response = await fetch(rivalPokemonURL);
            const data = await response.json();
            setRivalPokemon(data)
        };

        getPokemon().catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleBackButton = () => {
        setPage("mainpage");
    }

    const handleBattleButton = () => {
        setPage("pokedex");
    }

    return (
        <div className="encounter--main">
            <div className="encounter--main-box">
            <div className="encounter--btn">
                <button className='encounter--btn-run' onClick={handleBackButton}>RUN!</button>
            </div>
            <div className="encounter--info">
                {(rivalPokemon) &&
                    <img src={rivalPokemon.sprites["front_default"]} alt={rivalPokemon.name} />
                }
            </div>
            <div className="encounter--btn">
                <button className='encounter--btn-fight' onClick={handleBattleButton}>FIGHT!</button>
            </div>
            </div>
        </div>
    );
};

export default Encounter;