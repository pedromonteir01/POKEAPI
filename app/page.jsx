'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { useEffect, useState } from 'react';
import ListaPokemon from '@/models/listapokemon';
import axios from 'axios';
import Cadastro from "@/models/cadastro";
import Cadastros from "@/models/cadastros";
import Pokemon from '@/models/pokemon';

const pokedex = new ListaPokemon();
const cadastros = new Cadastros();


export default function Home() {

  //cadastrar
  const [register, setRegister] = useState(false);

  const [allPokemons, setAllPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(32);

  useEffect(() => {
    async function fetchPokemons() {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${quantity}`);
        const data = response.data.results;

        const pokemonDetails = [];

        async function fetchPokemonDetails(pokemon) {
          try {
            const response = await axios.get(pokemon.url);
            const pokemonData = {
              name: response.data.name,
              sprite: response.data.sprites.front_default,
              types: response.data.types.map((type) => type.type.name),
            };
            pokemonDetails.push(pokemonData);
          } catch (error) {
            console.error('Error fetching Pokemon details:', error);
          }
        }

        // O Promise.all espera que todas as promises sejam resolvidas para continuar.
        await Promise.all(data.map(fetchPokemonDetails));

        pokedex.fill(pokemonDetails);
        setAllPokemons(pokedex.getAll(quantity));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    }

    fetchPokemons();
  }, [quantity]);

  console.log('allPokemons', allPokemons);


  const registerPokemon = () => {
    setRegister(true);
  };

  //teste

  const [aux, setAux] = useState(null);

  let empty = '';
  const [nomesPoke, setNomePoke] = useState(empty);
  const [tiposPoke, setTiposPoke] = useState(empty);
  const [imagePoke, setImagePoke] = useState(empty);

  const [show, setShow] = useState(false);

  const [lista, setLista] = useState(cadastros.lista);

  const showCadastros = () => {
    if (nomesPoke.trim() == '' || tiposPoke.trim() == '' || imagePoke.trim() == '') {
    } else {
      const pokemon = new Pokemon(nomesPoke, tiposPoke, imagePoke);
      pokedex.addRegistered(pokemon);
      setNomePoke(empty);
      setTiposPoke(empty);
      setImagePoke(empty);
      setRegister(false);
    }
  }

  const edit = (nomesPoke, tiposPoke, imagePoke, id) => {
    setShow(true);

    setNomePoke(nomesPoke);
    setTiposPoke(tiposPoke);
    setImagePoke(imagePoke);

    setAux(id);
  }

  const editCadastro = () => {

    cadastros.editarCadastro(aux, nomesPoke, tiposPoke, imagePoke);

    setNomePoke(empty);
    setTiposPoke(empty);
    setImagePoke(empty);

    setLista(cadastros.lista);

    setShow(false);

    setAux(null);
  }
  const delet = (id) => {

    let already = false;

    cadastros.lista.map((cadastro) => (
      cadastro.id == id ? already = true : already
    ))
    if (already) {
      cadastros.deleteCadastros(id);
      setLista(cadastros.lista);
    }
  }

  return (
    <div className={styles.App}>
      {
        register ? (
          <div>
            <>
              <main>
                <div className={styles.main}>
                  <h1 className={styles.titulo}>Cadastro</h1>
                  <article className={styles.login}>
                    <section className={styles.input}>
                      <label>Nome do Pokemon:</label>
                      <input type="text"
                        value={nomesPoke}
                        onChange={(param) => {
                          setNomePoke(param.target.value);
                        }}
                        className={styles.inform}
                      />
                    </section>

                    <section className={styles.input}>
                      <label>Tipo do Pokemon:</label>
                      <input type="text"
                        value={tiposPoke}
                        onChange={(param) => {
                          setTiposPoke(param.target.value);

                        }}
                        className={styles.inform}
                      />
                    </section>
                    <section className={styles.input}>
                      <label>Imagem do Pokemon:</label>
                      <input type="text"
                        value={imagePoke}
                        onChange={(param) => {
                          setImagePoke(param.target.value);
                        }}
                        className={styles.inform}
                      />
                    </section>

                    <section className={styles.btn}>
                      {
                        show && (
                          <button onClick={editCadastro} className={styles.btn}>Editar</button>
                        )
                      }
                      {
                        !show && (
                          <button onClick={showCadastros} className={styles.btn}>Register</button>
                        )
                      }
                    </section>
                  </article>

                  <article className={styles.cadastrolista}>
                    <h2>Lista</h2>
                    <section className={styles.seccadastros}>
                      {
                        lista.map((cadastro) => (
                          <div key={cadastro.id} className={styles.cadastros}>
                            <div className={styles.lista}>
                              <p><strong>Nome do Pokemon:</strong>{cadastro.nomesPoke}</p>
                              <p><strong>Tipo do Pokemon:</strong>{cadastro.tiposPoke}</p>
                              <p><strong>Habilidades do Pokemon:</strong>{cadastro.habilidadesPoke}</p>
                              <p><strong> Id:</strong>{cadastro.id}</p>
                            </div>
                            <div className={styles.btncadastros}>
                              <button onClick={() => edit(cadastro.nomesPoke, cadastro.tiposPoke, cadastro.habilidadesPoke, cadastro.id)} className={styles.edit}>Editar</button>
                              <button onClick={() => delet(cadastro.id)} className={styles.delet}>Excluir</button>                            </div>
                          </div>
                        ))
                      }

                    </section>
                  </article>
                </div>
              </main>
            </>
          </div>
        ) : (
          <>
            <h1>Pokédex</h1>

            <div className={styles.Quantity}>
              <label htmlFor="quantity">Quantidade de Pokémons:</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                max="1000"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
              />
            </div>

            <button onClick={registerPokemon}>Register</button>


            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                <h1>REGISTERED POKEMONS</h1>
                <ul className={styles.PokemonList}>
                  {
                    pokedex.regisered.map((pokemon) => (
                      <li key={pokemon.index} className={styles.PokemonItem}>
                        <h2>{pokemon.name}</h2>
                        <img src={pokemon.image} alt={pokemon.name} className={styles.PokemonImage}/>
                        <p className={styles.PokemonTypes}>{pokemon.types}</p>
                      </li>
                    ))
                  }
                </ul>

                <h1>POKEMONS POKEDEX</h1>

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
            )}
          </>
        )
      }

    </div>
  );
}