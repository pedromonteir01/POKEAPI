'use client'
import { useState } from "react";
import Cadastro from "@/models/cadastro";
import Cadastros from "@/models/cadastros";
import styles from './cadastro.module.css'
import { Main } from "next/document";

const cadastros = new Cadastros();

function Pokes(){

    const [aux, setAux] = useState(null);

    let empty = '';
    const [nomesPoke, setNomePoke] = useState(empty);
    const [tiposPoke, setTiposPoke] = useState(empty);
    const [habilidadesPoke, setHabilidadesPoke] = useState(empty);

    const [show, setShow] = useState(false);

    const [lista, setLista] = useState(cadastros.lista);

    const showCadastros = () => {
        if (nomesPoke.trim() == '' || tiposPoke.trim() == '' || habilidadesPoke.trim() == ''){
        } else{
            const cadastro = new Cadastro(nomesPoke, tiposPoke, habilidadesPoke);
            cadastros.addCadastros(cadastro);
            setNomePoke(empty);
            setTiposPoke(empty);
            setHabilidadesPoke(empty);
        }
    }

    const edit = (nomesPoke, tiposPoke, habilidadesPoke, id) => {
        setShow(true);

        setNomePoke(nomesPoke);
        setTiposPoke(tiposPoke);
        setHabilidadesPoke(habilidadesPoke);

        setAux(id);
    }

    const editCadastro = () => {

        cadastros.editarCadastro(aux, nomesPoke, tiposPoke, habilidadesPoke);

        setNomePoke(empty);
        setTiposPoke(empty);
        setHabilidadesPoke(empty);

        setLista(cadastros.lista);

        setShow(false);

        setAux(null);
   }
   const delet = (id) =>{

    let already = false;

    cadastros.lista.map((cadastro)=>(
      cadastro.id == id ? already = true : already
    ))
    if (already){
        cadastros.deleteCadastros(id);
        setLista(cadastros.lista);
    }
 }
     return(
         <main>
         <div className={styles.main}>
         <h1 className={styles.titulo}>Cadastro</h1>
         <article className={styles.login}>
            <section className={styles.input}>
                <label>Nome do Pokemon:</label>
                <input type="text" 
                value={nomesPoke} 
                onChange={(param) =>{
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
                <label>Habilidades do Pokemon:</label>
            <input type="text"
             value={habilidadesPoke}
            onChange={(param) => {
                setHabilidadesPoke(param.target.value);
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
                        <button onClick={showCadastros} className={styles.btn}>Cadastrar</button>
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
    );
}
export default Pokes;