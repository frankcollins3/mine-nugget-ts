// @ts-nocheck
import Page from 'styles/findmine/components/SearchPage'
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
import AllMine from 'components/AllMineBtnStrip'
import MineShovel from 'components/mineshovel'

// * utility
import ReturnUrl from 'utility/ReturnUrl'
import FirstLetter from 'utility/firstLetterSearch'
import GETuserstrains from 'utility/GETuserstrains'

export default function FindMine (props, context) {    
    let urlagain = props.urlagain        
    let serverdata = props.data 

    const { allStrain, getSpecifiedStrain, userStrainPost, userStrainGet, getID } = useUrl()  //obj destructuring
    
    let userStrainUrl = props.userStrainUrlAgain
    let postMINEurl = props.postMINEurl
    let getALLminesURL = props.getALLminesURL
    let allStrainUrl = urlagain += allStrain     
    let getIDurl = props.getIDurl
    let workingurl = props.urlbuild    
    let userStrainPostUrl = props.userStrainPost
    let digsURL = props.digsURL

    let [preUrl, setPreUrl] = useState('')
    
    // * database accessing endpoint bank app: CONTEXT API 

    // * global state for the whole app as CONTEXT API 
    const { 
            gameOn, playing, searchHover, hoverOnSearch, findMineTheme, toggleTheme,
            selectedSearch, searchSelector, searchType, searchTypeClick,
            userStrains, userstrainset, allMyStrains, allmystrainset,
            currentuserset, currentUser, currentusernameset, currentuseridset,  currentUserId,                      
          } = useGame()

    const slashindexbucket = new Array() || []
    const [findMineMyStrains, setFindMineMyStrains] = useState([])
    let slashcounter = 0
          

    useEffect( () => {      
        currentuserset(currentUser)  
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
        console.log('useEffect.. triggered triggere triggered!')
        const checkuser = async () => {          
          let currentusername =   window.localStorage.getItem('currentUserName')
          let currentuserid =  window.localStorage.getItem('currentUserId')
          let prestrains = window.localStorage.getItem('myStrains')            

          let splitId = prestrains?.split(',')        
          let filteredId = await splitId?.filter( strainsId => strainsId !== ',' && strainsId.length === 1)                                          
          console.log('filteredId from FindMine these are my strains!')
          console.log(filteredId)
          currentusernameset(currentusername)
          currentuseridset(currentuserid)    
          userstrainset(filteredId)       

        //   * myStrains: associated to currentUser.
          setFindMineMyStrains(filteredId)       
        allmystrainset(filteredId)
        //   setFindMineMyStrains(filteredId)       
        }
        checkuser()
    }, [currentUser])



    useEffect( () => {    
        const util = async () => {                
            let strainIdString = '';                    
            let getUserStrains = await GETuserstrains(userStrainUrl, 'all')            
            let userstraindata = getUserStrains.data.userStrains
            await userstrainset(userstraindata)     
            
            let userid:any = window.localStorage.getItem('currentUserId')            
            let filteredStrains = userstraindata.filter(strain => strain.usersId.toString() === userid?.toString())            
            await filteredStrains.forEach( (mystrain) => {
                let stringPiece = `${mystrain.strainsId},`
                strainIdString += stringPiece
            })                    
            await window.localStorage.setItem('myStrains', strainIdString)                                                   
        }
        // util()

        const util2 = async () => {
            let currentusername =   window.localStorage.getItem('currentUserName')
            let currentuserid =  window.localStorage.getItem('currentUserId')
            let prestrains = window.localStorage.getItem('myStrains')          
            let splitId = prestrains?.split(',')        
            console.log('splitId')
            console.log(splitId)
            let filteredId = await splitId?.filter( strainsId => strainsId !== ',' && strainsId.length === 1)                  
            console.log('filteredId these are my strains!')                                    
            console.log(filteredId)                                    
            currentusernameset(currentusername)
            currentuseridset(currentuserid)    
            userstrainset(filteredId)   
        }
        const userutility = async () => {
            await util()
            await util2()
        }
        userutility()
        
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
        toggleTheme()
    }

    const allormine = async (event) => {
        let btnText:string = event.target.outerText
        console.log('btnText')
        console.log(btnText)
        await searchTypeClick(btnText)
    }



    return (      
        <>
        <Page style={{ border: 'none'}}
        >             
        {/* <button style={{ backgroundColor: 'orange'}} onClick={orangetest}> </button>   */}
        <Container 

        className={styles.row}>             
        <Container className="Column">    
        
        {
            selectedSearch.length > 5
            ?
            <FindMineText findMineTheme={findMineTheme}/>
            :
            <pre></pre>
        }
                    
        {
            selectedSearch.length > 5
            ?
            <pre></pre>
            :
            <div className="Column">
            <Magnify url={urlagain} findMineTheme={findMineTheme}/>
            <h6 className="HoverHintHeader" style={{ color: 'papayawhip'}}> Click on the Magnifying Glass <br/> Press a letter to search  </h6>         
            <DisplayForSearch url={urlagain} localURL={urlagain} getIDurl={getIDurl} usernamesForID={props.usernamesForIDurl}/>            
            </div>
        }
        </Container>
        </Container>        

    {/* <SelectedSearch findMineMyStrains={findMineMyStrains} getIDurl={getIDurl} />     */}
        {selectedSearch.length > 5 
        ?
        <>
        <SelectedSearch  
                    findMineMyStrains={findMineMyStrains} getIDurl={getIDurl} postMINEurl={postMINEurl}
                    getALLminesURL={getALLminesURL} ALLusersGET={props.ALLusersGET} userStrainPostUrl={userStrainPostUrl} digsURL={digsURL}
        />
        
        <MineShovel postMINEurl={postMINEurl} getALLminesURL={getALLminesURL} deleteMinesURL={props.deleteMinesURL} digsURL={digsURL} ALLusersGET={props.ALLusersGET} />

        </>
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
    
    let userStrainUrl = `${url}/api/strains/getuserstrains`
    let userStrainUrlAgain = userStrainUrl
    
    let getIDurl = `${url}/api/strains/getIDwithNAME`
    let usernamesForIDurl = `${url}/api/strains/allUsernamesForId`

    let postMINEurl = `${url}/api/strains/minePOST`
    let getALLminesURL = `${url}/api/strains/GETallmines`

    let deleteMinesURL = `${url}/api/strains/DELETEmines`
    let ALLusersGET = `${url}/api/user/GetAllUsers`

    let userStrainPost = `${url}/api/strains/userstrainpost`
    
    let digsURL = `${url}/api/strains/digs`
        
    return {
        props: {
            data, urlbuild, urlagain, userStrainUrl, userStrainUrlAgain, getIDurl, usernamesForIDurl, postMINEurl, getALLminesURL, deleteMinesURL, ALLusersGET, userStrainPost, digsURL
    }
  };
  }



