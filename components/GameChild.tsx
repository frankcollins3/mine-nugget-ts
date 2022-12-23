import styles from 'styles/game/sass/FamilyTree.module.scss'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useRef } from 'react'
import $ from 'jquery'
import CSS from 'utility/CSStool'
import AttrTool from 'utility/JqAttr'
 

export default function GameChild () {

    const dragStart = async (event) => {
        console.log("hey were dragging something")
    }

    const dragEnd = async (event) => {
        console.log('event')
        console.log(event)
        let tgt = $(event.target)
        CSS(tgt, 'opacity', '0.1')
        AttrTool(tgt, 'draggable', 'false')
    }

            

    const allowDrop = (ev) => {        
        ev.preventDefault()
    }

    function drop(ev) {
        console.log("we are dropping!")
        
        console.log('ev and dataTransfer')
        console.log(ev)
        console.log(ev.dataTransfer)
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
      }

    return (
        <>
        {/* <div className="Column"> */}
        <div className={styles.GameChild}>

            <img
            className={styles.coin} src="img/coin.png"
            onDrop={drop}
            onDragEnd={dragEnd}
            draggable="true"        
            />

            <img className={styles.coin} src="img/coin.png"/>
            <div className="Column">
            <img
            onDrop={drop}
            onDragEnd={dragEnd}
            draggable="true" 
             style={{ borderRadius: '50%', border: '2px solid papayawhip', boxShadow: '10px 10px 10px papayawhip'}}            
             className={styles.coin} src="img/mine.png"/>

            </div>    
            <img className={styles.coin} src="img/coin.png"/>            
            <img className={styles.coin} src="img/coin.png"/>            
        </div>  
        {/* <img style={{ border: '5px solid papayawhip', transform: `scale(0.2)` }} src="/img/mine.png"/> */}
        {/* </div> */}

        </>
    )
}
