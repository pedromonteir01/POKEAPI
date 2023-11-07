import react from "react";
import styles from '@/app/LinkPage/linkpage.module.css'
import Image from "next/image";
import Link from "next/link";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

export default function LinkPage () {
    return(
        <>
       <Header/>
        <div>
            <h1 className={styles.titulo}>Link to our API</h1>
            <div className={styles.cointainerdiv}>
                <div className={styles.img} >
                <Image src={'/pokeapi.png'} width={250} height={100}></Image>
                </div>
                <div>
                    <p className={styles.text}>Our website used the information from this API</p>
                <Link className={styles.link} href={'https://pokeapi.co'} target="blank">Link to the API</Link>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    )
}