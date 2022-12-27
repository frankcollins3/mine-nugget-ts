
import styles from 'styles/game/sass/FamilyTree.module.scss'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useRef } from 'react'
import $ from 'jquery'
import CSS from 'utility/CSStool'
import AttrTool from 'utility/JqAttr'
import Siblings from 'utility/JqSiblings'
import Random from 'utility/Randomizer'
import { Draggable, Droppable } from 'react-drag-and-drop'

export default function GameChild () {
    
    const handleDragStart = async () => {
        console.log('hello!')

    }

    const handleDrop = () => {
        console.log("okay were dropping")
    }


    return (
        <>
        <div className="Column">
        <div className={styles.GameChild}>

            <Draggable type="coin" data="sourog">
            
            <img
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

            <Droppable types={['coin']} onDrop={() => console.log("hey we are dropping so hard")}>
            <img            
            draggable="true" 
            onDrop={handleDrop}
            style={{ borderRadius: '50%', border: '2px solid papayawhip', boxShadow: '10px 10px 10px papayawhip'}}            
            className={styles.mine} src="img/mine.png"/>
            </Droppable>

        {/* <img style={{ border: '5px solid papayawhip', transform: `scale(0.2)` }} src="/img/mine.png"/> */}
        </div>

        </>
    )
}
