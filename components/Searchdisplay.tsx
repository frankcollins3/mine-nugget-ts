
import Container from 'react-bootstrap/Container'
import APIcall from 'utility/APIcall'
import {useEffect, useState} from 'react'
import {useGame} from 'Contexts/game'
import Searchdisplay from 'styles/findmine/components/Searchdisplay'
import styles from 'styles/findmine/sass/FindMine.module.scss'
import $ from 'jquery'
import CSS from 'utility/CSStool'
import SelectedSearch from 'components/SelectedSearch'




export default function DisplayForSearch () {

    const [selectedSearch, setSelectedSearch] = useState('')

    const { 
        gameOn, playing, searchHover, searchOn, searchOff, 
        findMineTheme, toggleTheme, searchChar, searchCharFunc,
        searchBucket, fillSearchBucket
        } = useGame()

    let searchCount:any = searchBucket.length

    const textenter = () => {
        console.log('searchBucket')
        console.log(searchBucket)
        console.log('enter the text')
    }

    const shovelhover = (event) => {
        console.log('shovelhover')
        let target = $(event.target)
        $(event.target).css('border', '2px solid orange')
        CSS(target, 'border', '2px solid papayahwip')
    }
    const shovelhover2 = (event) => {
        console.log('shovelhover2 other function')
        // CSS($(event.target), 'border', '2px solid transparent')
        $(event.target).css('border', '2px solid none')
        // CSS($(event.target), 'border', '2px solid transparent')
    }

    const selectFunc = async () => {
        console.log("firing the select funct")
        await setSelectedSearch('we fired it')
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
                {/* <img
                className={styles.MiniGoldBar}
                key={`idx & img ${idx}`}                         
                src="/img/gold.png"
                /> */}
                
                </div>    
                
                </div>
            
            
            
        )
    })


    return (
            <Container>
        <Searchdisplay>                    
            <img className={styles.DisplayCaseCone} src="/img/cone.png"/>
            {/* <div className={ searchBucket.length > 4 ? styles.row : "Column"}> */}
            {strainmap}
            {selectedSearch.length > 1 ?
            <p> wow real text this time </p>
            :
            <p>'less than one'</p>            
            }
    

            {/* </div> */}
            <img className={styles.DisplayCaseCone} src="/img/cone.png"/>            
            
        </Searchdisplay>
            </Container>

    )
}
