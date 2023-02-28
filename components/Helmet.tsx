import styles from 'styles/findmine/sass/FindMine.module.scss'
import Container from 'react-bootstrap/Container'
import {useGame} from 'Contexts/game'
import {useEffect, useState} from 'react'

export default function Helmet () {
    let sassdiv:string = styles.div
    let helmet:string = styles.helmet
    let barrier:string = styles.barrier

    const {url, urlSetter, constraintshow, constraintshowset} = useGame()    

    useEffect( () => {        
    }, [url])

    return (            
        <Container 
        className={styles.div}>
        <img src="/img/helmet.png" className={helmet} ></img>
        <img src="/img/barrier.png" className={barrier}></img>                    
        </Container>                        
    )
}
