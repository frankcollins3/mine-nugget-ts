
import styles from 'styles/game/sass/FamilyTree.module.scss'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useRef, useState, useEffect } from 'react'
import $ from 'jquery'
import CSS from 'utility/CSStool'
import AttrTool from 'utility/JqAttr'
import Siblings from 'utility/JqSiblings'
import Random from 'utility/Randomizer'
import { Draggable, Droppable } from 'react-drag-and-drop'

import Family from 'utility/familyJS'

export default function GameChild () {

    const [coin1, setCoin1] = useState(false)
    const [coin2, setCoin2] = useState(false)
    const [coin3, setCoin3] = useState(false)
    const [coin4, setCoin4] = useState(false)
    
    const handleDragStart = async (event) => {
        console.log('hello!')
        let target = event.target        
        console.log( $(target).siblings() )
        // $(target).css('border', '10px solid pink')
        let parents = await Family(target, 'parents')                
        if (parents) {
            
            let dragParent = parents[0]
            let familytype = parents[0].attributes
            if (familytype[0].textContent === 'notcoin') {

            } else {
                console.log("hey the type is coin")
                setCoin1(true)
                AttrTool(dragParent, 'type', 'notcoin')
                AttrTool(dragParent, 'data', 'nice one')
                await CSS(target, 'opacity', '0.1')
            }
            console.log('familytype')
            console.log(familytype)
        }

    }

    const nativeDrop = async (event) => {        

    }

    const handleDrop = async (event) => {
        console.log("okay were dropping")
        console.log('event')
        console.log(event)
        console.log(event.target)                
    }


    return (
        <>
        <div className="Column">
        <div className={styles.GameChild}>

            <Draggable type={coin1 === false ? "coin" : "notcoin"} data="sourog">     
            <img
            id="coin1"
            draggable="true"
            onDragStart={handleDragStart}         
            className={styles.coin} src="img/coin.png" 
            />
            </Draggable>

            <Draggable type={coin2 === false ? "coin" : "notcoin"} data="sourog">     
            <img
            id="coin2"
            draggable="true"
            onDragStart={handleDragStart}         
            className={styles.coin} src="img/coin.png" 
            />
            </Draggable>
            
            <Draggable type={coin3 === false ? "coin" : "notcoin"} data="sourog">     
            <img
            id="coin3"
            draggable="true"
            onDragStart={handleDragStart}         
            className={styles.coin} src="img/coin.png" 
            />
            </Draggable>

            <Draggable type={coin4 === false ? "coin" : "notcoin"} data="sourog">     
            <img
            id="coin4"
            draggable="true"
            onDragStart={handleDragStart}         
            className={styles.coin} src="img/coin.png" 
            />
            </Draggable>

     
        </div>  

            <Droppable types={['coin']} onDrop={handleDrop}>
            <img            
            draggable="true" 
            // onDrop={handleDrop}
            style={{ borderRadius: '50%', border: '2px solid papayawhip', boxShadow: '10px 10px 10px papayawhip'}}            
            className={styles.mine} src="img/mine.png"/>
            </Droppable>

        {/* <img style={{ border: '5px solid papayawhip', transform: `scale(0.2)` }} src="/img/mine.png"/> */}
        </div>

        </>
    )
}
