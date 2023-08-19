// @reduxjs/toolkit
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import {SET_CURRENT_PAGE, SET_CURRENT_USER} from "redux/main/mainSlice"
import { TOGGLE_SHOW_INPUT } from "redux/findMine/findMineSlice"

// components and styles
import Container from "react-bootstrap/Container"
import styles from "./FeedContainer.module.scss"
import UserSearchInput from "components/FindMineComponents/FeedContainer/UserSearchInput"
import PanelUserDataCont from "./PanelUserDataCont"

// utils
import {useImage} from "Contexts/Img"
import { showFeedINTERFACE } from "utility/InterfaceTypes"

// Primary: Miner.png -> search user or go forward or back. right hand side shows that users strains in coins. Coin hover see the border. Click coin in <Panel> and <Primary> shows the text 

// allUsers, allMinersOnStrains, allReviewsFromAllUsers, allLikesFromAllUsers

export default function FeedContainer(props: showFeedINTERFACE) {
    console.log('props in the feed container!', props)

    return <RENDER DBdata={props}/>
}

function RENDER(props:any) {
    
    const dispatch = useDispatch()
    const SHOW_INPUT = useSelector( (state:RootState) => state.findMine.SHOW_INPUT)

    const { helmet, magnify } = useImage()

    console.log('props', props)

    const data = props.DBdata
    // console.log('allData in FeedContainer', data)

    const test = () => {
        console.log('props from double clicking!', props)
    }    

    return (
        <Container id={styles.Page_1}>
            <Container className={styles.primary}>
                { !SHOW_INPUT && <pre className={styles.ghost}> ghost </pre> }

                <img id={styles.helmet} src={helmet}/>
                {/* <img onClick={() => dispatch(TOGGLE_SHOW_INPUT())} style={{ height: '25px', width: '25px', cursor: 'pointer' }} src={magnify}/> */}
                {/* {SHOW_INPUT && <UserSearchInput/>} */}
                {/* <p> hey </p> */}
                <pre className={styles.ghost}> ghost </pre>
            </Container>
            
            <Container onDoubleClick={test} className={styles.panel}>
            {/* { !SHOW_INPUT && <pre className={styles.ghost}> ghost </pre> } */}

                <Container id={styles.panelInputCont}>
                <img onClick={() => dispatch(TOGGLE_SHOW_INPUT())} style={{ height: '25px', width: '25px', cursor: 'pointer' }} src={magnify}/>
                {SHOW_INPUT && <UserSearchInput/>}
                </Container>

                <PanelUserDataCont userData={data.allUsers} />

                <pre className={styles.ghost}> ghost </pre>
            </Container>

        </Container>
    )
}


/*

    return (
        <Container onMouseLeave={reset} id={styles.Page_1}>
            <Primary/>
            
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

*/