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
            
    const [cactusHover, setCactusHover] = useState(false)
    // const [gameOn, setGameOn] = useState(false)
    
    const {
        gameOn, playing, notplaying,
         parents, meetTheParents, 
         parent1, parent1state, parent2, parent2state, clearparent1, clearparent2,
         dontuse, fillbucket, emptybucket,
         winStreak, winstreakincrement, wrongGuess, guesswrongincrement,
          trophy, addTrophy, EitherParents, clearwinstreak, clearguesswrong
         } = useGame()
    
     
    useEffect( () => {
        // Game Child and GameContainer linked here.s
        console.log('useEffect firing off in GameContainer!')        
        if (wrongGuess === 1) AttrTool($('#gold1'), 'src', '/img/dynamite.png')
        if (wrongGuess === 2) {
            AttrTool($('#gold2'), 'src', '/img/dynamite.png')               
            notplaying()
            EitherParents('1', 'Y O U')
            EitherParents('2', 'L O S E')
            clearwinstreak()
            clearguesswrong()
        }
    }, [wrongGuess] )

    useEffect( () => {        
        if (wrongGuess === 2) {
            AttrTool($('#gold1'), 'src', '/img/ring.png')               
            AttrTool($('#gold2'), 'src', '/img/watch.png')               
            notplaying()
        }
    }, [winStreak])
        
    
    
    const HoverOnCactus = async () => {                
        await meetTheParents('strain')
        playing()                
        setCactusHover(true)        
    }

    const goldbarhover1 = async () => {
        parent1state()
    }
    const goldbarhover2 = async () => {
        parent2state()
    }

    return (
        <>            
            <ShadowBorder>
                  {winStreak > 1 && cactusHover === false ? 
                  <div 
                  className={styles.Row2}>
                  <Family/>
                  <Family/>
                  <Family/>
                  </div>
                  :
                  ''
                  }
                 {cactusHover === false 
                ?
                
                
                <div                 
                className="Column">                
                <img onClick={HoverOnCactus}                
                src="/img/cactus.png"/>

                <h1             
                 style={{
                        color:'wheat', letterSpacing: '1.1em', boxShadow: '20px 30px 40px limegreen'
                        }}> F a m i l y  <br/>T r e e   </h1>
                
                {winStreak > 1 ?
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
                : 
            
                <div
                onMouseEnter={async() => {
                    if (gameOn === 'not playing') {
                    } else {
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
                    style={{ height: '50px', width: '50px', marginTop: '0.5em'}}
                    onMouseEnter={goldbarhover1}
                    src="img/gold.png"/>
                    <h1> { parent1 || '' }</h1>                                          
                    </Container>
                        
                    <Container             
                    className={styles.ColumnParent}>
                    <ParentWatch />
                    
                    <img
                    id="gold2"
                    onMouseEnter={goldbarhover2}
                    style={{ height: '50px', width: '50px', marginTop: '0.5em'}}
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
