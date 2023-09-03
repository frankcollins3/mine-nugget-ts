import axios from 'axios'
import {useEffect} from 'react'

// @reduxjs/toolkit
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import { SET_CURRENT_USER, SET_CURRENT_PAGE } from "redux/main/mainSlice"
import { 
  TOGGLE_PLAYING, SET_PLAYING_STRAIN, SET_PLAYING_PARENT_KING, SET_PLAYING_PARENT_QUEEN, SET_PLAYING_GUESS_RIGHT,
  SET_PLAYING_GUESS_WRONG_1, SET_PLAYING_GUESS_WRONG_2, SET_PLAYING_GUESS_WRONG_3
  } from "redux/familyTree/familyTreeSlice"

// components and styles
import Container from "react-bootstrap/Container"
import FamilyTreeFooter from "components/Footer/FamilyTreeFooter/FamilyTreeFooter"
import GameIntro from "components/FamilyTreeComponents/GameIntro"
import KingQueenPlaying from "components/FamilyTreeComponents/KingQueenPlaying"
import DynamicFamilyTree from "components/FamilyTreeComponents/DynamicFamilyTree"

// utils
import {useImage} from "Contexts/Img"
import {usePromise} from "Contexts/Promises"
import Boop from "components/boop/boop"
import {getCookie} from "utility/utilityValues"
import { getUserWithIdStringFunc } from 'graphql/queries';
import { shuffleArrayOfObjects } from 'utility/utilityValues'
    


export default function FamilyTree() {

  const dispatch = useDispatch()

  // const { king, queen, joker, kingspades, queenspades, cards, blackjack, navbardice, cactus } = useImage()

  const CURRENT_PAGE = useSelector( (state:RootState) => state.main.CURRENT_PAGE)
  const PLAYING_GUESS_WRONG_3 = useSelector( (state:RootState) => state.familyTree.PLAYING_GUESS_WRONG_3)
  const PLAYING = useSelector( (state:RootState) => state.familyTree.PLAYING)
  const BONUS_GAME = useSelector( (state:RootState) => state.familyTree.BONUS_GAME)
  const LUCKY_PULL_PLAYING = useSelector( (state:RootState) => state.familyTree.LUCKY_PULL_PLAYING)
  

  const { familyTreeStrainsPROMISE, setallstrainsPROMISE } = usePromise()

  const {cookieFunc} = usePromise()

            // TOGGLE_PLAYING, SET_PLAYING_STRAIN, SET_PLAYING_PARENT_KING, SET_PLAYING_PARENT_QUEEN,
            // SET_PLAYING_GUESS_RIGHT, SET_PLAYING_GUESS_WRONG_1, SET_PLAYING_GUESS_WRONG_2, SET_PLAYING_GUESS_WRONG_3

  useEffect( () => {  
      dispatch(SET_CURRENT_PAGE("/familytree"))
      cookieFunc()
      .then( (currentuser) => {
        if (currentuser && currentuser.id) {
          dispatch(SET_CURRENT_USER({id: currentuser.id, age: currentuser.age, email: currentuser.email, icon: currentuser.icon, password: currentuser.password, username: currentuser.username, wins: currentuser.wins}))
        }
      })
      //   dispatch(SET_CURRENT_USER({ id: currentuser.id, age: currentuser.age, email: currentuser.email, icon: currentuser.icon, password: currentuser.password, username: currentuser.username, wins: currentuser.wins}                        
      familyTreeStrainsPROMISE()          
  }, [])

    return (

      <>
    <Container className="Main-Family-Tree">

      {
        PLAYING
        // ? <DynamicFamilyTree gameType={LUCKY_PULL_PLAYING ? "luckypull" : "pairents"} />
        ? <KingQueenPlaying/>
        : <GameIntro/>
      }
      {/* <GameIntro/> */}

    </Container>

    <Container className="footer">
      <FamilyTreeFooter/>
    </Container>
    </>

    )

}



function RENDER() {
  const { king, queen, joker, kingspades, queenspades, cards, blackjack, navbardice, goldenticket, kingqueensplit } = useImage()


    return (
      <>
      {/* <img className="hover" src={goldenticket}/>     */}
      <Container>
      <img style={{ height: '100px', width: '100px'}} src={king}/>
      <img style={{ height: '100px', width: '100px'}} src={queen}/>
      </Container>

      <img style={{ height: '50px', width: '50px' }} src={kingqueensplit}/>
      </>
    )
}
