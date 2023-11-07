'use client'
import React, { useEffect, useState } from 'react';
import estilo from './modal.module.css';
import Pokedex from '../pokedex/Pokedex';
import axios from 'axios';

const Modal = ({ isOpen, onClose, pokemons, index, id, nex, previous, quantity }) => {
  if (!isOpen) {
    return null;
  } 

  const pokemon = pokemons.find((pokemon) => pokemon.id == id);

  return (
    <>

      <div className={estilo.modal_overlay}>
        <div className={estilo.modal}>

          <div className={estilo.modal_header}>
            <h2>POKEMON</h2>
            <button className={estilo.close_button} onClick={onClose}>
              Fechar
            </button>
          </div>
          
        <Pokedex image={pokemon.sprite} name={pokemon.name} description={pokemon.types} index={index} nex={nex} previous={previous} quantity={quantity} abilities={pokemon.abilities} shiny={pokemon.shiny} varieties={pokemon.varieties.data.varieties}/>

        </div>
      </div>

    </>
  );
};

export default Modal;
