
import Container from 'react-bootstrap/Container'
import APIcall from 'utility/APIcall'
import {useEffect, useState} from 'react'
import {useGame} from 'Contexts/game'
import Searchdisplay from 'styles/findmine/components/Searchdisplay'
import styles from 'styles/findmine/sass/FindMine.module.scss'
import $ from 'jquery'
import CSS from 'utility/CSStool'
import Children from 'utility/jqChildren'
import Siblings from 'utility/JqSiblings'

import SelectedSearch from 'components/SelectedSearch'




export default function DisplayForSearch () {

    // const [selectedSearch, setSelectedSearch] = useState('')

    const { 
        gameOn, playing, searchHover, searchOn, searchOff, 
        findMineTheme, toggleTheme, searchChar, searchCharFunc,
        searchBucket, fillSearchBucket, selectedSearch, searchSelector
        } = useGame()

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
        let siblings:any = await Siblings($(event.target))
        let children = await Children($(event.target))
        let siblingText:string = siblings[0].outerText        
        searchSelector(siblingText)
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
                id="datatext"
                // onClick={selectFunc}
                 className={styles.p} key={idx}> {mapitem.strain} </p> 
                <div
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
            // * this code triggers the option to search again!
            onMouseLeave={containerleave}
            >
        <Searchdisplay className="Column">                    
            <img className={styles.DisplayCaseCone} src="/img/cone.png"/>
            {/* <div className={ searchBucket.length > 4 ? styles.row : "Column"}> */}
    
            {selectedSearch.length > 1 ?
            <SelectedSearch/>
            :
            strainmap            
            }

            {/* </div> */}
            <img className={styles.DisplayCaseCone} src="/img/cone.png"/>    

            {/* organize this code!  the components before weren't working.          */}
            
            
        </Searchdisplay>
            </Container>

    )
}
