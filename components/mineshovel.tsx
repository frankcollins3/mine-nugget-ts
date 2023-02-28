import {useGame} from 'Contexts/game'
import $ from 'jquery'

import mineshovelES6 from 'utility/mineshovelES6'
import digsES6 from 'utility/digsES6'
import GETuserstrains from 'utility/GETuserstrains'
import CSS from 'utility/CSStool'

export default function MineShovel (props) {

    const { 
        gameOn, playing, searchHover, findMineTheme, toggleTheme,
        selectedSearch, searchSelector, 
        userStrains, userstrainset, currentuserset, currentUser, currentusernameset, currentuseridset, currentUserName, currentUserId,
        usersOfSearchStrain, usersofsearchstrainset,                       
        MineShovelUser, mineshoveluserset, searchType, searchTypeClick, searchStrainId,
        searchMinePost, searchminepostset, searchMineRead, searchminereadpost, 
        myMineReview, myminereviewset, myMineTitle, myminetitleset,  // myMine state that stores the review for a user whose looking at their own data reviews.
        allMinesReviews,
    } = useGame()

      const postMINEurl = props.postMINEurl
      const getALLminesURL = props.getALLminesURL;
      const deleteMinesURL = props.deleteMinesURL;
      const digsURL = props.digsURL;
      const ALLusersGET = props.ALLusersGET

    const MineClick = async (event) => {
        if (searchType === 'All') {
            console.log('searchType === All')            
        }            
        if (searchType === 'Mine') {
            console.log('searchType === Mine')     
            console.log("clicking the Mine while searchType is mine")       
        }            
    }
    
    const ShovelClick = async (event) => {
        $(event.target)
        .animate({
            height: '45px'
        },200)
        .animate({
            height: '50px',
            border: `rgb(247, 208, 32)`,
        },200)
        .animate({
            height: '55px'
        },200)
        .animate({
            height: '50px'
        },200)
        .animate({
            height: '45px',
        },200)
        .animate({
            height: '40px',
            border: 'none',
        },200)

        if (searchType === 'Mine') {        
        let preusers:any = await GETuserstrains(ALLusersGET, 'onlyusers')
        let ALLusers = preusers!.data.users
        let newDigMap = new Map()
        
        let currentUserDB = ALLusers.filter( user => user.id.toString() === currentUserId)[0]
        let INTuserID = currentUserDB.id
        
        newDigMap.set('userId', INTuserID)
        newDigMap.set('strain', selectedSearch)
        let data = [newDigMap.get('userId'), newDigMap.get('strain')]

        let digpost = await digsES6(digsURL, data, 'POSTnewDIGS')     
    }            
}
        
    const ReadOrWrite = async (event) => {        
        let imgsrc:string = event.target.src
        let srcLen:number = imgsrc.length
        let localSrc = imgsrc.slice(imgsrc.lastIndexOf('/') + 1, srcLen - 4)
        let id = event.target.id
        let myStrains:any = []
        
        if (id === 'edit') {                        
            if (searchMineRead === true) searchminereadpost()
            searchminepostset()
        }
        if (id === 'glasses') {
            if (searchMinePost === true) searchminepostset()

            let allMinesForAllUsers = await mineshovelES6(getALLminesURL, '', 'GETallmines')
            let allmines = allMinesForAllUsers?.data.allmines
            let strainReview = allmines.filter( mine => mine.strainId === searchStrainId)
                        
            const pushMyStrains = () => {                         
                allmines.forEach( (mine:any) => {
                    let looptitle:string = mine!.title
                    let slashIndex:number = looptitle.indexOf('/')
                    let userId = looptitle.slice(0, slashIndex) 
                    let AfterSlashIndex:number = mine.title.indexOf('/') + 1
                    let titleLen:number = mine.title.length
                    let sliceUserFromTitle = mine.title.slice(AfterSlashIndex, titleLen)                                        
                        if (userId.toString() === currentUserId.toString()) {                            
                            myStrains.push(mine)
                        }    
                    })               
                }
                
                const getMyStrains = () => {
                    myStrains.length 
                    // * this ternary code right here might cause problems! To fix data.forEach definition errors have some seeder data! 
                            ?
                    myStrains.forEach( (strain) => {
                        let looptitle:string = strain!.title
                        let slashIndex:number = looptitle.indexOf('/')
                    let userId = looptitle.slice(0, slashIndex)
                    let AfterSlashIndex:number = strain.title.indexOf('/') + 1
                    let titleLen:number = strain.title.length
                    let sliceUserFromTitle = strain.title.slice(AfterSlashIndex, titleLen)
                    // strain.id === searchStrainId ?                    
                    if (strain.strainId === searchStrainId ) {
                        console.log(`strainId: ${strain.strainId} ${typeof strain.strainId} searchStrain ${searchStrainId} ${typeof searchStrainId}`)
                            myminereviewset(strain.review)
                            myminetitleset(sliceUserFromTitle)
                    }                    
                })
                          :
                         ( () => {
                            CSS($('#edit'), 'box-shadow', '3px 3px 3px rgb(247, 208, 32);')
                            setTimeout( () => CSS($('#edit'), 'box-shadow', ''))
                         })()
            }
            
            const strainfunctions = async () => {
                await pushMyStrains()
                await getMyStrains()
            }
            strainfunctions()

            searchminereadpost()

        }
        if (id === 'eraser') {
            let allMinesForAllUsers = await mineshovelES6(getALLminesURL, '', 'GETallmines') // DRY i know. could put in a useEffect and make localstate instead.
            let allmines = allMinesForAllUsers!.data.allmines
            let localmystrains:any = []
            
            const pushMyMines = async () => {
                await allmines.forEach( (mine) => {
                    let looptitle:string = mine!.title
                    let slashIndex:number = looptitle.indexOf('/')
                    let userId = looptitle.slice(0, slashIndex)
                    if (userId.toString() === currentUserId.toString()) {
                        if (mine.strainId === searchStrainId) {
                            myminetitleset('')
                            myminereviewset('')
                            let dataobject = {
                                usersId: userId,
                                strainId: mine.strainId,
                                review: mine.review
                            }
                            localmystrains.push(dataobject)
                        }
                    }
                })
            }
            
            const bucketcheck = () => { return localmystrains }
            
            const bothfunctions = async () => {
                await pushMyMines()
                let myreview = await bucketcheck()                
                let deleteMine = await mineshovelES6(deleteMinesURL, myreview, 'DELETEone') // DRY i know. could put in a useEffect and make localstate instead.
                // * delete all that works but isn't needed as far as I can see.                                 
            }
            bothfunctions()                    
            // * pages/api/delete route for MyReviews relative to SearchStrainId            
        }        
    }

    return (
        <div>                       
                {searchType === 'Mine' 
                        ?
                <div className="Row">
                <img id="edit" onClick={ReadOrWrite} className="readWriteErase" src="/img/edit.png"/>
                <img id="glasses" onClick={ReadOrWrite} className="readWriteErase" src="/img/glasses.png"/>
                <img id="eraser" onClick={ReadOrWrite} className="readWriteErase" src="/img/eraser.png"/>
                </div>       
                        :
                <pre></pre>
                }

            <img onClick={MineClick}  
            style={{
                 height: '50px', width: '50px',
                   boxShadow: '5px 3px 4px papayawhip', borderRadius: '50%',
                 cursor: 'pointer'
            }} src="/img/mine.png"/>

            <h1 style={{
                color: 'papayawhip', textAlign: 'center', marginTop: '0.25em'
            }}> 
            {selectedSearch} </h1>

            <img onClick={ShovelClick}
              style={{
                 height: '50px', width: '65px', 
                 display: searchType === 'Mine' ? '' : 'none',
                 cursor: 'pointer',
                 }} src="/img/shovel.png"/>
            </div>
    )
}
