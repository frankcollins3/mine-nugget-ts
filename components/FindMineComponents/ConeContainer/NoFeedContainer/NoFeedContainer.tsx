import {useEffect, useState} from "react"

// components and styles
import Container from "react-bootstrap/Container"
import styles from "./NoFeedContainer.module.scss"

// @reduxjs/toolkit
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import { SET_NO_FEED_SELECTED_STRAIN
 } from "redux/findMine/findMineSlice"
// utils
import {useImage} from "Contexts/Img"

export default function NoFeedContainer() {
    return <RENDER/>
}

function RENDER() {
    const SHOW_FEED = useSelector( (state:RootState) => state.findMine.SHOW_FEED)
    const CURRENT_USER_STRAINS = useSelector( (state:RootState) => state.findMine.CURRENT_USER_STRAINS)
    const NO_FEED_SELECTED_STRAIN = useSelector( (state:RootState) => state.findMine.NO_FEED_SELECTED_STRAIN)

    const [showDigText, setShowDigText] = useState(false)
    const [showDeleteText, setShowDeleteText] = useState(false)
    const [showMineText, setShowMineText] = useState(false)

    const dispatch = useDispatch()

    const { coin, mine, gold, shovel, dynamite,  } = useImage()

    const setCoin = (item) => {
        console.log('item', item)
        const id = item.strainsid
        console.log(id)
        // [1 'wedding cake', 2 'GorillaGlue#4', 3: Do-Si-Dos, 4: mimosa, 5 cherry pie, 6 white widow, 7 pineapple express]
        // {id === 1 ? "cake" : id === 2 ? "Glue#4" : id === 3 ? "Do-Si-Dos" : id === 4 ? "mimosa" : id === 5 ? "pie" : id === 6 ? "white wid" : id === 7 ? "p-express" : ""}
        dispatch(SET_NO_FEED_SELECTED_STRAIN(
            id === 1 ? "wedding cake" : id === 2 ? "GorillaGlue#4" : id === 3 ? "Do-Si-Dos" : id === 4 ? "mimosa" : id === 5 ? "cherry pie" : id === 6 ? "white widow" : id === 7 ? "pineapple express" : ""
        ))
    }

    return (
        <Container id={styles.Page_1}>

            <Container className={styles.primary}>
                {
                    NO_FEED_SELECTED_STRAIN
                    ? 
                    <>
                    <pre> this is crazy </pre>
                    <Container id={styles.selectedStrainColumn}>
                    <img id={styles.selectedStrainGoldBar} src={gold}/>
                    <h6 id={styles.selectedStrainText}> {NO_FEED_SELECTED_STRAIN} </h6>
                    </Container>                        

                    <Container id={styles.shovelMineCont}>

                        <Container className={styles.coinColumn}>
                        <img onMouseEnter={() => setShowDigText(true)} onMouseLeave={() => setShowDigText(false)} className={styles.shovelDynamiteMine} src={shovel}/>
                        { showDigText && <pre className={styles.digDeleteMine}> dig </pre> }
                        
                        </Container>

                        <Container className={styles.coinColumn}>
                        <img onMouseEnter={() => setShowDeleteText(true)} onMouseLeave={() => setShowDeleteText(false)} className={styles.shovelDynamiteMine} src={dynamite}/>                        
                        { showDeleteText && <pre className={styles.digDeleteMine}> delete </pre> }
                        </Container>

                        <Container className={styles.coinColumn}>                        
                        <img onMouseEnter={() => setShowMineText(true)} onMouseLeave={() => setShowMineText(false)} className={styles.shovelDynamiteMine} src={mine}/>                        
                        { showMineText && <pre className={styles.digDeleteMine}> mine </pre> }
                        </Container>

                    </Container>

                    </>
                    : <img id={styles.noSelectedStrainMine} src={mine}/>
                }
            </Container>

            <Container className={styles.panel}>
                {
                CURRENT_USER_STRAINS &&
                CURRENT_USER_STRAINS.map( (item, index) => {
                    let id = item.strainsid
                    return (
                        // <pre> {item.strainsid} </pre>
                        // [1 'wedding cake', 2 'GorillaGlue#4', 3: Do-Si-Dos, 4: mimosa, 5 cherry pie, 6 white widow, 7 pineapple express]
                        <Container key={`column${index}`} className={styles.coinColumn}>
                        <img style={{ cursor: 'pointer'}} key={index} className={styles.currentUserStrainsCoin} onClick={() => setCoin(item)} src={coin}/>

                        <pre className={styles.coinText}> 
{id === 1 ? "cake" : id === 2 ? "Glue#4" : id === 3 ? "Do-Si-Dos" : id === 4 ? "mimosa" : id === 5 ? "pie" : id === 6 ? "white wid" : id === 7 ? "p-express" : ""}
                        </pre>
                        </Container>
                            
                    )
                })
                }
            </Container>

        </Container>
    )
}