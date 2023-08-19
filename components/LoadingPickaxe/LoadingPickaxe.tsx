
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
    const { pickaxe, goldenTriangle } = useImage()

    return (
        <Container id={styles.cont}>

        <img id={styles.pickaxe} src={pickaxe}/>
        <img id={styles.gold} src={goldenTriangle}/>
        </Container>
    )
}