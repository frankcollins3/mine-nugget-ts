import React from 'react';
import {connect} from 'react-redux';

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import reducer from "slices/game/gameslice";

import { play } from 'slices/game/gameslice'
console.log('play')
console.log({play})

// reducer: rootReducer
const store = configureStore({
    reducer: reducer
});

console.log('store in the famtree')
console.log(store)
console.log(store.getState())
store.dispatch( { type: 'playing'})
console.log(store.getState())



import {decrementCounter, incrementCounter} from '../redux/actions/counterActions';



export default function FamilyTree (props) {
    console.log('props')
    console.log(props)

    const checkredux = async () => {
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

// export async function getServerSideProps(context) {              

//   }
