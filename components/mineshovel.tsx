import { MenuIcon } from '@chakra-ui/react'
import {useGame} from 'Contexts/game'
import $ from 'jquery'
import mineshovelES6 from 'utility/mineshovelES6'


export default function MineShovel (props) {

    const { 
        gameOn, playing, searchHover, findMineTheme, toggleTheme,
        selectedSearch, searchSelector, 
        userStrains, userstrainset, currentuserset, currentUser, currentusernameset, currentuseridset, currentUserName, currentUserId,
        usersOfSearchStrain, usersofsearchstrainset,                       
        MineShovelUser, mineshoveluserset, searchType, searchTypeClick, searchStrainId,

        // state that toggles whether the SelectedSearch will append an input to post a mine or the text of other mines/reviews to read other user data.
        searchMinePost, searchminepostset, searchMineRead, searchminereadpost, 
        myMineReview, myminereviewset, myMineTitle, myminetitleset,  // myMine state that stores the review for a user whose looking at their own data reviews.
      } = useGame()

      const postMINEurl = props.postMINEurl
      const getALLminesURL = props.getALLminesURL;
      const deleteMinesURL = props.deleteMinesURL

    const MineClick = async (event) => {
        if (searchType === 'All') {
            console.log('searchType === All')            
        }            
        if (searchType === 'Mine') {
            console.log('searchType === Mine')     
            console.log("clicking the Mine while searchType is mine")       
            // let postMine = await mineshovelES6(postMINEurl,  )
        }            
    }

    const ShovelClick = (event) => {
        console.log('usersOfSearchStrain in the shovelclick')
        console.log(usersOfSearchStrain)
        console.log(event.target)
        console.log('MineShovelUser')
        console.log(MineShovelUser)
        if (searchType === 'All') {
            console.log('searchType === All')            
        }            
        if (searchType === 'Mine') {
            console.log('searchType === Mine')            
        }            
    }

    const ReadOrWrite = async (event) => {
        console.log('event')
        console.log(event)
        console.log(event.target)
        let imgsrc:string = event.target.src
        console.log('imgsrc')
        console.log(imgsrc)
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

            console.log('currentUserId')
            console.log(currentUserId)

            console.log('searchStrainId')
            console.log(searchStrainId)

            let allMinesForAllUsers = await mineshovelES6(getALLminesURL, '', 'GETallmines')
            let allmines = allMinesForAllUsers?.data.allmines
            let strainReview = allmines.filter( mine => mine.strainId === searchStrainId)
            
            console.log('strainReview from the glasses!')
            console.log(strainReview)

            let review = strainReview[0] ? strainReview[0].review : ''
            let title = strainReview[0] ?  strainReview[0].title : ''
            let AfterSlashIndex:number = title.indexOf('/') + 1
            let titleLen:number = title.length

            let sliceUserFromTitle = title.slice(AfterSlashIndex, titleLen)

            myminereviewset(review)
            myminetitleset(sliceUserFromTitle)
            console.log('review')
            console.log(review)



            const pushMyStrains = () => {

                allmines.forEach( (mine:any) => {
                    let looptitle:string = mine!.title
                    let slashIndex:number = looptitle.indexOf('/')
                    let userId = looptitle.slice(0, slashIndex)
                    console.log('userId')
                    console.log(`userId in loop: ${userId} typeof: ${typeof userId}`)

                    console.log('currentUserId')
                    console.log(`currentUser ${currentUserId} typeof: ${typeof currentUserId}`)
                    if (userId.toString() === currentUserId.toString()) {
                        console.log('this condition is equal!')
                        myStrains.push(mine)
                    }    
                })
            }

            const getMyStrains = () => {
                console.log('myStrains in the getMyStrains')
                console.log(myStrains)
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
            
            const bucketcheck = () => {
                console.log('localmystrains')
                console.log(localmystrains)
                return localmystrains
            }
            
            const bothfunctions = async () => {
                await pushMyMines()
                let myreview = await bucketcheck()
                // let filteredmines = allmines.filter( mine => mine.strainId === searchStrainId)

                console.log('myreview')
                console.log(myreview)

                let deleteMine = await mineshovelES6(deleteMinesURL, myreview, 'DELETEone') // DRY i know. could put in a useEffect and make localstate instead.
                console.log('deleteMine')
                console.log(deleteMine)


                
            }
            bothfunctions()
            
            
            // * pages/api/delete route for MyReviews relative to SearchStrainId            
        }        
    }

    return (
        <div
        //  className="Row"
        style={{
            // display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row',
        }}
        >   

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
                //   margin: '1.25em 1.25em 0 1.25em',
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
                //  margin: '1.25em 1.25em 0 1.25em', 
                 cursor: 'pointer',
                 }} src="/img/shovel.png"/>
            </div>
    )
}
