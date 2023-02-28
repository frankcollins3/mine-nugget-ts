
import React from 'react';
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
import wrapper from '../redux/store';
import store from 'redux/store'
import { useDispatch } from "react-redux";
import customReduxSelector from 'redux/reduxselector'
import {connect} from 'react-redux';
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import {Provider} from 'react-redux';
import withRedux from "next-redux-wrapper";

// * Context
import { useGame } from 'Contexts/game'

let gamestate = store.getState()
let game = gamestate.gameReducer

// * components that build this pages UI
import GameContainer from 'components/GameContainer'
import Container from 'react-bootstrap/Container'
import Family from 'components/FamilyTreeContainer1'

let i = 0;
 function FamilyTree (props, context) {
    // const { gameOn, playing, notPlaying } = useGame
    const {
         gameOn, playing, notplaying,
          parents, meetTheParents, 
          parent1, parent1state, parent2, parent2state 
          } = useGame()
    
    // const [parent1, setParent1] = useState('')
    // const [parent2, setParent2] = useState('')
    const [winStreak, setWinStreak] = useState(0)
    const [wrongGuess, setWrongGuess] = useState(0)

    
    const winStreakarr = [winStreak, setWinStreak]
    const wrongGuessarr = [wrongGuess, setWrongGuess]

    const addState = async () => {
        let straindata:(object|string|number) = await APIcall('all', null, null)
        let randomStrain = await Random(straindata)        
        console.log('randomStrain in the famtree')
        console.log(randomStrain)
    }

    return (
        // <ShadowBorder>          
        <Container 
        onClick={addState}
        className={styles.div}>

            <GameContainer/>
            {/* <h1 style={ { color: 'white'}}> {gameOn} </h1> */}
            
            {/* <h1 style={ { color: 'white'}}> {parents} </h1>
            <h1 style={ { color: 'white'}}> {parent1} </h1>
            <h1 style={ { color: 'white'}}> {parent2} </h1> */}

            {/* <button onClick={playing}></button>
            <button onClick={notplaying}></button> */}
            {/* <button onClick={meetTheParents}></button>
             <button onClick={parent1state}></button>
            <button onClick={parent2state}></button> */}

            {/* <button 
            style={{ 
            borderRadius: '50%', backgroundColor: 'orange', height: '100px', width: '100px'
            }}
            onClick={() => console.log(parents)}></button> */}

            {/* </GameContext.Provider> */}
                                    
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
