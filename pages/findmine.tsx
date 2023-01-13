import Page from 'styles/findmine/components/Searchpage'
import styles from 'styles/findmine/sass/FindMine.module.scss'
import Helmet from 'components/Helmet'
import Magnify from 'components/Magnify'
import { useState, useEffect } from 'react'
import $ from 'jquery'
import Container from 'react-bootstrap/Container'
import {useGame} from 'Contexts/game'
// import {useGame} from 'Contexts/find'

// import {UseSearch} from 'Contexts/FINDMINE'

export default function FindMine () {
    const { gameOn, playing, searchHover, hoverOnSearch  } = useGame()
    // const {gameOn, playing, searchHover } = useGame()
    

    useEffect( () => {
        const textEdit = () => {        // i would put turn this abstract expression into a modular reusable function but it won't be reused again.
            $('.HoverHintHeader')
            .animate({
                opacity: 0.9
            }, 450)
            .animate({
                opacity: 0.7
            }, 450)
            .animate({
                opacity: 0.5
            }, 450)
            .animate({
                opacity: 0.3
            }, 400)
            .animate({
                opacity: 0.1
            }, 450)
            .animate({
                opacity: 0.0
            }, 250)
        }
        // }).complete( (elem) => $(elem).hide() )
    }, [])

    const checkit = () => {        
        console.log('gameOn')
        console.log(gameOn)
        playing()
        hoverOnSearch()
    }

    return (

        
        <Page>       
        <Container className={styles.row}>        
        <Helmet/>
        {/* <Helmet/> */}
        
        <div className="Column">
        <Magnify/>
            <h6 className="HoverHintHeader"
             style={{ color: 'papayawhip'}}> Hover on the Magnifying Glass <br/> Press a letter to search  </h6>
        </div>
        
        </Container>

        {/* <div className="Row">
            <h1 className={styles.h1}> Find </h1>
            <img src="/img/mine.png"/>
            <h1 className={styles.h1}> Mine </h1>         
        </div> */}
        
        {/* <h1 style={{ color: 'papayawhip', fontFamily: 'papyrus' }}> Find Mine </h1> */}'
        </Page>
    )

}



