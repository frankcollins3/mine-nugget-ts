import axios from 'axios'
import {useEffect} from 'react'

// @reduxjs/toolkit
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import { SET_CURRENT_USER } from "redux/main/mainSlice"
import { TOGGLE_PLAYING  } from "redux/familyTree/familyTreeSlice"

// components and styles
import Container from "react-bootstrap/Container"
import FamilyTreeFooter from "components/Footer/FamilyTreeFooter/FamilyTreeFooter"
import GameIntro from "components/FamilyTreeComponents/GameIntro"
import KingQueenPlaying from "components/FamilyTreeComponents/KingQueenPlaying"

// utils
import {useImage} from "Contexts/Img"
import {usePromise} from "Contexts/Promises"
import Boop from "components/boop/boop"
import {getCookie} from "utility/utilityValues"
import { getUserWithIdStringFunc } from 'graphql/queries';
    


export default function FamilyTree() {

  const dispatch = useDispatch()

  const { king, queen, joker, kingspades, queenspades, cards, blackjack, navbardice, cactus } = useImage()

  const ALL_STRAINS = useSelector( (state:RootState) => state.main.ALL_STRAINS)
  const PLAYING = useSelector( (state:RootState) => state.familyTree.PLAYING)
  const PLAYING_STRAIN = useSelector( (state:RootState) => state.familyTree.PLAYING_STRAIN)
  const PLAYING_PARENT_KING = useSelector( (state:RootState) => state.familyTree.PLAYING_PARENT_KING)
  const PLAYING_PARENT_QUEEN = useSelector( (state:RootState) => state.familyTree.PLAYING_PARENT_QUEEN)
  const PLAYING_GUESS_RIGHT = useSelector( (state:RootState) => state.familyTree.PLAYING_GUESS_RIGHT)
  const PLAYING_GUESS_WRONG_1 = useSelector( (state:RootState) => state.familyTree.PLAYING_GUESS_WRONG_1)
  const PLAYING_GUESS_WRONG_2 = useSelector( (state:RootState) => state.familyTree.PLAYING_GUESS_WRONG_2)
  const PLAYING_GUESS_WRONG_3 = useSelector( (state:RootState) => state.familyTree.PLAYING_GUESS_WRONG_3)


  const { familyTreeStrainsPROMISE, familyTreeWrongGuessPROMISE } = usePromise()

  const {setallstrainsPROMISE} = usePromise()

            // TOGGLE_PLAYING, SET_PLAYING_STRAIN, SET_PLAYING_PARENT_KING, SET_PLAYING_PARENT_QUEEN,
            // SET_PLAYING_GUESS_RIGHT, SET_PLAYING_GUESS_WRONG_1, SET_PLAYING_GUESS_WRONG_2, SET_PLAYING_GUESS_WRONG_3

  useEffect( () => {
      // setallstrainsPROMISE()
      const cookieFunc = async () => {
        const cookie = await getCookie()
        console.log('cookie', cookie)
        if (cookie[0] && cookie[1]) {                
            let id
            id = cookie[0].length > cookie[1].length ? cookie[1].replace(/\D+/g, '') : cookie[0].replace(/\D+/g, '')
            console.log('id', id)
            if (id) {                
                const query = getUserWithIdStringFunc(id)
                return axios.post('/api/graphql', {query:`${query}`})
                .then( (userWithId:any) => {
                console.log('userWithId', userWithId)
                userWithId = userWithId.data.data.getUserWithId
                dispatch(SET_CURRENT_USER(userWithId))
                })
            } 
        } else { return }
      }
        // }
    cookieFunc()

      familyTreeStrainsPROMISE()    

  }, [])
  // }, [GAME_RESET])





    return (

      <>
    <Container className="Main-Family-Tree">

      {
        PLAYING
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