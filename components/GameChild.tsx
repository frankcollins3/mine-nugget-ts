
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
    
    const handleDragStart = async (event) => {
        console.log('hello!')
        let target = event.target        
        console.log( $(target).siblings() )
        // $(target).css('border', '10px solid pink')
        let parents = await Family(target, 'parents')                
        if (parents) {
            console.log('if parents')
            console.log(parents[0].attributes)
            let dragParent = parents[0]
            let familytype = parents[0].attributes
            if (familytype[0].textContent === 'notcoin') {
                      console.log("hey the type is notcoin")
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
            draggable="true"
            onDragStart={handleDragStart}         
            className={styles.coin} src="img/coin.png" 
            />
            </Draggable>

            <img 
                 className={styles.coin} src="img/coin.png"
                 />

            {/* <div className="Column">                 */}

            <img 
                className={styles.coin} src="img/coin.png" 
                />            

            <img
                className={styles.coin} src="img/coin.png" 
                />            
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
