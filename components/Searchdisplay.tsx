
import Container from 'react-bootstrap/Container'
import {useEffect, useState} from 'react'
import Searchdisplay from 'styles/findmine/components/Searchdisplay'
import styles from 'styles/findmine/sass/FindMine.module.scss'
import $ from 'jquery'

import {useGame} from 'Contexts/game'
import {useUrl} from 'Contexts/Url'

// * Components
import SelectedSearch from 'components/SelectedSearch'

// * utility function
import APIcall from 'utility/APIcall'
import CSS from 'utility/CSStool'
import Children from 'utility/jqChildren'
import Siblings from 'utility/JqSiblings'
import GETuserstrains from 'utility/GETuserstrains'


export default function DisplayForSearch (props) {

    // const [selectedSearch, setSelectedSearch] = useState('')

    const { 
        gameOn, playing, searchHover, searchOn, searchOff, 
        findMineTheme, toggleTheme, searchChar, searchCharFunc,
        searchBucket, fillSearchBucket, selectedSearch, searchSelector, searchType, searchTypeClick, searchStrainId, searchstrainidset, 
        usersOfSearchStrain, usersofsearchstrainset, // usersId data that belongs to the currently selected strain from FindMine.tsx
        userStrains, userstrainset, // all usersStrains: every {strainsId: int usersId: int} 
        allMyStrains, allmystrainset,    // all MyStrains: Associative UsersStrains data that belongs to the currentUser triggered in the [ctrl-F LoginData] from [/LoginLogout.tsx]
        
        // state that toggles whether the SelectedSearch will append an input to post a mine or the text of other mines/reviews to read other user data.
        searchMinePost, searchminepostset, searchMineRead, searchminereadpost, 
        
        noMineShovel, nomineshovelset,

        } = useGame()

    let absoluteURLpath = props.localURL

    const getIDurl = props.getIDurl
    const usernamesForID = props.usernamesForID    
    let searchCount:any = searchBucket.length

    const shovelhover = (event) => {
        let target = $(event.target)
        $(event.target).css('border', '2px solid orange')
        CSS(target, 'border', '2px solid papayahwip')
    }
    const shovelhover2 = (event) => {        
        $(event.target).css('border', '2px solid none')        
    }

    const selectFunc = async (event) => {        
        console.log('firing selectFunc')
        let siblings:any = await Siblings($(event.target))
        let children = await Children($(event.target))
        let siblingText:string = siblings[0].outerText  
        let dataArg = `getID${siblingText}`
        let textStrainId = await GETuserstrains(getIDurl, dataArg)      
        let id = textStrainId?.data.id        

        console.log('textStrainId')
        console.log(textStrainId)
        console.log(`id: ${id} typeof: ${typeof id}`)
        console.log(typeof textStrainId)

        console.log('allMyStrains')
        console.log(allMyStrains)
        
        allMyStrains.includes(id.toString) ?  '' : nomineshovelset('')

        if (searchMinePost === true) searchminepostset()
        if (searchMineRead === true) searchminereadpost()

        

        let usernamesFromID = await GETuserstrains(usernamesForID, textStrainId)
        let usernames = usernamesFromID!.data.usernames        
        searchstrainidset(id)   
        searchSelector(siblingText)
        usersofsearchstrainset(usernames)


    }

    let strainmap = searchBucket.map( (mapitem, idx) => {        
    let length = searchBucket.length
    
        return (                                    
                <div key={`div ${idx}`} 
                // style={{ border: searchBucket.length > 4 ? "5px solid orange" : "5px solid white"}}
                className={searchBucket.length > 4 ? styles.row : "Column"}
                >                
                <div                 
                className={"Column"}
                 key={`div2 ${idx}`}
                >                    
                <p 
                style={{ margin: '0 1em'}}
                id="datatext"
                // onClick={selectFunc}
                 className={styles.p} key={idx}> {mapitem.strain} </p> 
                <div
                style={{
                    cursor: 'pointer'
                }}
                onClick={selectFunc}
                className={styles.MiniGoldBar}
                key={`idx & img ${idx}`}                         
                // src="/img/gold.png"
                >
                
                </div>
                
                </div>    
                
                </div>
        )
    })

    const shoveltest = () => {
        console.log("shovel test")
    }

    const containerleave = () => {
        searchSelector('')
    }

    return (
            <Container
            >
        <Searchdisplay 
        style={{
            // display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap',
            //  placeContent: 'center',
            width: '50vw'
        }}
        className="searchDisplay"
        >                    
        
        {/* <Searchdisplay className="Column">                     */}
            <img className={styles.DisplayCaseCone} src="/img/cone.png"/>    
            {strainmap}         
            <img className={styles.DisplayCaseCone} src="/img/cone.png"/>   
        </Searchdisplay>
        {/* <p style={{ color: 'papayawhip'}}> {searchStrainId} </p> */}
            
            
            </Container>

    )
}
