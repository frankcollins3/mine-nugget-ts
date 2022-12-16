import React from 'react';
import {connect} from 'react-redux';

import { TypedUseSelectorHook, useSelector } from 'react-redux'
import {Provider} from 'react-redux';
import withRedux from "next-redux-wrapper";

import {PLAYING_GAME, NOT_PLAYING_GAME} from 'redux/actions/gameActions'
import { playingGame, notPlayingGame } from 'redux/actions/gameActions'
import wrapper from '../redux/store';
import store from 'redux/store'


console.log('fam tree component')
let state1 = store.getState()
console.log('state1')
console.log(state1)
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





 function FamilyTree (props, {items}) {
// export default function FamilyTree (props) {
    console.log('props')
    console.log(props)
    console.log(props.store)
    console.log(items)
    


    // store.dispatch(increment)
    setTimeout( () => {
        console.log("wow no way!")
        console.log(store.getState())
    }, 2000 )
    
    

    const checkredux = async () => {


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
        <div>
            <h1> guessing game test render </h1>
            <button onClick={checkredux}></button>
            
        </div>
    )
}

const mapStateToProps = state => ({
    reduxstate: state
    // items: state.counter
});

export default connect(mapStateToProps)(FamilyTree);
// reducer: rootReducer
// export async function getServerSideProps(context) {              

//     return {
//         props: {
//             store
//         }
//     }

//   }
