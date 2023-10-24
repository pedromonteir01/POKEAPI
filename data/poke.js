import axios from "axios";

const URL_API = 'https://pokeapi.co/api/v2/pokemon/';

const pokemons = () => {
    try {
        const data = axios.get(URL_API);
        return data.results;
    } catch(e) {
        throw e;
    }
}

export default pokemons;
