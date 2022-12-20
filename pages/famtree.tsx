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


store.dispatch( { type: "PLAYING_GAME!"})
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

    let counter = props.counter
    let inplay = props.inplay
    let gamestateparents = props.parents
    let serverdata = props.serverdata

    const dispatch = useDispatch()
    let result:any = useSelector(state => state)
    
    let localstore = result.gameReducer
    let reduxparents = result.gameReducer.parents
    let parent1 = result.gameReducer.parent1
    let parent2 = localstore.parent2
    
    const checkState = () => {
        
    }
    
    
    useEffect( () => {
        
    }, [trigger])
    
    useEffect( () => {
        // setParents(inplay)
    }, [])
    
    const checkredux = async () => {
        let straindata:(object|string|number) = await APIcall('all', null, null)
        let randomStrain = await Random(straindata)
        let randomparents:string = randomStrain.parents
        
        let newstr = await Regex(randomparents, 'stringsplit')
        parent1 = dispatch( { type: 'SET_PARENTS', payload: { parents: randomparents}})        
        parent1 = dispatch( { type: 'SET_PARENTS_1', payload: { parent1: newstr[0]}})        
        parent2 = dispatch( { type: 'SET_PARENTS_2', payload: { parent2: newstr[1]}})        

            let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
            let randomletter:string = await Random(letters)            
            setTrigger(trigger + 1)
            await setRedux(true)
        }

        
    console.log('family tree component!')

    return (
        // <ShadowBorder>

        // <div className={styles.div}  
        // style= {{ backgroundColor: 'dodgerBlue', minHeight: '100vh'}}
        // >       
        <Container className={styles.div}>
            <GameContainer redux={reduxparents} parent1={parent1} parent2={parent2}/>
            <button onClick={checkredux}></button>            
        </Container>
            
        // </div>        
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
    console.log('randomvalue')
    console.log(randomvalue)

        let predata = await fetch(new URL(`${url}/api/strains/strain/${randomvalue}`))                    
        let serverdata = await predata.json()        

  return {
  props: {
    serverdata    
  }
  };
  }

export default connect(mapStateToProps)(FamilyTree);
