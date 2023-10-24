import React from 'react'
import Link from "next/link"
import Image from 'next/image'
import styles from '@/app/components/footer/Footer.module.css'

function Footer() {
  return (
    <footer className={styles.inicial}>

            <div className={styles.img}>
                <Image src={"/bola.webp"} width={130} height={130}></Image>
            </div>

            <div className={styles.containerlinks}>
                <p className={styles.titulo}>NOSSAS PÁGINAS</p>
                <Link href={'/'} className={styles.links}>HOME</Link>
                <Link href={'/'} className={styles.links}>CADASTRO</Link>
            </div>
            <div className={styles.copyright}>
                <p className={styles.pcopyright}>©2023 copyright</p>
            </div>
        </footer>
  )
}

export default Footer