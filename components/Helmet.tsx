import styles from 'styles/findmine/sass/FindMine.module.scss'
import Container from 'react-bootstrap/Container'
import {useGame} from 'Contexts/game'
import {useEffect, useState} from 'react'

export default function Helmet () {
    let sassdiv:string = styles.div
    let helmet:string = styles.helmet
    let barrier:string = styles.barrier

    const {url, urlSetter} = useGame()
    // can do a regex to remove the slash if you want to clean things up. no need. can do strict equality with copy pasted string from dev tools

    useEffect( () => {
        console.log("useEffect is being triggered by clicking the button from LoginLogout.tsx")
        console.log('url useEffect')
        console.log(url)
    }, [url])

    // let halfsizediv = [styles.div, ".halfpint"].join(" ")

    console.log('url from Helmet!')
    console.log(url)

    
    
    return (
                
        <Container 
        style={{ border: url === '/LoginLogout' ? '9px solid moccasin' : '9px solid rgba(255, 166, 0, 0.85)' }}
        // style={{ width: url === '/LoginLogout' ? '500px'  '200px' }}
        className={styles.div}>
        <img src="/img/helmet.png" className={helmet} ></img>
        <img src="/img/barrier.png" className={barrier}></img>            
        </Container>            
    )
}
