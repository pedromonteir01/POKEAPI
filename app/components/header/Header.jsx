import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '@/app/components/header/Header.module.css'

function Header({setTrue}) {

  return (
    <div className={styles.header}>
        <div>
        <Image src={'/gira.gif'} width={100} height={100}/>
        </div>
        <div>
            <Link className={styles.links} href={'/'}>Home</Link>
            <Link className={styles.links} href={'./LinkPage'}>Link</Link>
        </div>
    </div>
  )
}

export default Header