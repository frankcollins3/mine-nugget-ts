import React from 'react';
import {connect} from 'react-redux';

import { TypedUseSelectorHook, useSelector } from 'react-redux'
import {Provider} from 'react-redux';
import withRedux from "next-redux-wrapper";
import {useEffect, useState} from 'react'

import {PLAYING_GAME, NOT_PLAYING_GAME} from 'redux/actions/gameActions'
import { playingGame, notPlayingGame } from 'redux/actions/gameActions'
import wrapper from '../redux/store';
import store from 'redux/store'


import { useDispatch } from "react-redux";
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

let gamestate = store.getState()
let game = gamestate.gameReducer



store.dispatch( { type: "PLAYING_GAME!"})
store.dispatch( { type: "INCREMENT"})

let state2 = store.getState()
console.log('state2')
console.log(state2)

setTimeout(async() => {
await store.dispatch( { type: "INCREMENT"})
await store.getState()
}, 2000)





// console.log(store.dispatch({ type: 'game/playing'}))





 function FamilyTree (props) {
// export default function FamilyTree (props) {

    const [parents, setParents] = useState('')
    console.log('props')
    console.log(props)

    let counter = props.counter
    let inplay = props.inplay
    let gamestateparents = props.parents

    console.log('counter')
    console.log(counter)

    console.log('inplay')
    console.log(inplay)

    console.log('gamestateparents')
    console.log(gamestateparents)

    useEffect( () => {
        // setParents(inplay)
    }, [])

    
    
    
    

    const dispatch = useDispatch()
    


    // store.dispatch(increment)
    setTimeout( () => {
        console.log("wow no way!")
        console.log(store.getState())
    }, 2000 )
    
    

    const checkredux = async () => {
        console.log('items')

        await dispatch( {type: "INCREMENT"})
        // await dispatch( {type: "INCREMENT"})
        if (gamestate.gameReducer.inplay === true) {
            setParents(inplay)
            await dispatch( {type: NOT_PLAYING_GAME})
        } else if (gamestate.gameReducer.inplay === false) {
            setParents('magic')
            await dispatch( {type: PLAYING_GAME})            
        }
        console.log('gamestate')
        console.log(gamestate)
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
        <div style= {{ backgroundColor: 'dodgerBlue', minHeight: '100vh'}}>
            <h1> guessing game test render </h1>
            <h1> {parents || 'ayoo'} </h1>
            <button onClick={checkredux}></button>
            
        </div>
    )
}

const mapStateToProps = (gamestate) => {
    return {
         counter: game.counter,
         inplay: game.inplay,
         parents: game.parents
         }
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
