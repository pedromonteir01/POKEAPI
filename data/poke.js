import axios from "axios";
const URL_API = 'https://pokeapi.co/api/v2/pokemon/';

const pokemons = async ()  => {
    try {
        const data = await axios.get(URL_API);
        return data.data.results;
    } catch(e) {
        throw e;
    }
}

export default pokemons;
