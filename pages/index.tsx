import Head from 'next/head'
import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import styles from '../styles/Home.module.scss'

import Axios from 'axios'
import APIcall from '../utility/APIcall'
import Random from '../utility/Randomizer'


import React,  { useEffect, useState} from 'react'


export default function Home() {
  
  const [pokemon, setPokemon ] = useState('')
  const [currentStrain, setCurrentStrain] = useState('')

  const checkAPI = async () => {    
      let predata: any[] = await [APIcall('all', null, setCurrentStrain)]
      let specify = await APIcall('specify', 'wedding cake', setCurrentStrain)
      let randomstrain = await APIcall('random', null, null)      
    }
  const classList = [styles.Container, styles.Column].join(" ")

  return (
    <div className={classList}>
    {/* // <div className={styles[styles.Container, styles.Column-Center]}> */}
    {/* <div className={styles.container styles.Column-Center} {styles.container, styles.Column-Center}> */}
    <main className={styles.main}>
        <h1>         
          {currentStrain || 'hey'}
        </h1>
        <button onClick={checkAPI} type="button"> </button>
    </main>

    </div>
  )
}
