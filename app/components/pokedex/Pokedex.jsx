'use client'
import { use, useEffect, useState } from 'react'
import styles from './pokedex.module.css'
import axios from 'axios';

const Pokedex = ({ image, index, name, description, previous, nex, quantity, abilities, shiny, varieties }) => {

    const [megaCharizard, setMegaCharizard] = useState(false);
    const [megaMewtwo, setMegaMewtwo] = useState(false);

    const [itShiny, setShiny] = useState(false);

    const [openShiny, setOpenShiny] = useState(true);
    const [openMega, setOpenMega] = useState(true);

    const [itsMega, itsSetMega] = useState(false);
    const [mega, setMega] = useState(false);
    const [photomega, setPhotoMega] = useState();
    const [megaShiny, setMegaShiny] = useState()


    const proximo = () => {
        nex();
        itsSetMega(false);
        setMega(false);
        setOpenMega(true);
        setMegaCharizard(false);
        setMegaMewtwo(false);
    }

    const anterior = () => {
        previous();
        itsSetMega(false);
        setMega(false);
        setOpenMega(true);
        setMegaCharizard(false);
        setMegaMewtwo(false);
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
        if (name == 'charizard') {
            setMegaCharizard(true);
        } else if(name == 'mewtwo') {
            setMegaMewtwo(true);
        } else {
            varieties.map((variety) => {
                variety.pokemon.name == name + '-mega' ? (
                    itsSetMega(true)
                ) : (
                    null
                )
            })
        }
    });

    const [megaInfo, setMegaInfo] = useState([]);

    useEffect(() => {
        async function fetchPokemonDetails() {
            try {
                const promises = varieties.map(async (pokemon) => {
                    const response = await axios.get(pokemon.pokemon.url);
                    return response.data;
                });

                const pokemonData = await Promise.all(promises);
                setMegaInfo(pokemonData);
            } catch (error) {
                console.error(error);
            }
        }

        fetchPokemonDetails();
    }, [varieties])

    const megaEvo = () => {
        // Verifique se megaInfo tem dados suficientes
        if (megaInfo.length > 1) {
            setMega(true);
            const info = megaInfo[1];
            // Certifique-se de que info.sprites.front_default exista
            if (info.sprites && info.sprites.front_default) {
                setMegaShiny(info.sprites.front_shiny)
                setPhotoMega(info.sprites.front_default)
            }
        }

        setOpenMega(false)
    }

    const megaEvox = () => {
        if (megaInfo.length > 1) {
            setMega(true);
            const info = megaInfo[1];
            if (info.sprites && info.sprites.front_default) {
                setPhotoMega(info.sprites.front_default);
                setMegaShiny(info.sprites.front_shiny)
            }
        }
        setOpenMega(false)

    }

    const megaEvoy = () => {
        if (megaInfo.length > 1) {
            setMega(true);
            const info = megaInfo[2];
            if (info.sprites && info.sprites.front_default) {
                setPhotoMega(info.sprites.front_default);
                setMegaShiny(info.sprites.front_shiny)
            }
        }
        setOpenMega(false)
    }

    const desevoluir = () => {
        setMega(false);
        setOpenMega(true)
    }
    


    return (
        <div className={styles.divPoke} key={index}>
            {
                itsMega ? (
                    openMega ? (
                        <button className={styles.mega} onClick={megaEvo}>MEGA!</button>
                    ) : (
                        <button className={styles.mega} onClick={desevoluir}>NORMAL</button>

                    )
                ) : (
                    megaCharizard || megaMewtwo ? (
                        openMega ? (
                            <div className={styles.xy}>
                            <button className={styles.megax} onClick={megaEvox}>MEGA X</button>
                            <button className={styles.megay} onClick={megaEvoy}>MEGA Y</button>
                        </div>
                        ) : (
                        <button className={styles.mega} onClick={desevoluir}>NORMAL</button>

                        )
                    ) : (
                        null
                    )
                )
            }
            {
                mega ? (
                    itShiny ? (
                        <img className={styles.pokemon} src={megaShiny} alt="pokemon-image" />
                    ) : (
                        <img className={styles.pokemon} src={photomega} alt="pokemon-image" />
                    )
                ) : (
                    itShiny ? (
                        <img className={styles.pokemon} src={shiny} alt="pokemon-image" />
                    ) : (
                        <img className={styles.pokemon} src={image} alt="pokemon-image" />
                    )
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

