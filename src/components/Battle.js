import './Battle.css';
import { useState } from 'react';

const Battle = ({ setPage, rivalPokemon, sellectedPokemon }) => {
    const [sellectedPokemonHP, setsellectedPokemonHP] = useState(sellectedPokemon.stats[0]["base_stat"]);
    const [rivalPokemonHP, setrivalPokemonHP] = useState(rivalPokemon.stats[0]["base_stat"]);

    const handleAttackButton = () => {
        if (sellectedPokemonHP <= 0) {
            setPage("lost_battle")
        }
        if (rivalPokemonHP <= 0) {
            setPage("won_battle")
        }
        if (sellectedPokemonHP > 0 && rivalPokemonHP > 0) {
            const randomNumber = Math.round(Math.random() * (255 - 217) + 217)
            const newSellectedPokemonHP = Math.round(((((2 / 5 + 2) * Number(sellectedPokemon.stats[1]["base_stat"]) * 60 / Number(rivalPokemon.stats[2]["base_stat"])) / 50) + 2) * randomNumber / 255)
            const newRivalPokemonHP = Math.round(((((2 / 5 + 2) * Number(rivalPokemon.stats[1]["base_stat"]) * 60 / Number(sellectedPokemon.stats[2]["base_stat"])) / 50) + 2) * randomNumber / 255)
            setsellectedPokemonHP(prev => prev - newSellectedPokemonHP)
            setrivalPokemonHP(prev => prev - newRivalPokemonHP)
        }
    }

    const handleBackButton = () => {
        setPage("mainpage");
    }

    return (
        <div className="battle--main">
            <div className="battle-box">
                <div className="battle--rivalPokemon">
                    {rivalPokemon &&
                        <div>
                            <img src={rivalPokemon.sprites.front_shiny} alt={rivalPokemon.name} />
                            <div className='rivalPokemon--stats'>
                                <label for="hp">Health points:</label>
                                <progress id="health" value={rivalPokemonHP} max="100"> </progress>
                            </div>
                        </div>
                    }
                </div>

                <div className='battle-sellectedPokemon'>

                    {sellectedPokemon &&
                        <div>
                            <img src={sellectedPokemon.sprites.back_shiny} alt={sellectedPokemon.name} />
                            <div className='sellectedPokemon--stats'>
                            <label for="hp">Health points:</label>
                                <progress id="health" value={sellectedPokemonHP} max="100"> </progress>
                            </div>
                        </div>
                    }
                </div>

                <div className='battle--btn'>
                    <button className='battle--btn-attack' onClick={handleAttackButton} >Attack!</button>
                    <button className='battle--btn-run' onClick={handleBackButton}>Run!</button>
                </div>
            </div>
        </div >
    )
}
export default Battle;