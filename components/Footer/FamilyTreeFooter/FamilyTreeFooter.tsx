

import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import { 
} from "redux/familyTree/familyTreeSlice"

// components and styles
import Container from "react-bootstrap/Container"
import styles from "./FamilyTreeFooter.module.scss"

// utils
import {useImage} from "Contexts/Img"

export default function FamilyTreeFooter() {

    return <RENDER/>
}

function RENDER() {
    const {winoneheart, cards} = useImage()
    const GAME_LIVES = useSelector( (state:RootState) => state.familyTree.GAME_LIVES)


    return (
        <Container id={styles.Cont}>
        <Container id={styles.heartRow}>

            { GAME_LIVES &&
                
                GAME_LIVES.map( (live, index) => {
                    return (
                         live % 2 === 0 && <img key={index} className={styles.img} src={winoneheart}/>                         
                        // { index % 2 === 0 && <img key={index} className={styles.img} src={winoneheart}/> }                        
                        )
                    })
                }
            </Container>


            <img className={styles.img} src={cards}/>
        </Container>
    )
}