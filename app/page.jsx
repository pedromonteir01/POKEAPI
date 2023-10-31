'use client'
import styles from './page.module.css'
import { useEffect, useState } from 'react';
import ListaPokemon from '@/models/listapokemon';
import axios from 'axios';
import Pokemon from '@/models/pokemon';
import Card from './components/card/Card';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { Oval } from 'react-loader-spinner';
import Modal from './components/modal/Modal';

const pokedex = new ListaPokemon();

export default function Home() {

  //cadastrar
  const [register, setRegister] = useState(false);

  const [allPokemons, setAllPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(32);

  //pokedex state
  const [showModal, setShowModal] = useState(false);

  //pokemons data by prop
  const [pokeName, setPokeName] = useState('');
  const [pokeType, setPokeType] = useState('');
  const [pokeImg, setPokeImg] = useState('')

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
  const listPokemon = () => {
    setRegister(false);
  }

  //teste

  const [aux, setAux] = useState(null);

  let empty = '';
  const [nomesPoke, setNomePoke] = useState(empty);
  const [tiposPoke, setTiposPoke] = useState(empty);
  const [imagePoke, setImagePoke] = useState(empty);
  const [index, setIndex] = useState(null);

  const [show, setShow] = useState(false);

  const showCadastros = () => {
    const separadinho = tiposPoke.split(',');
    if (nomesPoke.trim() == '' || tiposPoke.trim() == '' || imagePoke.trim() == '') {
    } else {
      const pokemon = new Pokemon(nomesPoke, separadinho, imagePoke);
      pokedex.addRegistered(pokemon);
      setNomePoke(empty);
      setTiposPoke(empty);
      setImagePoke(empty);
      setRegister(false);
    }
  }


  const showPokedex = (name, type, img, index) => {

    setShowModal(true);
    setPokeName(name);
    setPokeType(type);
    setPokeImg(img);
    setIndex(index)
    isOpen();

  }

  const isOpen = () => {
    setShowModal(true);
  }

  const onClose = () => {
    setShowModal(false);
  }


  return (
    <div className={styles.App}>
      <Header />
      {
        register ? (
          <div>
            <>
              <main>
                <button onClick={listPokemon} className={styles.btn1}>VOLTAR</button>
                <div className={styles.main}>

                  <article className={styles.login}>

                    <h1 className={styles.titulo}>Cadastro</h1>
                    <section className={styles.input}>
                      <p className={styles.tituloinput}>Nome do Pokemon :</p>
                      <input type="text"
                        value={nomesPoke}
                        onChange={(param) => {
                          setNomePoke(param.target.value);
                        }}
                        className={styles.inform}
                      />
                    </section>

                    <section className={styles.input}>
                      <p className={styles.tituloinput}>Tipo do Pokemon :</p>
                      <input type="text"
                        value={tiposPoke}
                        onChange={(param) => {
                          setTiposPoke(param.target.value);

                        }}
                        className={styles.inform}
                      />
                    </section>
                    <section className={styles.input}>
                      <p className={styles.tituloinput}>Imagem do Pokemon :</p>
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
                          <button onClick={editCadastro} className={styles.btn2}>Editar</button>
                        )
                      }
                      {
                        !show && (
                          <button onClick={showCadastros} className={styles.btn1}>Registrar</button>
                        )
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
              <div className={styles.loading}>
                <Oval
                  height={200}
                  width={200}
                  color="#ff0000"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel='oval-loading'
                  secondaryColor="#ff2000"
                  strokeWidth={2}
                  strokeWidthSecondary={2}
                />
                <p style={{ color: 'red' }}>LOADING...</p>
              </div>
            ) : (
              <>
                <h1>REGISTERED POKEMONS</h1>
                <ul className={styles.PokemonList}>
                  {
                    pokedex.regisered.map((pokemon, index) => (
                      <Card name={pokemon.name} image={pokemon.sprite} types={pokemon.types} index={index} />
                    ))
                  }
                </ul>

                <h1>POKEMONS POKEDEX</h1>

                <ul className={styles.PokemonList}>
                  {allPokemons.map((pokemon, index) => (

                    <Card name={pokemon.name} image={pokemon.sprite} types={pokemon.types} index={index} show={() => showPokedex(pokemon.name, pokemon.types, pokemon.sprite, index)} />

                  ))}
                </ul>
              </>
            )}
            {
              showModal ? (
                <Modal isOpen={isOpen} onClose={onClose} name={pokeName} type={pokeType} img={pokeImg} index={index} />
              ) : (
                null
              )
            }
          </>
        )
      }
      <Footer />
    </div>
  );
}