import {useState, useEffect} from "react"

// components and styles
import Container from "react-bootstrap/Container"
import styles from "./UserIcons.module.scss"

// @reduxjs/toolkit
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"

// utils
import {useImage} from "Contexts/Img"
import {useRegex} from "Contexts/Regex"
import {nothing} from "utility/utilityValues"

export default function UserIcons() {
    return <RENDER/>
}

function RENDER () {

    const [profileHover, setProfileHover] = useState(false)
    let [index, setIndex] = useState(8)
    const [dontChangeIndex, setDontChangeIndex] = useState(false)

    const [localSearchTerm, setLocalSearchTerm] = useState('')
    const { MletterAfterSlash } = useRegex()
    const { mine, barrel, firetag, winoneheart, king, queen, joker, kiss, shovel, ring, watch, barrier, cactus, signUpSigns, glasses, cart, coin, dynamite, } = useImage()
    const heart = "img/winoneheart.png"
    const optionArray:string[] = [ barrel, barrier, cactus, cart, coin, dynamite, firetag, glasses, joker, king, kiss, queen, ring, shovel, signUpSigns, watch, heart, ]
    const Left = "<"
    const Right = ">"

    useEffect( () => {
        optionArray.forEach( (item:any, index:number) => {      // has to type as :any for the regex but there's probably a way to throw a generic or some kind of type method-permittable type?
            let firstChar:any = item.match(MletterAfterSlash)
            firstChar = firstChar[1]         
            console.log('firstChar', firstChar)
            console.log('index', index)
            if (localSearchTerm === firstChar) {
                console.log(`we have a match: searchTerm: ${localSearchTerm} firstChar: ${firstChar}`)
                setIndex(index)
                setDontChangeIndex(true)
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

    const test = () => {
        console.log('index', index)
        console.log('searchTerm', localSearchTerm)
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {        
        let value:string = event.target.value
        setLocalSearchTerm(value)
    };

    const imageHover = () => setDontChangeIndex(false)


    return (
        <Container onClick={test} onMouseEnter={() => setProfileHover(true)} onMouseLeave={() => setProfileHover(false)} id={styles.cont}>
            
        {
            profileHover === true 
            ?
            <Container id={styles.iconRow}>

            <input maxLength={1} id={styles.input} onChange={handleInputChange} type="text"/>

            <pre onMouseEnter={dontChangeIndex ? nothing : decrementState} className={styles.ghost}> {Left} </pre>
             <img onMouseEnter={dontChangeIndex ? imageHover : nothing} id={styles.img} src={optionArray[index]}/>
             <pre onMouseEnter={dontChangeIndex ? nothing : incrementState} className={styles.ghost}> {Right} </pre>
            </Container>
            : 
            <pre id={styles.text}> Profile </pre>
        }
        {/* <pre id={styles.text}> Profile </pre> */}
        
            
        </Container>
    )
}