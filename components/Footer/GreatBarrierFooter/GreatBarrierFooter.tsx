
// components and styles
import Container from "react-bootstrap/Container"
import styles from "./GreatBarrierFooter.module.scss"

// utils
import { useImage } from "Contexts/Img"

export default function GreatBarrierFooter() {
    return <RENDER></RENDER>
}

function RENDER() {
    const { barrier } = useImage()

    return (
        <Container id={styles.Cont}>
        <img className={styles.img} src={barrier}/>
        <img className={styles.img} src={barrier}/>            
        </Container>
    )
}