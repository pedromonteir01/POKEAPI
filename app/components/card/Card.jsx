'use client'
import styles from '../../page.module.css';

const Card = ({ name, image, types, index, show, setRegister, pokemons, modelPokemons, id }) => {

    const delet = (id) => {
        const pokemon = modelPokemons.getById(id);
        modelPokemons.deletePokemon(pokemon);
        console.log(modelPokemons);
    }

    const edit = () => {

    }
    
    return (
        <li key={index} className={styles.PokemonItem} >
            <div className={styles.btn}>
                <button onClick={() => delet(id)}>Ex</button>
                <button>Ed</button>
            </div>
            <div onClick={show}>
            <h2 className={styles.PokemonName}>{name}</h2>
            <img src={image} alt={name} className={styles.PokemonImage}/>
            <p className={styles.PokemonTypes}>Types: {types.join(', ')}</p>
            </div>
        </li>
    );
}

export default Card;