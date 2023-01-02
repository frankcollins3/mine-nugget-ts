 import React from 'react';
import {connect} from 'react-redux';
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import {Provider} from 'react-redux';
import withRedux from "next-redux-wrapper";
import {useEffect, useState, useContext, createContext} from 'react'
import Axios from 'axios'

// * utility functions
import ReturnUrl from 'utility/ReturnUrl'
import DataCall from 'utility/DataCall'
import APIcall from 'utility/APIcall'
import Random from 'utility/Randomizer'
import Regex from 'utility/MasterRegex'

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
import customReduxSelector from 'redux/reduxselector'

let gamestate = store.getState()
let game = gamestate.gameReducer

// * Components that Comprise the Page
import GameContainer from 'components/GameContainer'
import Container from 'react-bootstrap/Container'
import Family from 'components/FamilyTreeContainer1'
import { addSyntheticLeadingComment } from 'typescript';


store.dispatch( { type: "PLAYING_GAME!"})
store.dispatch( { type: "INCREMENT" })
store.getState()
// store.dispatch( { type: 'SET_PARENTS', payload: { parents: 'white rhino'}})



let i = 0;
 function FamilyTree (props, context) {
    // console.log('props in family tree!')
    // console.log(props)

    // could also use context but in the name of time:
    const [gameOn, setGameOn] = useState(false)
    const [parents, setParents] = useState('')
    const [parent1, setParent1] = useState('')
    const [parent2, setParent2] = useState('')
    const [winStreak, setWinStreak] = useState(0)
    const [wrongGuess, setWrongGuess] = useState(0)

    const gamearr = [gameOn, setGameOn]
    const parentsarr = [parents, setParents]
    const parent1arr = [parent1, setParent1]
    const parent2arr = [parent2, setParent2]
    const winStreakarr = [winStreak, setWinStreak]
    const wrongGuessarr = [wrongGuess, setWrongGuess]
    
    let gamestateobj = {
        gameOn: gamearr, 
        parents: parentsarr,
        parent1: parent1arr,
        parent2: parent2arr,
        winStreak: winStreakarr,
        wrongGuess: wrongGuessarr,
    }
    
    const GameStateContext = createContext(gamestateobj)
    // const gamestatecontext = createContext({})

    const addState = async () => {
        console.log("hey were adding state")
        let straindata:(object|string|number) = await APIcall('all', null, null)
        let randomStrain = await Random(straindata)        
        console.log('randomStrain')
        console.log(randomStrain)
    }

    // useEffect( () => {
    //     const addToState = async () => {
    //         let straindata:(object|string|number) = await APIcall('all', null, null)
    //         let randomStrain = await Random(straindata)
    //         console.log('straindata')
    //         console.log(straindata)
    //         console.log('randomStrain')
    //         console.log(randomStrain)            
    //     }
    //     addToState()
    // }, [])

    // useEffect( () => {
        // const addToState = async () => {
        //     let straindata:(object|string|number) = await APIcall('all', null, null)
        //     let randomStrain = await Random(straindata)
        //     console.log('randomStrain')
        //     console.log(randomStrain)
        //     let randomparents:string = randomStrain.parents
        //     console.log('randomparents from addToState /famtree')
        //     console.log(randomparents)
        // }
        // parent1 = dispatch( { type: 'SET_PARENTS', payload: { parents: randomparents}})                    
    //     addToState()

    // }, [])

    

        
    return (
        // <ShadowBorder>          
        <Container 
        onClick={addState}
        className={styles.div}>
            {/* <button onClick={changeit}/>
            <button onClick={checkit}/> */}
            
            <GameStateContext.Provider value={gamestateobj}>
            <GameContainer                            
            style={{ minHeight: '80vh', minWidth: '80vw'}} 
            />
            </GameStateContext.Provider>
            
        </Container>                           
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
    let data = await APIcall('all', null, null)
    let apilen:number = data.length

    let index1 = apilen-apilen + 1

    let indexlast = apilen    
    
    // let arraystate = []
    let arraystate:number[] = []

    function randomNumber(min, max) { 
        let random = Math.random() * (max-min) + min
        let int = random.toFixed()
        return int
        // return Math.random() * (max - min) + min.;
    } 
    // let randomvalue = await Random(arraystate)
    let randomvalue = await randomNumber(index1, indexlast)

        let predata = await fetch(new URL(`${url}/api/strains/strain/${randomvalue}`))                    
        let serverdata = await predata.json()        

  return {
  props: {
    serverdata    
  }
  };
  }

export default connect(mapStateToProps)(FamilyTree);
