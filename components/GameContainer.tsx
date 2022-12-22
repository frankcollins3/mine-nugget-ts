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
import {PLAYING_GAME, NOT_PLAYING_GAME} from 'redux/actions/gameActions'
import { playingGame, notPlayingGame } from 'redux/actions/gameActions'
import wrapper from '../redux/store';
import store from 'redux/store'
import { useDispatch } from "react-redux";
import customReduxSelector from 'redux/reduxselector'

// * utility functions
import Regex from 'utility/MasterRegex'



export default  function GameContainer (props) {
    console.log('props from the GameContainer!!!!')
    console.log(props)
    const [cactusHover, setCactusHover] = useState(false)

    const dispatch = useDispatch()
    let reduxresult:any = useSelector(state => state)
    
    let parent1 = reduxresult.gameReducer.parent1
    let parent2 = reduxresult.gameReducer.parent2
    let parents:string = props.redux   
    let checkredux = props.checkredux
    
    const statechange = async () => {
        console.log("state change function")
        let newstr = await Regex(reduxresult.gameReducer.parents, 'stringsplit')
        parent1 = dispatch( { type: 'SET_PARENTS_1', payload: { parent1: newstr[0]}})        
        parent2 = dispatch( { type: 'SET_PARENTS_2', payload: { parent2: newstr[1]}})        
    }   
        
        // reduxparents = dispatch( { type: "SET_PARENTS", payload: { parents: randomparents}})
        

    


    return (
        <>
            <ShadowBorder>
                {cactusHover === false 
                ?
                <img onMouseEnter={()=> setCactusHover(true)} src="/img/cactus.png"/>
                :

                <div>
                <div 
                className={styles.Row2}>
                <Family/>
                <Family/>
                <Family/>
                </div>
                
                <div className="Column">
                <GameChild/>
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
        <button onClick={statechange}></button>
        </>
    )
}
