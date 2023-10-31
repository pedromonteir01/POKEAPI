import styles from './pokedex.module.css'

const Pokedex = ({ image, index, name, description, previous, nex}) => {
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
            <div className={styles.buttons}>
                {
                    index >= 1 ? (
                        <button className={styles.button} onClick={previous}>Prev &lt;</button>

                    ) : (
                        null
                    )
                }
                <button className={styles.button} onClick={nex}>Next &gt;</button>
            </div>
            <img className={styles.pokedex} src="/pokedex.png" alt="pokedex" />
        </div>
    );
}

export default Pokedex;