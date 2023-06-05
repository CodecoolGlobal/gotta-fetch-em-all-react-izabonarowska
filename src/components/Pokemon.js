import React from 'react';

const Pokemon = ({ name, sprite, hp, attack, defense, specialAttack, specialDefense, speed }) => {
  return (
    <div className="pokemon-container">
      <div className="pokemon-info">
        <h2>{name}</h2>
        <p>HP: {hp}</p>
        <p>Attack: {attack}</p>
        <p>Defense: {defense}</p>
        <p>Special Attack: {specialAttack}</p>
        <p>Special Defense: {specialDefense}</p>
        <p>Speed: {speed}</p>
      </div>
      <img src={sprite} alt={name} className="pokemon-sprite" />
    </div>
  );
};

export default Pokemon;