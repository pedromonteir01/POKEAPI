import React, { useState } from 'react'
import styles from './popup.module.css'

export const Popup = ({msg, type}) => {
    let  color = (type === 'success') ? styles.success : styles.error;
    let estilizacao = styles.mainDiv + ' ' + color;

    return (
  <div className={estilizacao}>
        <p>{msg}</p>
    </div>
  );
}