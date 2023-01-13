import Page from 'styles/findmine/components/Searchpage'
import styles from 'styles/findmine/sass/FindMine.module.scss'
import Helmet from 'components/Helmet'
import Magnify from 'components/Magnify'
import { useState, useEffect } from 'react'
import $ from 'jquery'
import Container from 'react-bootstrap/Container'
import {useGame} from 'Contexts/game'
import GET from 'utility/GETdataJS'
import {useUrl} from 'Contexts/Url'
import { useRouter } from 'next/router'

// import {UrlProvider} from 'Contexts/Url'

// * utility
import ReturnUrl from 'utility/ReturnUrl'

export default function FindMine (props, context) {    
    let urlagain = props.urlagain
    console.log('urlagain')
    console.log(urlagain)


    let serverdata = props.data 

    let [preUrl, setPreUrl] = useState([])
    // const [preUrl, setPreUrl] = useState<string/>/('')

    const { allStrain } = useUrl()  //obj destructuring
    const { gameOn, playing, searchHover, hoverOnSearch  } = useGame()
    const slashindexbucket = new Array() || []

    // let host:string = props.url
    let newurl = urlagain += allStrain 
    console.log('newurl')
    console.log(newurl)

    let workingurl = props.urlbuild    
    
    let slashcounter = 0

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
    }, [])

        // useEffect( () => {
            const loopAndPush = async () => {
                for (const char in workingurl) {            
                    if (workingurl[char] === '/') {
                        slashcounter++
                        if (slashcounter === 3) {
                            slashindexbucket.push(char + 1)
                        }
                    }
                }
            }   
            const valuecheck = async () => {
                    let preslashindex = workingurl.slice(0, slashindexbucket)   // operator + 1 cant be used on :any[] || never i changed the push to [ char + 1 ]     
                    setPreUrl(preslashindex)
\
        const check = async () => {
            console.log(props.url)
            let pokeapi = `https://pokeapi.co/api/v2/pokemon`
            // let data = await GET(allStrain)
            // let data = await GET('http://localhost:3000/pages/api/strains/strain')
            console.log('preurl')
            console.log(preUrl)

            if (preUrl === workingurl) return console.log(`preUrl: ${preUrl} workingurl: ${workingurl}`)

            let data = await GET(workingurl)
            // let data = await GET('http://localhost:3000/api/strains/strain')
            // let data = await GET('http://localhost:3000/api/strains/strain')
            // let data = await GET(preUrl)
            // let data = await GET(preUrl[0])
            
            console.log('data from get')
            console.log(data)

            console.log(`newurl ${newurl} allStrain ${allStrain} `)

        } 

        check()
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
    let urlbuild = `${url}/api/strains/strain`
    let urlagain = url 
    // let pokeurl = `https://pokeapi.co/api/v2/pokemon/`    
    let predata = await fetch(new URL(`${url}/api/strains/strain`))            
    let data = await predata.json()   

    
  return {
  props: {
      data, urlbuild, urlagain
    }
  };
  }



