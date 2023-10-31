import styles from './pokedex.module.css'

const Pokedex = ({ image, index, name, description }) => {
    return (
        <div className={styles.divPoke}>
            <img className={styles.pokemon} src={image} alt="pokemon-image" />
            <h3 className={styles.pokemonData}>
                <span className={styles.pokeNum}>#{index}</span>
                <span className={styles.pokeName}> - {name}</span>
            </h3>
            <p className={styles.description}>
                {description.join(', ')}
            </p>
            <div className={styles.buttons}>
                <button className={styles.button}>Prev &lt;</button>
                <button className={styles.button}>Next &gt;</button>
            </div>
            <img className={styles.pokedex} src="/pokedex.png" alt="pokedex" />
        </div>
    );
}

export default Pokedex;