import Axios from 'axios';
import {useGame} from 'Contexts/game'
import {useUrl} from 'Contexts/Url'
import styles from 'styles/findmine/sass/FindMine.module.scss'
import {useEffect, useState} from 'react'
import Random from 'utility/Randomizer'
let randomNumbers:string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
import $ from 'jquery'
import CSS from 'utility/CSStool'
import AllMine from 'components/AllMineBtnStrip'
import userStrainsForUsersId from 'pages/api/strains/userStrainsForUsersId'
import mineshovelES6 from 'utility/mineshovelES6'
import GETuserstrains from 'utility/GETuserstrains'
import POSTuserstrainsES6 from 'utility/POSTuserstrainsES6'
import digsES6 from 'utility/digsES6'

import Children from 'utility/jqChildren'
import Siblings from 'utility/JqSiblings'

export default function SelectedSearch(props) {
    const [uiHover, setUiHover] = useState('')
    const [searchId, setSearchId] = useState<any>(0)

    let getIDurl = props.getIDurl
    let postMINEurl = props.postMINEurl
    let getALLminesURL = props.getALLminesURL
    const ALLusersGET = props.ALLusersGET
    const userStrainPostUrl = props.userStrainPostUrl
    const DIGSurl = props.digsURL
    
    let allOrMine = styles.allOrMine
    let h1 = styles.h1
    let soClassy:any = [allOrMine, h1].join()
    let findMineMyStrains = props.findMineMyStrains 
    
       const { 
        selectedSearch, searchSelector, searchStrainId, searchstrainidset,
        searchType, usersOfSearchStrain, usersofsearchstrainset, 
        currentUser, currentUserName, currentusernameset, currentuseridset, currentUserId, userstrainset, userStrains, 
        allMyStrains, allmystrainset,
        MineShovelUser, mineshoveluserset, MineShovel, mineshovelset, otherUserMineClick, otherusermineclickset,
        searchMinePost, searchminepostset, searchMineRead, searchminereadpost, 
    myMineReview, myminereviewset, myMineTitle, myminetitleset, allMinesReviews, 
        } = useGame()

    const [saveStrain, setSaveStrain] = useState(selectedSearch)

    useEffect( () => {
        console.log('usersOfSearchStrain in selected search component!')
        console.log(usersOfSearchStrain)
    }, [usersOfSearchStrain])   

    useEffect( () => {             
        const getId = async () => {
            Axios.post(getIDurl, { name: selectedSearch
            }).then( (id) => { return id })}            
    }, [])

    const quicktest = () => {
        console.log("hey from quicktest!")
    }

    const test2 = () => {
        console.log("test2 this is crazy")
    }

    const bypass = () => {
        console.log('bypass at selectedSearch side!')
    }

    const shovel = () => {
        console.log('shovel click')
    }
    let ValueSavingMap = new Map()
    ValueSavingMap.set('selectedSearch', selectedSearch)

    const usernameClick = async (event) => {      
        let preusers:any = await GETuserstrains(ALLusersGET, 'onlyusers')
        let ALLusers = preusers!.data.users
        let target = $(event.target)
        let text = event.target.outerText
        let eventSibs:any = await Siblings(target)

        let premines = await mineshovelES6(getALLminesURL, '', 'GETallmines')
        let ALLmines = premines?.data.allmines

        let filteredUser = ALLusers.filter( user => user.username === text)[0]
        let clickedUserId = filteredUser.id 

        let mineimg = eventSibs![0]
        let shovelimg = eventSibs![1]        
        let mineimgopacity = mineimg.style.opacity
        let shovelimgopacity = shovelimg.style.opacity
        

        let alldigs = await digsES6(DIGSurl, '', 'GETallDIGS')
        let digs = alldigs?.data.alldigs        
            digs.forEach( (likes) => {
                console.log(`likes: ${likes} typeof ${typeof likes}`)
                console.log('likes.userId')
                console.log(likes.userId)
                let userId = likes.userId
                if (userId.toString() === clickedUserId.toString()) {
                        CSS(shovelimg, 'opacity', '1.0')
                }                
            })
        if (mineimgopacity === '0') await CSS(mineimg, 'opacity', '1.0')
        if (mineimgopacity === '1') await CSS(mineimg, 'opacity', '0.0')
        mineshoveluserset(text)
    }

    const onChange = () => { console.log('we are changing the input') }

    const fakesubmit = async () => {        
        let titleinput:any = document.querySelector('#TitleInput')
        let reviewinput:any = document.querySelector('#ReviewInput')
        let valuetitle = titleinput.value
        let titleWithUserId = `${currentUserId}/${valuetitle}`
        let valuereview = reviewinput.value        
        let postobjectDATA = { strainId: searchStrainId, review: valuereview, title: titleWithUserId, usersId: currentUserId };

        console.log('postobjectDATA')
        console.log(postobjectDATA)

        let newminePOST = await mineshovelES6(postMINEurl, postobjectDATA, 'minePOST') 
        searchMinePost === true ? searchminepostset() : ''        
    }

    const mineclick = async (event) => {
        setSaveStrain(selectedSearch)
        let target = $(event.target)
        let siblings = await Siblings(target)
        let ptagsibling:any = siblings![0]
        let usertext = ptagsibling.outerText

        let preusers:any = await GETuserstrains(ALLusersGET, 'onlyusers')
        let ALLusers = preusers!.data.users

        let premines = await mineshovelES6(getALLminesURL, '', 'GETallmines')
        let ALLmines = premines?.data.allmines
        let filteredUser = ALLusers.filter( user => user.username === usertext)[0]
        let clickedUserId = filteredUser.id

        ALLmines.forEach( (mine) => {   
            let looptitle:string = mine!.title
        let userId = looptitle.slice(0, looptitle.indexOf('/'))
            if (userId.toString() === clickedUserId.toString()) {
                if (mine.strainId === searchStrainId) {                    
                    let reviewmatch = mine.review                    
                    // let originalText = selectedSearch
                    let originalValue = ValueSavingMap.get('selectedSearch')                    
                    if (MineShovel === reviewmatch) {
                        if (otherUserMineClick === true) {
                            mineshovelset('')
                        otherusermineclickset()
                        }
                    } else if (MineShovel !== reviewmatch) {
                        if (otherUserMineClick === false)  {
                            mineshovelset(reviewmatch)
                            otherusermineclickset()
                        }}}}})}

    const wannasave = async (event) => {
        let target = $(event.target)
        let targetsiblings = await Siblings($(event.target))
        let sibling = targetsiblings![0]
        CSS(sibling, 'opacity', '1.0')

        let allusers = await GETuserstrains(ALLusersGET, 'onlyusers')
        let users = allusers?.data.users

        let filterusers = users.filter( user => user.id.toString() === currentUserId)[0]        
        let currentuserid = filterusers.id
        
        if (currentuserid.toString() === currentUserId) {
            let UserStrainMap = new Map()
            UserStrainMap.set('usersId', currentuserid)
            await UserStrainMap.set('strain', selectedSearch)
            await UserStrainMap.set('strainsId', 0)
            let newUserStrain = await POSTuserstrainsES6(userStrainPostUrl, UserStrainMap)                        
            mineshovelset('Dig For Gold')
        } else {
            return 
        }        
        let UserSaveMap = new Map()
        let stringid = window.localStorage.getItem('currentUserId')

         setTimeout( () => {
            searchSelector('')
         }, 1000)                
    }

    const nothing = () => {return}

    const otherUserShovelClick = async (event) => {
        
        let preusers:any = await GETuserstrains(ALLusersGET, 'onlyusers')
        let ALLusers = preusers!.data.users
        let newDigMap = new Map()
        
        let currentUserDB = ALLusers.filter( user => user.id.toString() === currentUserId)[0]
        let INTuserID = currentUserDB.id        
        newDigMap.set('userId', INTuserID)
        newDigMap.set('strain', selectedSearch)
        let data = [newDigMap.get('userId'), newDigMap.get('strain')]

        let alldigs = await digsES6(DIGSurl, '', 'GETallDIGS')[0]
            alldigs.forEach( (likes) => {
                console.log(`likes: ${likes} typeof ${typeof likes}`)
                console.log('likes.userId')
                console.log(likes.userId)
                let userId = likes.userId
                if (userId.toString() === INTuserID.toString()) {

                }
                
            })
        
    }

    return (
        <>        
        <div         
        id={styles.SelectedSearchBox} className="Column">
        <div>
                <div className="Row">
                {
                    searchType === 'All'                     
                    ?
                    usersOfSearchStrain.length 
                     ?
                      usersOfSearchStrain.map( (mapitem, idx) => {
                        return (
                            <div key={`column${idx}`} className="Column">                       
                                <img  id="mineimg" onClick={mineclick} style={{ height: '40px', width: '40px', opacity: '0.0', cursor: 'pointer'}} src="/img/mine.png"/>                                                        
                             <p  onClick={otherUserMineClick === false ? usernameClick : nothing } key={idx} 
style={{ color: mapitem === currentUserName ? 'rgb(247, 208, 32)' : 'papayawhip', margin: '0 2em', cursor: mapitem === currentUserName ? 'not-allowed' : 'pointer',
         pointerEvents: mapitem === currentUserName ? 'none' : 'all' }}> {mapitem === currentUserName ? 'me' : mapitem} </p>   
                            <img onClick={otherUserShovelClick} style={{ height: '40px', width: '40px', opacity: '0.0', cursor: 'pointer' }} src="/img/shovel.png"/>                        
                            </div>                                                                                                           
                            )
                    })
                        :
                        <div> </div>
                        :
                        <pre></pre>                        
                    }
                </div>       
                
                {
                    searchType === 'Mine' 
                    ?
                    allMyStrains.map( (mystrain, idx) => {   
                        let straincount = 0;                       
                                if (parseInt(mystrain) === searchStrainId) {            
                                    straincount ++                        
                                return (
                                    <div 
                                    key={`${idx}div`}                                    
                                    className="Column"
                                    >                                                                                             
                                    <img style={{ height: '4em', width: '4em' }} src="/img/gold.png"/>                                    
                                    </div>
                                )                           
                             }                    
                              if (straincount === 0) {
                                <p> straincount</p>
                              }           
                    })                                                    
                    :
                    <pre></pre>
                }          
                    {searchType === 'Mine'
                        ?
                        <div className="Column">
                        {searchMineRead === true 
                            ?
                            <>
                            <p className="myMineText"  style={{ marginTop: '0.4em', display: 'flex', flexDirection: 'column' }}> 
                            <span className="titlespan"> {myMineTitle}  </span>  {myMineReview}  </p>
                            </>
                            :
                        <pre></pre>
                        }                        
                        {searchMinePost === true 
                            ?
                        <form action="/" className="Column">
                        <input id="TitleInput" onChange={onChange} type="text" className="shovelMineInput"/>                    
                        <label className="shovelMineInputLabel" htmlFor="TitleInput"> Title</label>
                        <input id="ReviewInput" style={{ marginTop: '0.25em'}} onChange={onChange} type="text" className="shovelMineInput"/>
                        <label className="shovelMineInputLabel" htmlFor="ReviewInput"> Review </label>
                        <div onClick={fakesubmit} style={{ marginTop: '0.95em' }} className="MiniGoldBar"></div>
                        </form>
                            :
                        <pre></pre>
                        }
                        </div>                            
                        :
                        <pre></pre>
                    }                            
                <h2 onClick={wannasave} style={{ color: 'rgb(247, 208, 36)', boxShadow: '2px 10px 2px rgb(247, 208, 36)', cursor: 'pointer'}}> {MineShovel} </h2>                                                           
             </div>                                       
        </div>
        </>
    )
}
