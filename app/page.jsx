'use client'
import styles from './page.module.css'
import { useEffect, useState } from 'react';
import ListaPokemon from '@/models/listapokemon';
import axios, { all } from 'axios';
import Pokemon from '@/models/pokemon';
import Card from './components/card/Card';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { Oval } from 'react-loader-spinner';
import Modal from './components/modal/Modal';
import { Popup } from './components/popup/Popup';

const pokedex = new ListaPokemon();

export default function Home() {

  //cadastrar
  const [register, setRegister] = useState(false);

  //POPUP
  const [showPopup, setShowPopup] = useState(false);
  const [showMesage, setShowMessage] = useState('');
  const [showType, setShowType] = useState('');

  function handleShowPopup(message, type, time) {
    setShowPopup(true);
    setShowMessage(message);
    setShowType(type);

    setTimeout(() => {
        setShowPopup(false) } , 
        time);
    }


  //verificadores
  const [allPokemons, setAllPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(12);

    //pokemons data by prop
    const [pokeName, setPokeName] = useState('');
    const [pokeType, setPokeType] = useState('');
    const [pokeImg, setPokeImg] = useState('')

  //pokedex state
  const [showModal, setShowModal] = useState(false);


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
              id: response.data.id,
              abilities: response.data.abilities,
              shiny: response.data.sprites.front_shiny,
              varieties: await axios.get(response.data.species.url)
            };
            pokemonDetails.push(pokemonData);
          } catch (error) {
            <Popup msg={`ERROR API, ${error}`} type={'error'}/>
          }
        }
        // O Promise.all espera que todas as promises sejam resolvidas para continuar.
        await Promise.all(data.map(fetchPokemonDetails));

        pokedex.fill(pokemonDetails);
        setAllPokemons(pokedex.getAll(quantity));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        <Popup msg={`ERROR API, ${error}`} type={'error'}/>
      }
    }

    fetchPokemons();
  }, [quantity]);

  // BADGE TYPES


  const registerPokemon = () => {
    setRegister(true);
  };

  const listPokemon = () => {
    setRegister(false);
  };

  console.log(pokedex.lista);

  //teste


  let empty = '';
  const [nomesPoke, setNomePoke] = useState(empty);
  const [tiposPoke, setTiposPoke] = useState(empty);
  const [imagePoke, setImagePoke] = useState(empty);
  const [pokeId, setPokeId] = useState(null);
  const [position, setPosition] = useState(null);


  const [show, setShow] = useState(false);


  const showCadastros = () => {
    const separadinho = tiposPoke.split(',');
    if (nomesPoke.trim() == '' || tiposPoke.trim() == '') {
      handleShowPopup('Error! Fill in all fields', 'error', 3000)
    } else {
      const pokemon = new Pokemon(nomesPoke, separadinho, imagePoke);
      pokedex.addRegistered(pokemon);
      setNomePoke(empty);
      setTiposPoke(empty);
      setImagePoke(empty);
      setRegister(false);
      <Popup msg={`POKEMON REGISTERED`} type={'success'}/>
    }
  }

  //config pokedex

  const showPokedex = (id, index) => {

    const poke = allPokemons.find((pokemon) => pokemon.id == id);

    setShowModal(true);
    setPokeName(poke.name);
    setPokeType(poke.type);
    setPokeImg(poke.sprite);
    setPosition(index)
    setPokeId(id)
    isOpen();

  }

  const isOpen = () => {
    setShowModal(true);
  }

  const onClose = () => {
    setShowModal(false);
  }

  const next = () => {
    setPokeId(pokeId + 1);
    setPosition(position + 1)
  }

  const previous = () => {
    if(pokeId <= 0) {
      return 1;
    } else {
      setPokeId(pokeId - 1);
      setPosition(position - 1);
    }
  }

  return (
    <div className={styles.App}>
      <Header setTrue={setRegister}/>
      {
        register ? (
          <div>
            <>
              <main>
                <button onClick={listPokemon} className={styles.btn1}>POKEDEX</button>
                <div className={styles.main}>

                  <article className={styles.login}>

                    <h1 className={styles.titulo}>Register</h1>
                    <section className={styles.input}>
                      <p className={styles.tituloinput}>NAME :</p>
                      <input type="text"
                        value={nomesPoke}
                        onChange={(param) => {
                          setNomePoke(param.target.value);
                        }}
                        className={styles.inform}
                      />
                    </section>

                    <section className={styles.input}>
                      <p className={styles.tituloinput}>TYPE :</p>
                      <input type="text"
                        value={tiposPoke}
                        onChange={(param) => {
                        setTiposPoke(param.target.value);

                        }}
                        className={styles.inform}
                      />
                    </section>
                    <section className={styles.input}>
                      <p className={styles.tituloinput}>SPRITE :</p>
                      <input
                      type='text'
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
                          <button onClick={editCadastro} className={styles.btn2}>EDIT</button>
                        )
                      }
                      {
                        !show && (
                          <button onClick={showCadastros} className={styles.btn1}>REGISTER</button>
                        )
                      }
                    </section>
                  </article>
                  {
                    showPopup && (
                      <Popup msg={showMesage} type={showType}/>
                    )
                  }
                </div>
              </main>
            </>
          </div>
        ) : (
          <>
            <h1>POKEDEX</h1>

            <div className={styles.Quantity}>
              <label htmlFor="quantity" style={{fontSize: 20}}>NUMBER OF POKEMON:</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                max="1000"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                className={styles.inQuantity}
              />
            </div>



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
              <div className={styles.rest}>
                <h1>REGISTERED POKEMONS</h1>
                <button className={styles.registerbtn} onClick={registerPokemon}>Register</button>

                <ul className={styles.PokemonList}>
                  {
                    pokedex.regisered.map((pokemon, index) => (
                      <Card name={pokemon.name} image={pokemon.image} types={pokemon.types} index={index} />
                    ))
                  }
                </ul>

                <h1 style={{margin: 15}}>POKEMONS POKEDEX</h1>

                <ul className={styles.PokemonList}>
                  {allPokemons.map((pokemon, index) => (
                    <Card name={pokemon.name} image={pokemon.sprite} types={pokemon.types} index={index} setRegister={setRegister} pokemons={allPokemons} modelPokemons={pokedex} id={pokemon.id} show={() => showPokedex(pokemon.id, index)} delet={() => delet(pokemon.id)}/>
                  ))}
                </ul>
              </div>
            )}
            {
              showModal ? (
                <Modal isOpen={isOpen} onClose={onClose} pokemons={allPokemons} index={position} id={pokeId} nex={next} previous={previous} quantity={quantity}/>
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