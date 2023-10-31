import React from 'react';
import estilo from './modal.module.css';
import Pokedex from '../pokedex/Pokedex';

const Modal = ({ isOpen, onClose, pokemons, index, id, nex, previous}) => {
  if (!isOpen) {
    return null;
  } 

  const pokemon = pokemons.find((pokemon) => pokemon.id == id);
  console.log(pokemon);
  console.log(id);

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
          
        <Pokedex image={pokemon.sprite} name={pokemon.name} description={pokemon.types} index={index} nex={nex} previous={previous}/>

        </div>
      </div>

    </>
  );
};

export default Modal;
