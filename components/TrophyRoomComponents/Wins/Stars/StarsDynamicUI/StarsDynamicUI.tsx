import {useEffect} from 'react'

// components and styles
import Container from "react-bootstrap/Container"
import styles from "./StarsDynamicUI.module.scss"

// @reduxjs/toolkit
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import { SET_STARS_RANDOM_USER, SET_STARS_ARRAY, SET_CURTAIN_IMAGE_CLICK } from 'redux/trophyRoom/trophyRoomSlice'

// utils 
import {useImage} from "Contexts/Img"

export default function StarsDynamicUI({stars, allUsers}) {
    const dispatch = useDispatch()
    const { curtain } = useImage()

    const STARS_RANDOM_USER = useSelector( (state:RootState) => state.trophyRoom.STARS_RANDOM_USER)
    return (  
            <Container className="column">
            {
                STARS_RANDOM_USER.age > 0 && STARS_RANDOM_USER.wins <= 5
                ? <RENDERSTARS stars={stars}/>
                : <RENDERSTARSCOUNT/>
            }
            <>
            <img onClick={() => dispatch(SET_CURTAIN_IMAGE_CLICK(''))} style={{ height: '50px', width: '50px', marginTop: '1.25em', cursor: 'pointer' }} src={curtain}/>
            </>            
            </Container>
        )

        // STARS_RANDOM_USER.age > 0 && STARS_RANDOM_USER.wins <= 5 
        // ? <RENDERSTARS/>
        // : <RENDERSTARSCOUNT/>

    // return <RENDERSTARS stars={stars}/>
}

function RENDERSTARS({stars}) {
    const { star } = useImage()

    const dispatch = useDispatch()
    const STARS_RANDOM_USER = useSelector( (state:RootState) => state.trophyRoom.STARS_RANDOM_USER)
    const STARS_ARRAY = useSelector( (state:RootState) => state.trophyRoom.STARS_ARRAY)

    
    useEffect( () => {
        const starArray:any[] = []
        
        const arrayPROMISE = new Promise( (resolve:any, reject:any) => {
            starArray.slice(0, starArray.length)
           for (let i = 0; i < stars; i++) {
        //    for (let i = 0; i < stars.stars; i++) {
               starArray.push(1)
           } 
           resolve(starArray)
        })
        arrayPROMISE
        .then( (starArr) => {
            console.log('starArr in Promise', starArr)
            dispatch(SET_STARS_ARRAY(starArr))                            
        })

    }, [STARS_RANDOM_USER])

    return (
        // <p onClick={test} style={{ color: 'rgb(247, 208, 32)' }}> {stars.stars} </p>
        <Container>
            {
                STARS_ARRAY.map( (item, index) => {
                    return (
                        <img key={index} style={{ cursor: 'none', height: '50px', width: '50px', }} src={star}/>
                    )
                })
            }
        </Container>
        
    )
}

function RENDERSTARSCOUNT() {
    const { star } = useImage()

    const dispatch = useDispatch()
    const STARS_RANDOM_USER = useSelector( (state:RootState) => state.trophyRoom.STARS_RANDOM_USER)
    const STARS_ARRAY = useSelector( (state:RootState) => state.trophyRoom.STARS_ARRAY)

    return (
        <Container style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <pre style={{ cursor: 'none' }} id={styles.text}> {STARS_RANDOM_USER.wins} </pre>
            <img style={{ height: '50px', width: '50px', cursor: 'none' }} src={star}/>            
        </Container>
    )
}

// function RENDERSTARS(stars) {
//     console.log('stars in starsDynamicUI', stars)
//     const starArray:any[] = [];

//     useEffect( () => {
//         for (let i = 0; i < 5; i++) {    
//             console.log('index', i)
//             starArray.push(i)
//         }
//     }, [])

//     const { star } = useImage()


//     return (

//         <Container>
//             {
//                 starArray.length > 1 &&
//                 starArray.map( (star, index) => {
//                     console.log('star in the map method!', star)
//                     return (
//                         <p> hey </p>
//                     )
//                 })
//             }
//         </Container>

//     )
// }
