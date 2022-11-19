import Head from 'next/head'
import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import styles from '../styles/Home.module.scss'
import Axios from 'axios'
import APIcall from '../utility/APIcall'
import Random from '../utility/Randomizer'
import Client from '../utility/Prisma'
// import QueryDB from '../index'
import React,  { useEffect, useState} from 'react'
import { PrismaClient } from '@prisma/client'
let prisma; 


export async function getStaticProps(context:any) {

let allstrains:any = await APIcall('all', null, null)
prisma = new PrismaClient()

let allusers = await prisma.users.findMany()
let dbstrains = await prisma.strains.findMany()
let strainlength = allstrains.length


let length = allusers.length
let randomStrain = await Random(allstrains)
let strainname:string = randomStrain.strain

const master = await prisma.users.findFirst({
    where: {
      username: 'mastermizery'
    }
})
console.log('master')
console.log(master)


// const newstrain = await prisma.strains.create({
//   data: {
//     id: dbstrains.length + 1,
//     strain: randomStrain.strain,
//     strainId: dbstrains.length + 1,    
//     dominant: randomStrain.dominant,
//     funfact: randomStrain.funfact, 
//     parents: randomStrain.parents,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   }
// })
// console.log('newstrain')
// console.log(newstrain)


  return {
    props: { allstrains }, // will be passed to the page component as props
  }
}

// id | strainId | strain | dominant | funfact | parents | createdAt | updatedAt

// const user = await prisma.user.create({
//   data: {
//     email: 'elsa@prisma.io',
//     name: 'Elsa Prisma',
//   },
// })




export default function Home(allstrains:any) {
  const [pokemon, setPokemon ] = useState('')
  const [currentStrain, setCurrentStrain] = useState('')
  const [savedStrains, setSavedStrains] = useState('')

  const checkAPI = async () => {  
    let predata: any[] = await [APIcall('all', null, setCurrentStrain)]
    


    // let specify = await APIcall('specify', 'wedding cake', setCurrentStrain)
    let randomstrain = await APIcall('random', null, setCurrentStrain)      
    
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


