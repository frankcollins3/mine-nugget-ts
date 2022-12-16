import React from 'react';
import {connect} from 'react-redux';

import { TypedUseSelectorHook, useSelector } from 'react-redux'
import {Provider} from 'react-redux';
import withRedux from "next-redux-wrapper";
import wrapper from '../redux/store';

import store from 'redux/store'

const increment = { 
    type: "INCREMENT"
}



console.log('app.js!')
let mystate = store.getState()
console.log('mystate')
console.log(mystate)
store.dispatch(increment)
setTimeout( () => {
    console.log("wow no way!")
    console.log(store.getState())
}, 2000 )

// console.log(store.dispatch({ type: 'game/playing'}))





export default function FamilyTree (props) {
    console.log('props')
    console.log(props)
    console.log(props.store)
    
    

    const checkredux = async () => {
        await store.dispatch(increment)
        console.log("this is my redux")
        await store.getState()

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

// reducer: rootReducer
// export async function getServerSideProps(context) {              

//     return {
//         props: {
//             store
//         }
//     }

//   }
