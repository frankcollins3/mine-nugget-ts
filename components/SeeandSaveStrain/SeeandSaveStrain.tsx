

//  @reduxjs/toolkit global state management

// components and styles
import Container from 'react-bootstrap/Container'
import styles from "./SeeandSaveStrain.module.scss"

// utils
import { SeeAndSaveStrainProps } from "utility/InterfaceTypes"

import { usePromise } from "Contexts/Promises"

export default function SeeandSaveStrain(props: SeeAndSaveStrainProps) {    
    
    const strain = props.strain

    return (
        <Container id={styles.Cont}>
        <RENDER strain={strain}></RENDER>
        </Container>
    ) 
}

function RENDER( { strain } ) {

    const { strainClickPROMISE } = usePromise()

    return (
        <>
            <li style={{ cursor: 'none' }} onClick={() => strainClickPROMISE(strain)} className={styles.li}> {strain} </li>
        </>
    )
}