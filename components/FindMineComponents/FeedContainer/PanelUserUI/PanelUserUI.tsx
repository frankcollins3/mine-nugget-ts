
// components and styles
import Container from "react-bootstrap/Container"
import styles from "./PanelUserUI.module.scss"

export default function PanelUserUI ( {userData, index} ) {
    console.log('userData in PanelUserUI', userData)

    return (
        // <p> hey </p>
        <Container id={styles.cont}>            
        <img id={styles.img} src={userData[index].icon}/>
        <pre id={styles.userNameText}> {userData[index].username} </pre>
        </Container>
    )
}