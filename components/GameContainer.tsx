// * dependencies
// import {connect} from 'react-redux';
import { TypedUseSelectorHook, useSelector, connect } from 'react-redux'
import { useState, useEffect, useContext} from 'react'
import $ from 'jquery'

// * CSS
import styles from 'styles/game/sass/FamilyTree.module.scss'
import ShadowBorder from 'styles/game/components/GameContainer'

// * components:
import ParentRing from 'components/ParentRing'
import ParentWatch from 'components/ParentWatch'
import Container from 'react-bootstrap/Container'
import Family from 'components/FamilyTreeContainer1'
import Family2 from 'components/FamilyTreeContainer2'
import GameCounter from 'components/GameCounter'
import GameChild from 'components/GameChild'

// * redux
import wrapper from '../redux/store';
import store from 'redux/store'
import { useDispatch } from "react-redux";
import customReduxSelector from 'redux/reduxselector'

// * utility functions
import APIcall from 'utility/APIcall'
import Regex from 'utility/MasterRegex'
import AttrTool from 'utility/JqAttr'

// * Context
import { useGame } from 'Contexts/game'





export default  function GameContainer (props) {
    console.log('props from the GameContainer!!!!')
    console.log(props)

    
    const [cactusHover, setCactusHover] = useState(false)
    // const [gameOn, setGameOn] = useState(false)
    
    const {
        gameOn, playing, notplaying,
         parents, meetTheParents, 
         parent1, parent1state, parent2, parent2state,
         dontuse, fillbucket, emptybucket,
         winStreak, winstreakincrement, wrongGuess, guesswrongincrement
         } = useGame()
    
    
    useEffect( () => {
        // Game Child and GameContainer linked here.s
        console.log('useEffect firing off in GameContainer!')
        console.log('wrongGuess')
        console.log(wrongGuess)
        AttrTool($('#gold1'), 'src', '/img/dynamite.png')
    }, [wrongGuess] )
    
    useEffect( () => {
        console.log('winStreak useEffect GameContainer!')
        AttrTool($('#gold1'), 'src', '/img/ring.png')
        AttrTool($('#gold2'), 'src', '/img/ring.png')        
    }, [winStreak])
    

    const HoverOnCactus = async () => {        
        // playing = dispatch( { type: 'PLAYING_GAME'})
        await meetTheParents()
        playing()        
        // setTimeout( () => {
            setCactusHover(true)
        // }, 2000) 
    }

    const goldbarhover1 = async () => {
        parent1state()
    }
    const goldbarhover2 = async () => {
        parent2state()
    }
        
        // reduxparents = dispatch( { type: "SET_PARENTS", payload: { parents: randomparents}})
        
    return (
        <>
            
            <ShadowBorder>
                  {/* {playing === false || cactusHover === false */}
                 {cactusHover === false 
                ?
                <div                 
                className="Column">                
                <img onClick={HoverOnCactus}                
                src="/img/cactus.png"/>

                <h3             
                 style={{color:'white'}}> hover on the parents to reveal the gold</h3>
                <h3 style={{color:'white'}}> hover to reveal the options </h3> 
                </div>
                : 
            
                <div
                onMouseEnter={async() => {
                    if (gameOn === 'not playing') {
                        // console.log("W E      A R E     O V E R     H E R E      W I T H     T H E     S T A T E !!!!")
                        // await addToState()
                        // setTimeout(checkredux, 2000)
                        // await checkredux()
                        
                        // await setTimeout(async  () => {
                        // }, 2000)
                                                
                    } else {
                        // console.log("hey its already false")
                    }
                }}
                >
                {gameOn === 'playing' 
                ?
                <div 
                className={styles.Row2}>
                <Family/>
                <Family/>
                <Family/>
                </div>
                : 
                ''
                }
                
                <div className="Column">
                <GameChild
                 gold1={$('#gold1')} gold2={$('#gold2')}
                 cactusHover={cactusHover} setCactusHover={setCactusHover}/>
                </div>
                
        
                <Container className={styles.Row}>
        
                    <Container className={styles.ColumnParent}>
                    <ParentRing />
                
                    
                    <img
                    id="gold1"
                    // onClick={checkredux}
                    style={{ height: '50px', width: '50px'}}
                    onMouseEnter={goldbarhover1}
                    src="img/gold.png"/>
                    <h1> { parent1 || '' }</h1>                                          
                    </Container>

                    

                    {/* <div 
                    style={{ border: 'transparent', boxShadow: 'transparent'}}
                    className="Column">
                    <img src="img/gameoff.png"/>
                    <img src="img/gameon.png"/>
                </div> */}
                    
                    <Container             
                    className={styles.ColumnParent}>
                    <ParentWatch />
                    
                    <img
                    id="gold1"
                    onMouseEnter={goldbarhover2}
                    style={{ height: '50px', width: '50px'}}
                    src="img/gold.png"/>                                                               
                    <h1> { parent2 || '' }</h1>                                          
                    </Container>
        
                </Container>
                
                {gameOn === 'playing' ? 
                <div 
                className={styles.Row2}>
                <Family/>
                <Family/>
                <Family/>
                </div>
                :
                ''
                }
                </div>
                
                }    

            </ShadowBorder>
 
 
        </>
    )
}
