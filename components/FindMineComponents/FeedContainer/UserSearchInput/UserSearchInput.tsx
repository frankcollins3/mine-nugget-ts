
// components and styles
import Container from "react-bootstrap/Container"
import styles from "./UserSearchInput.module.scss"

// utils
import {useImage} from "Contexts/Img"

export default function UserSearchInput() {
    return <RENDER/>
}

function RENDER() {

    // * * * * *  the mine border is going to go papayawhip on and off for every other input * * * *
    const { mine } = useImage()

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Update the state with the new input value
        // setInputValue(event.target.value);
      };

    return (

        <Container id={styles.inputCont}>
        <input 
        id={styles.userSearchInput}
        type="text"
        />
        <img id={styles.inputMine} src={mine}/>
        </Container>
    )
}