import React from 'react';
import './card.styles.css'
export const Card = (props) =>
(
    <div className='card-container'>
        <img alt={props.pokemon.name} src={props.pokemon.image} className='cardImage'></img>
        <h1>{props.pokemon.name}</h1>
        <h2>
            {props.pokemon.type}
        </h2>
    </div> 
) 