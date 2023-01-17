
import Container from 'react-bootstrap/Container'
import APIcall from 'utility/APIcall'
import {useEffect, useState} from 'react'
import {useGame} from 'Contexts/game'
import Searchdisplay from 'styles/findmine/components/Searchdisplay'



export default function SearchDisplay () {

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

    let strainmap = searchBucket.map( (mapitem) => {
        return (
            <p> {mapitem.strain} </p>
        )
    })

    return (
        <Searchdisplay>
            <h1 onMouseEnter={textenter}> hey whaddya know </h1>
            {strainmap}
            {/* {searchBucket.map( (mapitem) => {
                <p> {mapitem.strain} </p>
            })} */}
        </Searchdisplay>

    )
}
