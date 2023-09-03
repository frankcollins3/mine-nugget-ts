import {useState, useEffect} from "react"
import axios from 'axios'
import $ from 'jquery'

// components and styles
import Container from "react-bootstrap/Container"
import styles from "./UserIcons.module.scss"

// @reduxjs/toolkit
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import { TOGGLE_USER_ICON_SAVE_ERROR } from "redux/findMine/findMineSlice"

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

    const dispatch = useDispatch()
    const CURRENT_USER = useSelector( (state:RootState) => state.main.CURRENT_USER)
    const USER_ICON_SAVE_ERROR = useSelector( (state:RootState) => state.findMine.USER_ICON_SAVE_ERROR)


    const {updateUserIconPROMISE} = usePromise()

    const [profileHover, setProfileHover] = useState(false)
    let [index, setIndex] = useState(8)
    const [dontChangeIndex, setDontChangeIndex] = useState(false)

    const [localSearchTerm, setLocalSearchTerm] = useState('')
    const { MletterAfterSlash, MstringAfterHost3000 } = useRegex()
    const { mine, barrel, firetag, winoneheart, king, queen, joker, kiss, shovel, ring, watch, barrier, cactus, signUpSigns, glasses, cart, coin, dynamite, caution } = useImage()
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
        const src:string = event.target.src
        // const regex:RegExp = /\/(\w+\/\w+\.\w+)/
        const imgSrc:any|null = src.match(MstringAfterHost3000)
        if (imgSrc !== 'null') {
            let str:string = imgSrc[1]

            updateUserIconPROMISE(str)
            .then( (updatedUser) => {                
                if (updatedUser.data.errors) {
                    if (updatedUser.data.errors[0]) {
                        dispatch(TOGGLE_USER_ICON_SAVE_ERROR())
                        setTimeout( () => dispatch(TOGGLE_USER_ICON_SAVE_ERROR()), 2000)
                    }
                } else {
                    $(event.target).css('border-bottom', '5px solid rgb(247, 208, 32)')
                    setTimeout( () => $(event.target).css('border-bottom', 'none'), 2000)
                    // $(event.target).css('box-shadow', '5px 5px 5px rgb(247, 208, 32)')
                }                
            })            
        } // no else block, graphQL will return an error within the .then() block if there is one.         

    }


    return (
        <Container onMouseEnter={() => setProfileHover(true)} onMouseLeave={() => setProfileHover(false)} id={styles.cont}>
            
        {
            profileHover === true 
            ?
            <Container id={styles.iconRow}>

            <input maxLength={1} id={styles.input} onChange={handleInputChange} type="text"/>

            <pre onClick={dontChangeIndex ? nothing : decrementState} className={styles.ghost}> {Left} </pre>
             <img onClick={updateUserIcon} onMouseEnter={dontChangeIndex ? imageHover : nothing} id={styles.img} src={USER_ICON_SAVE_ERROR ? caution : optionArray[index]}/>
             <pre onClick={dontChangeIndex ? nothing : incrementState} className={styles.ghost}> {Right} </pre>
            </Container>
            : 
            <pre id={styles.text}> Profile </pre>
        }
        {/* <pre id={styles.text}> Profile </pre> */}
        
            
        </Container>
    )
}
