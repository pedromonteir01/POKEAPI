'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { useEffect, useState } from 'react';
import pokemons from '@/data/poke';

export default function Home() {

  const empty = '';

  const [dataAPI, setDataAPI] = useState(empty);

  useEffect(() => {
    const pokeFetch = async () => {
      try {
        const data = await pokemons();
        setDataAPI(data);
        console.log('try', dataAPI)
      } catch (e) {
        throw e;
      }
    };
    pokeFetch();
  }, []);

  console.log("antesrreturn", dataAPI)

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
