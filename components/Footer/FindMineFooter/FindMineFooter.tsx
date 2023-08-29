
// @reduxjs/toolkit
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"

// components and styles
import Container from "react-bootstrap/Container"
import styles from "./FindMineFooter.module.scss"

// utils
import {useImage} from "Contexts/Img"

export default function FindMineFooter() {
    return <RENDER/>
}

function RENDER() {
    const SHOW_FEED = useSelector( (state:RootState) => state.findMine.SHOW_FEED)
    const {ilink, welink, pickaxe, signUpSigns} = useImage()

    return (
        <Container id={styles.cont}>
            {
                SHOW_FEED
                ? <img className={styles.img} src={welink}/>
                : <img className={styles.img} src={ilink}/>                
            }

            <img className={styles.img} src={SHOW_FEED ? signUpSigns : pickaxe}/>
        </Container>
    )
}