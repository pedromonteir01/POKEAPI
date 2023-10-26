import styles from './card.module.css';

const Card = () => {
    return (
        <>
            <ul className={styles.PokemonList}>
                {allPokemons.map((pokemon, index) => (
                    <li key={index} className={styles.PokemonItem}>
                        <h2 className={styles.PokemonName}>{pokemon.name}</h2>
                        <img src={pokemon.sprite} alt={pokemon.name} className={styles.PokemonImage} />
                        <p className={styles.PokemonTypes}>Tipos: {pokemon.types.join(', ')}</p>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Card;