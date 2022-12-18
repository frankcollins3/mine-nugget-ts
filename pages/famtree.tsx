import React from 'react';
import {connect} from 'react-redux';
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import {Provider} from 'react-redux';
import withRedux from "next-redux-wrapper";
import {useEffect, useState} from 'react'
import Axios from 'axios'

// * utility functions
import ReturnUrl from 'utility/ReturnUrl'
import DataCall from 'utility/DataCall'
import APIcall from 'utility/APIcall'
import Random from 'utility/Randomizer'

// * CSS
import ShadowBorder from 'styles/game/components/GameContainer'
import styles from 'styles/game/sass/FamilyTree.module.scss'
// import styles from 'styles/AllStrainContainer.module.scss'

// * REDUX
import {PLAYING_GAME, NOT_PLAYING_GAME} from 'redux/actions/gameActions'
import { playingGame, notPlayingGame } from 'redux/actions/gameActions'
import wrapper from '../redux/store';
import store from 'redux/store'
console.log('store')
console.log(store)
console.log(store.getState())
import { useDispatch } from "react-redux";
import customReduxSelector from 'redux/reduxselector'



let gamestate = store.getState()
let game = gamestate.gameReducer


// * Components that Comprise the Page
import GameContainer from 'components/GameContainer'
import axios from 'axios';

store.dispatch( { type: "PLAYING_GAME!"})
// store.dispatch( { type: "INCREMENT"})
// store.dispatch( { type: "INCREMENT"})
// store.dispatch( { type: "INCREMENT"})
// store.dispatch( { type: "INCREMENT"})
store.dispatch( { type: "INCREMENT" })
store.dispatch( { type: 'SET_PARENTS', payload: { parents: 'white rhino'}})
store.getState()

setTimeout(async() => {
    console.log("hey imma timer!")
     store.dispatch( {type: 'INCREMENT'})
     console.log(store.getState())
}, 3000)





// console.log(store.dispatch({ type: 'game/playing'}))




let i = 0;
 function FamilyTree (props) {
    
    // export default function FamilyTree (props) {

    const [parents, setParents] = useState('')
    const [int, setInt] = useState('')
    console.log('props')
    console.log(props)

    let counter = props.counter
    let inplay = props.inplay
    let gamestateparents = props.parents
    let serverdata = props.serverdata

    
    // let momdad = useSelector(state => state.parents)
    
    const dispatch = useDispatch()

    let result:any = useSelector(state => state)
    let reduxparents:string = result.gameReducer.parents
    console.log('result')
    console.log(result)
    console.log(result.gameReducer)
    

    


    const changeReduxState = () => {
            dispatch( {type: 'SET_PARENTS', payload: {parents: 'banana-bonanza'}})

            // let newresult:any = customReduxSelector(state => state.gamereducer.parents)
            // let newresult:any = useSelector(state => state)

            // const parentState = customReduxSelector(state => state.parents);
            // let parentstate:string = useSelector(state => state.parents)

            // console.log('newresult')
            // console.log(newresult)
    }
    changeReduxState()


    // {type: 'filters/statusFilterChanged', payload: filterValue}
    


    useEffect( () => {
        // setParents(inplay)
    }, [])

    
    
    
    

    


    // store.dispatch(increment)
    // setTimeout( () => {
    //     console.log("wow no way!")
    //     console.log(store.getState())
    // }, 2000 )
    
    

    const checkredux = async () => {


        // let int = await dispatch( {type: "INCREMENT"})

        // // await dispatch( {type: "INCREMENT"})
        // if (gamestate.gameReducer.inplay === true) {
        //     await dispatch( { type: "SET_PARENTS"} )
        //     await dispatch( {type: NOT_PLAYING_GAME} )

        //     await dispatch( { type: "WIN_STREAK"})
        //     setParents('magic')
        // } else if (gamestate.gameReducer.inplay === false) {
        //     // await dispatch( {type: "SET_PARENTS"})
        //     setParents(counter)
        //     await dispatch( {type: PLAYING_GAME})            
        // }

    }
        
    
    // let restaurants = {
    //     burger: 'wendys',
    //     shakes: 'wendys',
    //     fries: 'wendys'
    // }

    // let newrestaurants = {
    //     ...restaurants,
    //     burger: restaurants.burger.concat(' burgerking'),
    //     shakes: restaurants.shakes = ['wendys', 'burgerking'],
    //     fries: restaurants.fries += 'burger king'
    // }
    // console.log(newrestaurants)
    console.log('family tree component!')

    return (
        // <ShadowBorder>
        <div className={styles.div}  
        // style= {{ backgroundColor: 'dodgerBlue', minHeight: '100vh'}}
        >       
            <GameContainer/>
            <p> {reduxparents} </p>
            <button onClick={checkredux}></button>            
        </div>
        // </ShadowBorder>
    )
}


const mapStateToProps = (game) => {
    const { counter, inplay, parents, winstreak } = game    
    return {
         counter: game.counter,
         inplay: game.inplay,
         parents: game.parents,
         winstreak: game.winstreak         
         }
}

export async function getServerSideProps(context:any) {              
    let url:any = await ReturnUrl(context);    
    // let pokeurl = `https://pokeapi.co/api/v2/pokemon/`    
    // let predata = await fetch(new URL(`${url}/api/strains/strain`))            
    let data = await APIcall('all', null, null)
    let apilen:number = data.length

    let index1 = apilen-apilen + 1
    console.log('index1')
    console.log(index1)

    let indexlast = apilen
    console.log('indexlast') 
    console.log(indexlast) 
    
    console.log('data api call')
    // let arraystate = []
    let arraystate:number[] = []
    // console.log(data)
    // const loop = () => {
    //     do {
    //         arraystate.push(i)
    //         console.log('arraystate')
    //         console.log(arraystate)
    //         i++
    //     }
    //     while(i <= apilen)
    // }
    // loop()



    function randomNumber(min, max) { 
        let random = Math.random() * (max-min) + min
        let int = random.toFixed()
        return int
        // return Math.random() * (max - min) + min.;
    } 
    // let randomvalue = await Random(arraystate)
    let randomvalue = await randomNumber(index1, indexlast)
    console.log('randomvalue')
    console.log(randomvalue)

        let predata = await fetch(new URL(`${url}/api/strains/strain/${randomvalue}`))            
        // let predata = await fetch(new URL(`${url}/api/strains/strain/${randomvalue}`))            
        let serverdata = await predata.json()        

  return {
  props: {
    serverdata    
  }
  };
  }


export default connect(mapStateToProps)(FamilyTree);
// reducer: rootReducer
// export async function getServerSideProps(context) {              

//     return {
//         props: {
//             store
//         }
//     }

//   }
