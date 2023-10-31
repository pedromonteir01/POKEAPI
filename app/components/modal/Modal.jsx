import React from 'react';
import estilo from './modal.module.css';
import Pokedex from '../pokedex/Pokedex';

const Modal = ({ isOpen, onClose, name, type, img, index}) => {
  if (!isOpen) {
    return null;
  }

  console.log(name);
  console.log(type);
  console.log(img);
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

          <Pokedex name={name} description={type} image={img} index={index}/>

        </div>
      </div>

    </>
  );
};

export default Modal;
