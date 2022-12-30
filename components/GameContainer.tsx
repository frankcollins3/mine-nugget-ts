// * dependencies
// import {connect} from 'react-redux';
import { TypedUseSelectorHook, useSelector, connect } from 'react-redux'
import { useState, useEffect} from 'react'

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
import Regex from 'utility/MasterRegex'



export default  function GameContainer (props) {
    // console.log('props from the GameContainer!!!!')
    // console.log(props)
    const [cactusHover, setCactusHover] = useState(false)

    const dispatch = useDispatch()
    let reduxresult:any = useSelector(state => state)
    
    // let parent1 = reduxresult.gameReducer.parent1
    // let parent2 = reduxresult.gameReducer.parent2

    let parent1 = props.parent1
    let parent2 = props.parent2

    let playing = reduxresult.gameReducer.inplay


    let parents:string = props.redux   
    let checkredux = props.checkredux
    
    const statechange = async () => {
        // console.log("state change function")
        let newstr = await Regex(reduxresult.gameReducer.parents, 'stringsplit')
        
        if (playing === 'true') {
            // parent1 = dispatch( { type: 'SET_PARENTS_1', payload: { parent1: newstr[0]}})        
            // parent2 = dispatch( { type: 'SET_PARENTS_2', payload: { parent2: newstr[1]}})        
            playing = dispatch( { type: "PLAYING_GAME", payload: { game: 'play'}})
        } else {
        }
    }    
            


    const HoverOnCactus = async () => {
        checkredux()
        // playing = dispatch( { type: 'PLAYING_GAME'})
        await setCactusHover(true) // 'await' has no effect on the type of this expression.
    }
        
        // reduxparents = dispatch( { type: "SET_PARENTS", payload: { parents: randomparents}})
        
    return (
        <>
            <ShadowBorder>
               {cactusHover === false 
                //  {playing === false || cactusHover === false
                ?
                <div className="Column">                
                <img onClick={HoverOnCactus}                
                src="/img/cactus.png"/>

                <h3
                 onMouseEnter={ () => console.log(`reduxresult.playing ${playing}`)}
                 style={{color:'white'}}> hover on the parents to reveal the gold</h3>
                <h3 style={{color:'white'}}> hover to reveal the options </h3>
                </div>
                : 
            
                // }

                <div>
                <div 
                className={styles.Row2}>
                <Family/>
                <Family/>
                <Family/>
                </div>
                
                <div className="Column">
                <GameChild cactusHover={cactusHover} setCactusHover={setCactusHover}/>
                </div>
                
        
                <Container className={styles.Row}>
        
                    <Container className={styles.ColumnParent}>
                    <ParentRing parents={parents}/>
                
                    <h3 className="ParentContText"
                    > {parent1 || ''} </h3>
                    <img
                    onMouseEnter={checkredux}
                    style={{ height: '50px', width: '50px'}}
                    src="img/gold.png"/>                                           
                    </Container>

                    

                    {/* <div 
                    style={{ border: 'transparent', boxShadow: 'transparent'}}
                    className="Column">
                        <img src="img/gameoff.png"/>
                        <img src="img/gameon.png"/>
                    </div> */}
                    
                    <Container             
                    className={styles.ColumnParent}>
                    <ParentWatch parents={parents}/>
                    {/* <h1> {parents || ''}</h1> */}
                    <h3 className="ParentContText"
                    > {parent2 || ''}</h3>
                    <img
                    style={{ height: '50px', width: '50px'}}
                    src="img/gold.png"/>                                                               
                    </Container>
        
                </Container>
                    
                <div 
                className={styles.Row2}>
                <Family/>
                <Family/>
                <Family/>
                </div>
                </div>
                
                }    

            </ShadowBorder>
            
        {/* <button onClick={statechange}></button> */}
        </>
    )
}
