'use client'
import { useState } from 'react'
import styles from './pokedex.module.css'

const Pokedex = ({ image, index, name, description, previous, nex, quantity}) => {

    return (
        <div className={styles.divPoke}>
            <img className={styles.pokemon} src={image} alt="pokemon-image" />
            <h3 className={styles.pokemonData}>
                <span className={styles.pokeNum}>#{index}</span>
                <span className={styles.pokeName}> - {name}</span>
            </h3>
            <p className={styles.description}>
                {description.join(', git')}
            </p>
                {
                    index >= 1 && quantity > index + 1 ? (
                        <div className={styles.buttons}>
                            <button className={styles.button} onClick={previous}>Prev &lt;</button>
                            <button className={styles.button} onClick={nex}>Next &gt;</button>  
                        </div>
                    ) : (
                        index < 1 ? (
                            <div className={styles.buttons}>
                                <button className={styles.button} onClick={nex}>Next &gt;</button>  
                            </div>
                        ) : (
                            index + 1 ==  quantity ? (
                                <div className={styles.buttons}>
                                    <button className={styles.button} onClick={previous}>Prev &lt;</button>
                                </div>
                            ) : (
                                null
                            )
                        )
                    )
                }

            <img className={styles.pokedex} src="/pokedex.png" alt="pokedex" />
        </div>
    );
}

export default Pokedex;

