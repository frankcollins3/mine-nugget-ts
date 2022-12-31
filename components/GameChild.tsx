
import styles from 'styles/game/sass/FamilyTree.module.scss'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useRef, useState, useEffect } from 'react'
import $ from 'jquery'
import CSS from 'utility/CSStool'
import AttrTool from 'utility/JqAttr'
import Siblings from 'utility/JqSiblings'
import Random from 'utility/Randomizer'
import Regex from 'utility/MasterRegex'
import ReturnRight from 'utility/ReturnRight'
import { Draggable, Droppable } from 'react-drag-and-drop'

import Family from 'utility/familyJS'
import { propTypes } from 'react-bootstrap/esm/Image'

export default function GameChild (props) {

    const [coin1, setCoin1] = useState(false)
    const [coin2, setCoin2] = useState(false)
    const [coin3, setCoin3] = useState(false)
    const [coin4, setCoin4] = useState(false)
    const [yesNumber, setYesNumber] = useState(0)

    // let i:number = 0
    let numbers:number[] = [1, 2, 3, 4]
    const [text, setText] = useState('')

    useEffect( () => {
        (async() => {
            let randomnumber:number = await Random(numbers)
            setYesNumber(randomnumber)
            console.log('randomnumber')
            console.log(randomnumber)
        })()

    }, [])
    
    const handleDragStart = async (event) => {
        let target = event.target        
        let targetid = event.target.id
        // $(target).css('border', '10px solid pink')        
        let parents = await Family(target, 'parents')                
        
        if (parents) {            
            let dragParent = parents[0]
            let familytype = parents[0].attributes
            let coinid = await Regex(targetid, 'numreturn')
            console.log('coinid')
            console.log(coinid)
            if (familytype[0].textContent === 'notcoin') {

            } else {
                console.log("hey the type is coin")

                if (targetid === 'coin1') {
                    await setCoin1(true)       
                    // ReturnRight()             
                }


                if (targetid === 'coin2') setCoin2(true)
                if (targetid === 'coin3') setCoin3(true)
                if (targetid === 'coin4') setCoin4(true)
                
                await AttrTool(dragParent, 'type', 'notcoin')
                await AttrTool(dragParent, 'data', '')                
                await CSS(target, 'opacity', '0.1')
                setText('ayee')
                
            }            
        }
    }

    const nativeDrop = async (event) => {        

    }

    const handleDrop = async (event) => {        

    }

    const mineclick = async () => {
        console.log('mine click')
        props.setCactusHover(false)
    }


    return (
        <>
        <div className="Column">
        <div className={styles.GameChild}>

            {/* <Draggable type={"coin"} data="sourog">      */}
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

            <h6
            style={{ color: 'papayawhip', letterSpacing: '0.75em'}}        
            > you picked {text}  </h6>

            <Droppable types={['coin']} onDrop={handleDrop}>
            <img            
            draggable="true" 
            onClick={mineclick}
            // onDrop={handleDrop}
            style={{ borderRadius: '50%', border: '2px solid papayawhip', boxShadow: '10px 10px 10px papayawhip'}}            
            className={styles.mine} src="img/mine.png"/>
            </Droppable>

            <button onClick={() => console.log(yesNumber)} />

            


        {/* <img style={{ border: '5px solid papayawhip', transform: `scale(0.2)` }} src="/img/mine.png"/> */}
        </div>

        </>
    )
}
