
import Container from 'react-bootstrap/Container'
import APIcall from 'utility/APIcall'
import {useEffect, useState} from 'react'
import {useGame} from 'Contexts/game'
import Searchdisplay from 'styles/findmine/components/Searchdisplay'
import styles from 'styles/findmine/sass/FindMine.module.scss'
import $ from 'jquery'
import CSS from 'utility/CSStool'




export default function DisplayForSearch () {

    const { 
        gameOn, playing, searchHover, hoverOnSearch, 
        findMineTheme, toggleTheme, searchChar, searchCharFunc,
        searchBucket, fillSearchBucket
        } = useGame()

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

    let strainmap = searchBucket.map( (mapitem, idx) => {
    let length = searchBucket.length
        return (                        

            
            
                <div key={`div ${idx}`} className={styles.row}>                
    
                <div 
                // style={{ border: length < 6 ? "none" : "5px solid papayawhip"}}
                className={length < 6 ? "Column" : styles.row} key={`div2 ${idx}`}>    
                <p className={styles.p} key={idx}> {mapitem.strain} </p> 
                <img
                key={`idx & img ${idx}`}                         
                id="shovel"className={styles.Shovel} src="/img/shovel.png"></img>
                </div>    
                
                </div>
            
            
            
        )
    })

    return (
            <Container>
        <Searchdisplay>                    
            <img className={styles.DisplayCaseCone} src="/img/cone.png"/>
            {strainmap}
            <img className={styles.DisplayCaseCone} src="/img/cone.png"/>            
            {/* {searchBucket.map( (mapitem) => {
                <p> {mapitem.strain} </p>
            })} */}
        </Searchdisplay>
            </Container>

    )
}
