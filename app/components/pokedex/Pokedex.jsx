import styles from './pokedex.module.css'

const Pokedex = ({ image, index, name, description }) => {
    return (
        <div className={styles.divPoke}>
            <img className={styles.pokemon} src={image} alt="pokemon-image" />
            <h3>
                <span className={styles.pokeNum}>{index}</span>
                <span className={styles.pokeName}>{name}</span>
            </h3>
            <p className={styles.description}>
                {description}
            </p>
            <div class="buttons">
                <button class="button btn-prev">Prev &lt;</button>
                <button class="button btn-next">Next &gt;</button>
            </div>
            <img className={styles.pokedex} src="@/public/pokedex.png" alt="pokedex" />
        </div>
    );
}

export default Pokedex;