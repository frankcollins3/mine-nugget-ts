import {useState} from 'react'

// components and styles
import Container from "react-bootstrap/Container"
import styles from "./LoadingPickaxe.module.scss"

// utils
import {useImage} from "Contexts/Img"

export default function LoadingPickaxe() {
// export default function LoadingPickaxe(digFor: string) {     // was going to use string props to say: Digging for {props.digFor/"data"} looks better with just img i think.
    return <RENDER/>    
}

function RENDER() {
    const [contHover, setContHover] = useState(false)
    const { pickaxe, goldenTriangle } = useImage()

    return (
        <Container onMouseEnter={() => setContHover(true)} onMouseLeave={() => setContHover(false)} id={styles.cont}>

        <img className={contHover ? styles.pickFast : styles.pick} id={styles.pickaxe} src={pickaxe}/>
        <img className={contHover ? styles.goldFast : styles.gold} id={styles.gold} src={goldenTriangle}/>
        </Container>
    )
}
