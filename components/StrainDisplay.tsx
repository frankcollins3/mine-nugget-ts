
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
        searchBucket, fillSearchBucket, selectedSearch, searchSelector, searchType, searchTypeClick, userStrains, searchStrainId, searchstrainidset, 
        usersOfSearchStrain, usersofsearchstrainset,
        } = useGame()

    let absoluteURLpath = props.localURL

    const getIDurl = props.getIDurl
    const usernamesForID = props.usernamesForID
    console.log('usernamesForID in the searchdisplay!')
    console.log(usernamesForID)

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
        console.log('dataArg')
        console.log(dataArg)

        // all usernames for strainId
        let textStrainId = await GETuserstrains(getIDurl, dataArg)      
        console.log('textStrainId')
        console.log(textStrainId)
        let usernamesFromID = await GETuserstrains(usernamesForID, textStrainId)
        let usernames = usernamesFromID!.data.usernames
        console.log('usernamesFromID')
        console.log(usernamesFromID)
        let id = textStrainId?.data.id
        console.log('id from selectFUnc!')
        console.log(id)
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
