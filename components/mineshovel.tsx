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
      } = useGame()

      const postMINEurl = props.postMINEurl

    const MineClick = async (event) => {
        console.log('usersOfSearchStrain in the MineCLick!')
        console.log(usersOfSearchStrain)
        console.log(event.target)
        console.log('MineShovelUser')
        console.log(MineShovelUser)

        console.log('currentUser')
        console.log(currentUser)

        console.log('currentUserName')
        console.log(currentUserName)

        console.log('currentUserId')
        console.log(currentUserId)

        console.log('searchStrainId')
        console.log(searchStrainId)


        if (searchType === 'All') {
            console.log('searchType === All')            
        }            
        if (searchType === 'Mine') {
            console.log('searchType === Mine')     
            console.log("clicking the Mine while searchType is mine")       
            let postMine = await mineshovelES6(postMINEurl, )
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

    const ReadOrWrite = (event) => {
        console.log('event')
        console.log(event)
        console.log(event.target)
        let imgsrc:string = event.target.src
        console.log('imgsrc')
        console.log(imgsrc)
        let srcLen:number = imgsrc.length
        let localSrc = imgsrc.slice(imgsrc.lastIndexOf('/') + 1, srcLen - 4)
        // let imgIcon = imgsrc.slice(5, srcLen - 4)
        console.log('localSrc')
        console.log(localSrc)
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
                <img onClick={ReadOrWrite} className="readWriteErase" src="/img/edit.png"/>
                <img onClick={ReadOrWrite} className="readWriteErase" src="/img/glasses.png"/>
                <img onClick={ReadOrWrite} className="readWriteErase" src="/img/eraser.png"/>
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