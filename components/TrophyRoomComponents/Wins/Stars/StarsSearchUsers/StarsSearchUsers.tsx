import {useEffect} from 'react'

// components and styles
import Container from "react-bootstrap/Container"
import styles from "./StarsSearchUsers.module.scss"

// @reduxjs/toolkit
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import { SET_STARS_RANDOM_USER, SET_STARS_ARRAY, SET_CURTAIN_IMAGE_CLICK } from 'redux/trophyRoom/trophyRoomSlice'

// utils
import {useImage} from "Contexts/Img"

export default function StarsSearchUsers({allUsers}) {
    return <RENDER allUsers={allUsers}/>
}

function RENDER({allUsers}) {

    useEffect( () => {
        allUsers.forEach( (user, index) => {
            console.log('user', user)

            for (const char of user.username) {
                if (char === STARS_SEARCH_TERM) {
                    console.log(`match ${char} searchTerm: ${STARS_SEARCH_TERM}`)
                }
            }
        })

    }, [STARS_SEARCH_TERM])

    const test = () => {
        console.log('test')
        console.log('search term', STARS_SEARCH_TERM)
        console.log('users', allUsers)
    }

    return (
        <Container id={styles.cont}>
            {
                allUsers && allUsers.map( (users, index) => {
                    return (
                    <pre className={styles.pre} onClick={test}> { users.username } </pre>
                    )
                })
            }

            {/* <h1 onClick={test}> search users </h1> */}
        </Container>
    )
}