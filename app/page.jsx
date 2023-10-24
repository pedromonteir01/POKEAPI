'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { useEffect, useState } from 'react';
import pokemons from '@/data/poke';
import axios from 'axios';

export default function Home() {

  const empty = '';

  const [dataAPI, setDataAPI] = useState(empty);
  const [allPokemons, setAllPokemons] = useState(empty);

  const getPokemonData = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const pokeData = async () => {
      try {
        const data = await pokemons();
        setDataAPI(data);
        for (const pokemon of data.data.results) {
          const data = await getPokemonData(pokemon.url);
          setAllPokemons(data);
        }
      } catch (error) {
        throw error;
      }
    }
    pokeData();
  }, []);

  console.log(allPokemons)

  return (
    <>
      <div>
        {
          dataAPI ? (
            dataAPI.map((pokemon) => (
              <div key={pokemon.name}>
                <p>{pokemon.name}</p>
              </div>
            ))
          ) : (
            <p>carregando...</p>
          )
        }
      </div>
    </>
  )
}
