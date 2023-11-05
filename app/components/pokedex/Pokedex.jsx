'use client'
import { use, useEffect, useState } from 'react'
import styles from './pokedex.module.css'
import axios from 'axios';

const Pokedex = ({ image, index, name, description, previous, nex, quantity, abilities, shiny, varieties }) => {

    const [itShiny, setShiny] = useState(false);

    const [openShiny, setOpenShiny] = useState(true);
    const [openMega, setOpenMega] = useState(true);

    const [itsMega, itsSetMega] = useState(false);
    const [mega, setMega] = useState(false);
    const [photomega, setPhotoMega] = useState();


    const proximo = () => {
        nex();
        itsSetMega(false);
        setMega(false);
    }

    const anterior = () => {
        previous();
        itsSetMega(false);
        setMega(false);
    }

    const showShiny = () => {
        setShiny(true);
        setOpenShiny(false);
    }

    const closeShiny = () => {
        setShiny(false);
        setOpenShiny(true);
    }

    useEffect(() => {
        varieties.map((variety) => {
            variety.pokemon.name == name + '-mega' ? (
                itsSetMega(true)
            ) : (
                null
            )
        })
    });

    const [megaInfo, setMegaInfo] = useState([])

    useEffect(() => {
        async function fetchPokemonDetails(pokemon) {
            try {
                const promises = pokemon.map(async (pokemon) => {
                    const response = await axios.get(pokemon.pokemon.url);
                    return response.data; // Retorne os dados em vez do objeto de resposta inteiro
                });

                const pokemonData = await Promise.all(promises); // Espere por todas as promessas
                setMegaInfo(pokemonData)
            } catch (error) {
                throw error;
            }
        }

        fetchPokemonDetails(varieties);
    }, []);


    const megaEvo = () => {
        setMega(true);
        const info = megaInfo[1];
        setPhotoMega(info.sprites.front_default);
    }

    return (
        <div className={styles.divPoke}>
            {
                itsMega ? (
                    <button className={styles.mega} onClick={megaEvo}>MEGA!</button>
                ) : (
                    null
                )
            }
            {
                mega ? (
                    <img className={styles.pokemon} src={photomega} alt="pokemon-image" />
                ) : (
                    <img className={styles.pokemon} src={image} alt="pokemon-image" />
                )
            }
            {
                openShiny ? (
                    <button className={styles.shiny} onClick={showShiny}>SHINY!</button>
                ) : (
                    <button className={styles.shiny} onClick={closeShiny}>NORMAL</button>
                )
            }
            <h3 className={styles.pokemonData}>
                <span className={styles.pokeNum}>#{index}</span>
                <span className={styles.pokeName}> - {name}</span>
            </h3>
            <p className={styles.description}>
                {description.join(', ')}

            </p>
            <p className={styles.abilities}>
                {
                    abilities.map((ability, index) => (
                        <span key={ability.ability.id}>{index + 1}º: {ability.ability.name} </span>
                    ))
                }
            </p>
            {
                index >= 1 && quantity > index + 1 ? (
                    <div className={styles.buttons}>
                        <button className={styles.button} onClick={anterior}>Prev &lt;</button>
                        <button className={styles.button} onClick={proximo}>Next &gt;</button>
                    </div>
                ) : (
                    index < 1 ? (
                        <div className={styles.buttons}>
                            <button className={styles.button} onClick={proximo}>Next &gt;</button>
                        </div>
                    ) : (
                        index + 1 == quantity ? (
                            <div className={styles.buttons}>
                                <button className={styles.button} onClick={anterior}>Prev &lt;</button>
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

