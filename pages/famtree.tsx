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


let i = 0;
 function FamilyTree (props) {
    
    // export default function FamilyTree (props) {

    const [parents, setParents] = useState('')
    const [strains, setStrains] = useState('')
    const [trigger, setTrigger] = useState(0)


    const [redux, setRedux] = useState(false)

    const [int, setInt] = useState('')
    console.log('props')
    console.log(props)

    let counter = props.counter
    let inplay = props.inplay
    let gamestateparents = props.parents
    let serverdata = props.serverdata

    const dispatch = useDispatch()

    let result:any = useSelector(state => state)
    let reduxparents = result.gameReducer.parents
    // let reduxparents:string = result.gameReducer.parents

    const checkState = () => {
        // let newstate
        // newstate = useSelector(state => state)
        // [ let newstate = '' newstate  = useSelector() ] this didn't work 
        console.log('reduxparents')
        console.log(reduxparents)
    }
    

    useEffect( () => {



    }, [trigger])
    



    // {type: 'filters/statusFilterChanged', payload: filterValue}
    


    useEffect( () => {
        // setParents(inplay)
    }, [])


    
    

        const checkredux = async () => {
            let straindata:(object|string|number) = await APIcall('all', null, null)
            let randomStrain = await Random(straindata)
            let randomparents:string = randomStrain.parents
            reduxparents = dispatch( { type: "SET_PARENTS", payload: { parents: randomparents}})
            console.log('straindata')
            console.log(straindata)
            console.log('reduxparents')
            console.log(reduxparents)


            // if (trigger === 1) {
            //     reduxparents = dispatch( { type: 'SET_PARENTS', payload: { parents:'night owl'}})
            // }
            
            // if (trigger === 2) {
            //     reduxparents = dispatch( { type: 'SET_PARENTS', payload: { parents:'black night'}})
            // }
            // if (trigger === 3) {
            //     reduxparents = dispatch( { type: 'SET_PARENTS', payload: { parents:'father time'}})
            // }

            let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
            let randomletter:string = await Random(letters)
            console.log('randomletter')
            console.log(randomletter)
            setTrigger(trigger + 1)
            await setRedux(true)
        }

        
    console.log('family tree component!')

    return (
        // <ShadowBorder>
        <div className={styles.div}  
        // style= {{ backgroundColor: 'dodgerBlue', minHeight: '100vh'}}
        >       
            <GameContainer/>
            <h1
            style={{ color: 'white'}}
            > {redux === true ? reduxparents : 'not redux parents'} </h1>
            <p> {trigger || 'random text'} </p>
            <button onClick={checkredux}></button>            

            {/* <button 
            style = { { backgroundColor: "orange"}}
            onClick={checkredux2}></button>             */}
        </div>
        // </ShadowBorder>
    )   
}

    // function mapStateToProps(state) {
    //     const { todos } = state
    //     return { todoList: todos.allIds }
    //   }

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
