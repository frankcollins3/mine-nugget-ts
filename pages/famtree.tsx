import React from 'react';
import {connect} from 'react-redux';
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import {Provider} from 'react-redux';
import withRedux from "next-redux-wrapper";
import {useEffect, useState} from 'react'
import ReturnUrl from 'utility/ReturnUrl'

// * CSS
import ShadowBorder from 'styles/game/components/GameContainer'
import styles from 'styles/game/sass/FamilyTree.module.scss'
// import styles from 'styles/AllStrainContainer.module.scss'

// * REDUX
import {PLAYING_GAME, NOT_PLAYING_GAME} from 'redux/actions/gameActions'
import { playingGame, notPlayingGame } from 'redux/actions/gameActions'
import wrapper from '../redux/store';
import store from 'redux/store'
import { useDispatch } from "react-redux";
let gamestate = store.getState()
let game = gamestate.gameReducer

// * Components that Comprise the Page
import GameContainer from 'components/GameContainer'






store.dispatch( { type: "PLAYING_GAME!"})
store.dispatch( { type: "INCREMENT"})
setTimeout(async() => {
await store.dispatch( { type: "INCREMENT"})
await store.getState()
}, 2000)





// console.log(store.dispatch({ type: 'game/playing'}))





 function FamilyTree (props) {
// export default function FamilyTree (props) {

    const [parents, setParents] = useState('')
    const [int, setInt] = useState('')
    console.log('props')
    console.log(props)

    let counter = props.counter
    let inplay = props.inplay
    let gamestateparents = props.parents
    const dispatch = useDispatch()


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

            

            {/* <h1> guessing game test render </h1>
            <h1> {parents || 'ayoo'} </h1> */}
            <button onClick={checkredux}></button>
            
        </div>
        // </ShadowBorder>
    )
}

const mapStateToProps = (game) => {
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
    let predata = await fetch(new URL(`${url}/api/strains/strain`))            
    let serverdata = await predata.json()        

    console.log('serverdata from family tree')
    console.log(serverdata)

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
