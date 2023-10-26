import styles from './card.module.css';

const Card = ({ name, image, types, index }) => {
    return (
        <>
            <ul className={styles.PokemonList}>
                <li key={index} className={styles.PokemonItem}>
                    <h2 className={styles.PokemonName}>{name}</h2>
                    <img src={image} alt={name} className={styles.PokemonImage} />
                    <p className={styles.PokemonTypes}>Tipos: {types.join(', ')}</p>
                </li>
            </ul>
        </>
    );
}

export default Card;