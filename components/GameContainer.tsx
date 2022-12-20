// * dependencies
import {connect} from 'react-redux';
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import styles from 'styles/game/sass/FamilyTree.module.scss'
// * CSS
import ShadowBorder from 'styles/game/components/GameContainer'

// * components:
import ParentRing from 'components/ParentRing'
import ParentWatch from 'components/ParentWatch'
import Container from 'react-bootstrap/Container'
import Family from 'components/FamilyTreeContainer1'
import Family2 from 'components/FamilyTreeContainer2'

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
    const dispatch = useDispatch()
    let reduxresult = useSelector(state => state)
    console.log('reduxresult')
    console.log(reduxresult)

    let parents:string = props.redux   
    let parent1 = props.parent1 
    let parent2:string = props.parent1 

    const statechange = async () => {
        console.log("state change function")
        let newstr = await Regex(parents, 'stringsplit')
        console.log('newstr')
        console.log(newstr)
    }

    const checkredux = async () => {
        // reduxparents = dispatch( { type: "SET_PARENTS", payload: { parents: randomparents}}
    }


    return (
        <>

            <ShadowBorder>
        <div>
        


        <div 
        className={styles.Row2}>
        <Family/>
        <Family/>
        <Family/>
        </div>
        
        

        <Container className={styles.Row}>
            {/* <div className={styles.Row}> */}
            <Container className={styles.ColumnParent}>
            <ParentRing parents={parents}/>
            <h1> {parents || ''}</h1>
            <h1> {parent1 || ''}</h1>
            <img
            style={{ height: '50px', width: '50px'}}
            src="img/gold.png"/>         
            </Container>

            <Container className={styles.ColumnParent}>
            <ParentWatch parents={parents}/>
            <h1> {parents || ''}</h1>   
            <img
            style={{ height: '50px', width: '50px'}}
            src="img/gold.png"/>         
            </Container>
            {/* </div> */}
        </Container>
        

        {/* <Family2/> */}

        <div 
        className={styles.Row2}>
        <Family/>
        <Family/>
        <Family/>
        </div>
        </div>
            </ShadowBorder>
        <button onClick={statechange}></button>
        </>
    )
}
