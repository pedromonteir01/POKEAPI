import styles from '../../page.module.css';

const Card = ({ name, image, types, index, show }) => {
    //console.log("Card");
    //console.log(show);
    
    return (
        <li key={index} className={styles.PokemonItem} onClick={show}>
            <h2 className={styles.PokemonName}>{name}</h2>
            <img src={image} alt={name} className={styles.PokemonImage} />
            <p className={styles.PokemonTypes}>Tipos: {types.join(', ')}</p>
        </li>
    );
}

export default Card;