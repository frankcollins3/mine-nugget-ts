// @ts-nocheck
import Page from 'styles/findmine/components/Searchpage'
import styles from 'styles/findmine/sass/FindMine.module.scss'
import { useState, useEffect } from 'react'
import $ from 'jquery'
import Container from 'react-bootstrap/Container'
import {useGame} from 'Contexts/game'
import GET from 'utility/GETdataJS'
import {useUrl} from 'Contexts/Url'
import { useRouter } from 'next/router'
import FindMineText from 'components/findminetext'
// import FindMineText from 'components/findminetext'

import DisplayForSearch from 'components/Searchdisplay'
import SelectedSearch from 'components/SelectedSearch'
import Magnify from 'components/Magnify'
import Helmet from 'components/Helmet'

// * utility
import ReturnUrl from 'utility/ReturnUrl'
import FirstLetter from 'utility/firstLetterSearch'
import GETuserstrains from 'utility/GETuserstrains'

export default function FindMine (props, context) {    
    let urlagain = props.urlagain
    console.log('urlagain')
    console.log(urlagain)
    let serverdata = props.data 

    let [preUrl, setPreUrl] = useState('')
    
    // * database accessing endpoint bank app: CONTEXT API 
    const { allStrain, getSpecifiedStrain, userStrainPost, userStrainGet } = useUrl()  //obj destructuring

    // * global state for the whole app as CONTEXT API 
    const { 
            gameOn, playing, searchHover, hoverOnSearch, findMineTheme, toggleTheme,
            selectedSearch, searchSelector,                             

          } = useGame()
    const slashindexbucket = new Array() || []

    // let host:string = props.url
    let allStrainUrl = urlagain += allStrain 
    let userStrainUrl = urlagain += userStrainGet

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

    useEffect( () => {

    
        const util = async () => {
            // let search = await FirstLetter('g')       
            
        }
        util()

        const loopPush = () => {
            for (const char in urlagain) {                
                if (urlagain[char] === '/') {
                    slashcounter++
                    if (slashcounter === 3) {                        
                        slashindexbucket.push(char)                                   
                    }
                }                
            }
        }
        const checkAndHandle = async () => {
            let mychar:number = slashindexbucket[0]         
            // * this accesses 
            let slashthird:string = urlagain.slice(0, mychar)
            let actualurl:string = slashthird += getSpecifiedStrain                                    
            let checkfetch = await GET(actualurl, {strain: 'wedding cake'})            
        }
        const doublefunction = async () => {
            await loopPush()
            await checkAndHandle()
        }
        doublefunction()
    }, [])    

    const togglebtn = () => {
        console.log("hey were clicking a button!")
        toggleTheme()
    }

    return (      
        <>
        <Page>       
        <Container 
        className={styles.row}>             
        <div className="Column">                
        <FindMineText findMineTheme={findMineTheme}/>
        

        <Magnify url={urlagain} findMineTheme={findMineTheme}/>
            <h6 className="HoverHintHeader"
             style={{ color: 'papayawhip'}}> Click on the Magnifying Glass <br/>& Press a letter to search  </h6>         
        </div>
        </Container>        
        <DisplayForSearch GETuserStrainUrl={userStrainUrl}  url={urlagain}/>
            {selectedSearch.length > 5 
            ?
        <SelectedSearch GETuserStrainUrl={userStrainUrl}/>
            :
            <pre></pre>
            }
        </Page>        
        </>          
    )
        
}

export async function getServerSideProps(context:any) {              
    let url:any = await ReturnUrl(context);   
    let urlbuild = `${url}/api/strains/strain`
    let urlagain = url 
    let predata = await fetch(new URL(`${url}/api/strains/strain`))            
    let data = await predata.json()   
                


    
  return {
  props: {
      data, urlbuild, urlagain
    }
  };
  }



