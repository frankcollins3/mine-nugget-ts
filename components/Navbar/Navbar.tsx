
// components and styles
import Container from "react-bootstrap/Container"
import styles from "./Navbar.module.scss"

// utils
import {useImage} from "Contexts/Img"

export default function Navbar() {
    return <RENDER></RENDER>
}

function RENDER() {
    const { magnify, gold, cactus, mine } = useImage()

    const goldClick = () => {
        window.location.href = "/strain"
    }

    return (
        <Container id={styles.Cont}>

            <Container>
                <img id={styles.mine} className={styles.img} src={mine}/>
            </Container>

            <Container id={styles.multiIconCont}>
                <img onClick={goldClick} className={styles.img} src={gold}/>
                <img className={styles.img} src={cactus}/>
                <img className={styles.img} src={magnify}/>
            </Container>
            
        </Container>
    )
}