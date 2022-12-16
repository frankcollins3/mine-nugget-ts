import React from 'react';
import {connect} from 'react-redux';

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import game from 'slices/game/gameslice'
console.log('game')
console.log(game)
console.log(game.actions)

const store = configureStore({
    reducer: game.reducer 
})

console.log(store.getState())
// store.dispatch( {type: })




// const { location } = useSelector(state=>state)
// const dispatch = useDispatch();


// const {  } = useSelector(state=>state)
// const dispatch = useDispatch();


// import reducer from "slices/game/gameslice";
// const {  } = useSelector(state=>state)


// const dispatch = useDispatch();
// import { play } from 'slices/game/gameslice'


// const store = configureStore({    
//     reducer: reducer
// });

// console.log(store.getState())
// store.dispatch( { type: 'playing'})
// console.log("hey were over here")
// console.log(store.getState())
// const numbermethod = number => number + 1
// let gotmynumber = numbermethod(1)
// console.log('gotmynumber')
// console.log(gotmynumber)


// const playvalue = state => state.inplay
// const locationvalue = state => state.location
// const playval = playvalue(store.getState())
// const locval = locationvalue(store.getState())

// let newlocation = store.dispatch( { type: 'newlocation'})
// console.log('newlocation')
// console.log(newlocation)

// console.log(playval)
// console.log(locval)
// import {decrementCounter, incrementCounter} from '../redux/actions/counterActions';



export default function FamilyTree (props) {
    console.log('props')
    console.log(props)

    

    const checkredux = async () => {
        console.log("this is my redux")
        // await props.store.getState()
        // await props.store.displatch( { type: 'playing'})
        // await props.store.getState()
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
