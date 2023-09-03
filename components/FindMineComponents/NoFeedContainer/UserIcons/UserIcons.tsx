import {useState, useEffect} from "react"
import axios from 'axios'

// components and styles
import Container from "react-bootstrap/Container"
import styles from "./UserIcons.module.scss"

// @reduxjs/toolkit
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"

// utils
import {useImage} from "Contexts/Img"
import {usePromise} from "Contexts/Promises"
import {useRegex} from "Contexts/Regex"
import {nothing} from "utility/utilityValues"

import { getUpdateUserIconStringFunc } from "graphql/queries"

export default function UserIcons() {
    return <RENDER/>
}

function RENDER () {

    const CURRENT_USER = useSelector( (state:RootState) => state.main.CURRENT_USER)

    const {updateUserIconPROMISE} = usePromise()

    const [profileHover, setProfileHover] = useState(false)
    let [index, setIndex] = useState(8)
    const [dontChangeIndex, setDontChangeIndex] = useState(false)

    const [localSearchTerm, setLocalSearchTerm] = useState('')
    const { MletterAfterSlash, MstringAfterHost3000 } = useRegex()
    const { mine, barrel, firetag, winoneheart, king, queen, joker, kiss, shovel, ring, watch, barrier, cactus, signUpSigns, glasses, cart, coin, dynamite, } = useImage()
    const heart = "img/winoneheart.png"
    const optionArray:string[] = [ barrel, barrier, cactus, cart, coin, dynamite, firetag, glasses, joker, king, kiss, queen, ring, shovel, signUpSigns, watch, heart, ]
    const Left = "<"
    const Right = ">"

    useEffect( () => {
        optionArray.forEach( (item:any, index:number) => {      // has to type as :any for the regex but there's probably a way to throw a generic or some kind of type method-permittable type?
            let firstChar:any = item.match(MletterAfterSlash)
            firstChar = firstChar[1]                     
            if (localSearchTerm === 'h') {
                setIndex(16)
                setDontChangeIndex(true)
            } else if (localSearchTerm === 'w') {
                setIndex(15)
                setDontChangeIndex(true)
            }
            else if (localSearchTerm === 't') {
                setIndex(14)
                setDontChangeIndex(true)
            }
            else if (localSearchTerm === 's') {
                setDontChangeIndex(true)
                setIndex(13)
            }
            else if (localSearchTerm === firstChar) {
                console.log(`we have a match: searchTerm: ${localSearchTerm} firstChar: ${firstChar}`)
                if (localSearchTerm !== 'w' && localSearchTerm !== 't' && localSearchTerm !== 'h' && localSearchTerm !== 's') {
                    setIndex(index)
                    setDontChangeIndex(true)
                }
            }
        })
    },[localSearchTerm])

    const incrementState = () => {
        console.log('increment function')
        if (index < 16) {
        setIndex(index + 1)
        }
    }
    
    const decrementState = () => {        
        console.log('decrement function')
        if (index > 1) {
            setIndex(index - 1)
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {        
        let value:string = event.target.value
        setLocalSearchTerm(value)
    };

    const imageHover = () => setDontChangeIndex(false)

    const updateUserIcon = (event:any) => {
        console.log("hey were updating");
        const src:string = event.target.src
        console.log('src', src)
        console.log('CURRENT_USER', CURRENT_USER)

        // const regex:RegExp = /\/(\w+\/\w+\.\w+)/
        const imgSrc:any|null = src.match(MstringAfterHost3000)
        if (imgSrc !== 'null') {
            let str:string = imgSrc[1]
            console.log('str', str)

            updateUserIconPROMISE(str)
            .then( (updatedUser) => {
                
                console.log('updatedUser', updatedUser)
            })

            // const query = getUpdateUserIconStringFunc(CURRENT_USER.username, str)
            // axios.post("/api/graphql", { query: `${query}` })
            // .then( (userIconUpdate:any) => {
            //     console.log('userIconUpdate', userIconUpdate)
            // })

        } else {
        }        

    }


    return (
        <Container onMouseEnter={() => setProfileHover(true)} onMouseLeave={() => setProfileHover(false)} id={styles.cont}>
            
        {
            profileHover === true 
            ?
            <Container id={styles.iconRow}>

            <input maxLength={1} id={styles.input} onChange={handleInputChange} type="text"/>

            <pre onClick={dontChangeIndex ? nothing : decrementState} className={styles.ghost}> {Left} </pre>
             <img onClick={updateUserIcon} onMouseEnter={dontChangeIndex ? imageHover : nothing} id={styles.img} src={optionArray[index]}/>
             <pre onClick={dontChangeIndex ? nothing : incrementState} className={styles.ghost}> {Right} </pre>
            </Container>
            : 
            <pre id={styles.text}> Profile </pre>
        }
        {/* <pre id={styles.text}> Profile </pre> */}
        
            
        </Container>
    )
}
