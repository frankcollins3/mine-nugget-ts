

// @reduxjs/toolkit
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import { TOGGLE_PLAYING  } from "redux/familyTree/familyTreeSlice"

// components and styles
import styles from "./GameIntro.module.scss"

// utils
import {useImage} from "Contexts/Img"
import Boop from "components/boop/boop"

export default function GameIntro() {
    return <RENDER/>
}

function RENDER() {
    const { king, queen, joker, kingspades, queenspades, cards, blackjack, navbardice, goldenticket } = useImage()
    const dispatch = useDispatch()
  
      const thatsTheTicket = () => {
        dispatch(TOGGLE_PLAYING())
      }

      
    
      return (
        <>
        {/* <Boop> */}    
        <img onClick={thatsTheTicket} className="hover" src={goldenticket}/>
        {/* </Boop> */}
  
        <img id={styles.blackjack} src={blackjack}/>
        {/* <img style={{ height: '300px', width: '300px' }} src={blackjack}/> */}
        </>
  
        // <img style={{ transform: 'rotate(180deg)' }} src={blackjack}/>
      )
  }