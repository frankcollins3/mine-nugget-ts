import {useEffect, useState} from "react"
import axios from 'axios'

// components and styles
import Container from "react-bootstrap/Container"
import TrophyRoomMain from "components/TrophyRoomComponents/TrophyRoomMain"
import TrophyRoomIntro from "components/TrophyRoomComponents/TrophyRoomIntro"
import TrophyRoomFooter from "components/Footer/TrophyRoom/TrophyRoomFooter"
import MovieFooter from "components/Footer/TrophyRoom/MovieFooter/MovieFooter"
import PhotoFooter from "components/Footer/TrophyRoom/PhotoFooter"
import styles from 'components/TrophyRoomComponents/TrophyRoom.module.scss'


// @reduxjs/toolkit
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import { SET_CURRENT_USER, SET_CURRENT_PAGE } from "redux/main/mainSlice"
import { TOGGLE_WALK_INTO_TROPHY_ROOM, WHICH_IMAGE_DECREMENT, WHICH_IMAGE_INCREMENT } from "redux/trophyRoom/trophyRoomSlice"

// utils
import {useImage} from "Contexts/Img"
import {usePromise} from "Contexts/Promises"
import { ThrowErrIfNoData, ReturnUrl} from "utility/utilityValues"
import { allMinersGETquery } from "graphql/queries"

export default function TrophyRoom({allUsers}) {
    const dispatch = useDispatch()
    const WALK_INTO_TROPHY_ROOM = useSelector( (state:RootState) => state.trophyRoom.WALK_INTO_TROPHY_ROOM)
    const CURTAIN_IMAGE_CLICK = useSelector( (state:RootState) => state.trophyRoom.CURTAIN_IMAGE_CLICK)

    console.log('allUsers props trophyroom pages', allUsers)

    const { curtain } = useImage()

    const { cookieFunc } = usePromise()

    useEffect( () => {
        cookieFunc()
        .then( (user) => [
            console.log('user trophy room effect', user)
        ])
    }, [])

    const test = () => {
      console.log("test");
    }

    return (
            <>
            {
                WALK_INTO_TROPHY_ROOM 
                ? <TrophyRoomMain allUsers={allUsers}/>
                : <TrophyRoomIntro/>
            }
            <Container className="footer">
            {CURTAIN_IMAGE_CLICK === "" && <TrophyRoomFooter/>}
            {CURTAIN_IMAGE_CLICK === "photos" && <PhotoFooter/>}
            {CURTAIN_IMAGE_CLICK === "popcorn" && <MovieFooter/>}
            </Container>
            </>
            // : <RENDERINTRO/>
    )
    
}

export async function getServerSideProps(context:any) {
    
    let url:any = await ReturnUrl(context);  

    try {
      let allUsers = await fetch(`${url}/api/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: `${allMinersGETquery}` }),
        // body: JSON.stringify({ query: `query { allMinersOnStrains { minersId, strainsid } }` }),
      });
  
      ThrowErrIfNoData(allUsers, 'allUsers')
   
  
      const predataUsers = await allUsers.json();
      allUsers = predataUsers.data.allMinersGET;
      
      return {
        props: {
          allUsers
        },
      };
    } catch (error) {
        return {
            props: { 
                error
            }
        }
    }
  }