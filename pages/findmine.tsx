import Page from 'styles/findmine/components/Searchpage'
import styles from 'styles/findmine/sass/FindMine.module.scss'
import Helmet from 'components/Helmet'
import Magnify from 'components/Magnify'
import { useState, useEffect } from 'react'
import $ from 'jquery'
import Container from 'react-bootstrap/Container'
import {useGame} from 'Contexts/game'

// * utility
import ReturnUrl from 'utility/ReturnUrl'

export default function FindMine (props) {
    console.log('props from FindMine')
    console.log(props)
    console.log('props.data')
    console.log(props.data)


    const { gameOn, playing, searchHover, hoverOnSearch  } = useGame()
    // const {gameOn, playing, searchHover } = useGame()
    

    useEffect( () => {
        const textExit = () => {        // i would put turn this abstract expression into a modular reusable function but it won't be reused again.
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
        textExit()
        // }).complete( (elem) => $(elem).hide() )
    }, [])

    const checkit = () => {                
        playing()
        hoverOnSearch()
    }

    return (        
        <Page>       

        <Container className={styles.row}>     
        

        <div className="Column">        
        <h1 className={styles.h1} style={{ color: 'papayawhip', fontFamily: 'papyrus' }}> Find Mine </h1>'
        <Magnify/>
            <h6 className="HoverHintHeader"
             style={{ color: 'papayawhip'}}> Hover on the Magnifying Glass <br/> Press a letter to search  </h6>
        </div>

        </Container>        
        </Page>
    )
        
}

export async function getServerSideProps(context:any) {              
    let url:any = await ReturnUrl(context);    
    // let pokeurl = `https://pokeapi.co/api/v2/pokemon/`    
    let predata = await fetch(new URL(`${url}/api/strains/strain`))            
    let data = await predata.json()        
  return {
  props: {
      data    
    }
  };
  }



