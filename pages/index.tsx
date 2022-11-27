import Head from 'next/head'
import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import styles from '../styles/Home.module.scss'
import Axios from 'axios'
import APIcall from '../utility/APIcall'
import Random from '../utility/Randomizer'
import Client from '../utility/Prisma'
import CSS from '../utility/CSStool'
// import allStrain from './api/allStrain'
import $ from 'jquery' // import * as $ from 'jquery'
import React,  { useEffect, useState} from 'react'
import { PrismaClient } from '@prisma/client'
let prisma; 



// id | strainId | strain | dominant | funfact | parents | createdAt | updatedAt

// const user = await prisma.user.create({
//   data: {
//     email: 'elsa@prisma.io',
//     name: 'Elsa Prisma',
//   },
// })




export default function Home( props: any, {poke}:any) {
  console.log('props from the home function!')
  console.log(props)
  
  console.log('poke')
  console.log(poke)

  const [ pokemon, setPokemon ] = useState('')
  const [currentStrain, setCurrentStrain] = useState('')
  const [savedStrains, setSavedStrains] = useState('')

  const [users, setUsers] = useState([])
  const [dbStrains, setDbStrains] = useState([])

  const classList = [styles.Container, styles.Column].join(" ")

  const checkAPI = async () => {  
    let predata: any[] = await [APIcall('all', null, setCurrentStrain)]        
    let randomstrain = await APIcall('random', null, setCurrentStrain)          
    }



  const strainfunc = async () => {
    let btn = $('.button')        
    CSS(btn, 'border', '5px solid hotpink');
    $.ajax({
      method: 'post',
      url: '/api/strains/allStrain',
      // data: {
      //  key: 'all'
      // }
    }).then( (msg) => {
      console.log('msg we are in the .then() statement')
      console.log(msg)      // res.json( { successObject: allstrainspost})   * the console.log(msg) is this    res.json() 
    })
  }

  const getRouteTest = async () => {
    console.log("were in the getRoutesTest function")
    $.ajax({
      method: 'get',
      url: '/api/getAllStrain',
        data: {
          key: 'GETall'
        }
      }).then( (resFromAPI) => {
        console.log('resFromAPI')
        console.log(resFromAPI)
        let res = resFromAPI
        // *  this is client side 
      })
  }
  

  return (
    <div className={classList}>    
    <main className={styles.main}>
        <h1>         
          {currentStrain || 'hey'}
        </h1>
      {/* <p> {} </p> */}
        

        <button onClick={checkAPI} type="button"> </button>

          <button     
           className="button"     
           onClick={strainfunc}
           type="submit"
           style={{ minHeight: '5em', minWidth: '5em', backgroundColor: 'papayawhip', borderRadius: '50%'}}
           id='straininput'          
          >
          </button>

          <button     
           className="button"     
           onClick={getRouteTest}
           type="submit"
           style={{ minHeight: '5em', minWidth: '5em', backgroundColor: 'orange', borderRadius: '50%'}}
           id='straininput'          
          >
          </button>
  
          
          
    </main>

    </div>
  )
}


export async function getStaticProps() {

  let allstrains:any = await APIcall('all', null, null)
  prisma = new PrismaClient()
  
  let allusers = await prisma.users.findMany()
  let dbstrains = await prisma.strains.findMany()
  let strainlength = allstrains.length
  
  // let length = allusers.length
  let randomStrain = await Random(allstrains)
 
  let strainname:string = randomStrain.strain
  console.log('strainname')
  console.log(strainname)

  let response = await fetch(`https://pokeapi.co/api/v2/pokemon/ditto`)
  let pokemon:any = await response.json()


    return {
      props: { poke: pokemon } // will be passed to the page component as props
    }
  }
  

    // const master = await prisma.users.findFirst({
  //     where: {
  //       username: 'mastermizery' // old runescape account name.
  //     }
  // })
  // console.log(master)
  // id | strainId | strain | dominant | funfact | parents


  // const newstrain = await prisma.strains.create({
  //   data: {
  //     id: dbstrains.length + 1,
  //     strain: randomStrain.strain,
  //     strainId: dbstrains.length + 1,    
  //     dominant: randomStrain.dominant,
  //     funfact: randomStrain.funfact, 
  //     parents: randomStrain.parents,      
  //   }
  // })    
  // console.log('newstrain')
  // console.log(newstrain)

  // const findStrain = await prisma.strains.findFirst({
  //   where: { strain: 'mimosa'}
  // }).then( (strain:any) => {
  //   let name:(string|any) = strain.strain
  //   console.log('name')
  //   console.log(name)  

  // })
