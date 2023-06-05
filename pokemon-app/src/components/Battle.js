import { useState, useEffect } from 'react';

const Battle = ({ setPage, pokemonURL, rivalPokemon, sellectedPokemon }) => {

    return (
        <div className="battle--main">
            <div className='battle-sellectedPokemon'>
                {sellectedPokemon &&
                    sellectedPokemon.name}
                    {/* tu musze wyświetlić zdjecie pokemona i jego statystyki.
                    I jak się wciśnie buttton attack to one się zmniejszają.
                    Ale jak one mają się zmniejszać? */}
            </div>
            <div className='battle-rivalPokemon'>
                {rivalPokemon &&
                    rivalPokemon.name}
            </div>
        </div>
    )
}
export default Battle;