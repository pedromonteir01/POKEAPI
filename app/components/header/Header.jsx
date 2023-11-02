import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '@/app/components/header/Header.module.css'

function Header({setTrue}) {

  const register = () => {
    setTrue(true);
  }

  const list = () => {
    setTrue(false);
  }

  return (
    <div className={styles.header}>
        <div>
        <Image src={'/bola.webp'} width={70} height={70}/>
        </div>
        <div>
            <p className={styles.links} onClick={list}>Home</p>
            <p className={styles.links} onClick={register}>Register</p>
        </div>
    </div>
  )
}

export default Header