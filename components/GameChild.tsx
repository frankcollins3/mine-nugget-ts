
import styles from 'styles/game/sass/FamilyTree.module.scss'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useRef } from 'react'
import $ from 'jquery'
import CSS from 'utility/CSStool'
import AttrTool from 'utility/JqAttr'
import Siblings from 'utility/JqSiblings'
import Random from 'utility/Randomizer'

export default function GameChild () {
    
    // const dragStart = async (event) => {
    //     let tgt = $(event.target)           
    //     let siblings:any = await Siblings(tgt)
    //     CSS(siblings, 'opacity', '0.1')
    //     AttrTool(siblings, 'draggable', 'false')            
    //     let pallette = ['orange', 'dodgerblueblue', 'limegreen', 'hotpink', 'indigo,', 'olive']
    //     let randomColor = await Random(pallette)
    // }

    const handleDragStart = (ev) => {
        let elem = ev.target
        if (elem.src.includes('/img/coin.png')) {

            // ev.dataTransfer.setData('text/plain', 'HEY HOW ARE YOU!')            
            // myData.text = obj.textContent?obj.textContent:obj.alt?obj.alt:''; date = JSON.stringify(myData)       
            // obj.setAttribute('data-ts', myData.timestamp);
        }
    }

    const handleDrop = (evt) => {
        console.log("handleDrop!")
        let dropzone = evt.target
        
        if (dropzone.src.includes('img/mine.png')) {
            evt.preventDefault()
            console.log(`DROP: ${evt.dataTransfer}`)
            console.log('our drop zone includes the mine.png')
            
            let transferData = evt.dataTransfer.getData('text/plain')
            console.log('transferData')
            console.log(transferData)

        } else {
            console.log("src !== 'img/mine.png")
            return
        }
    }
        
    
    const dragEnd = async (event) => {
        let tgt = $(event.target)           
        let siblings:any = await Siblings(tgt)
        CSS(tgt, 'opacity', '0.1')
            console.log('event')
            console.log(event)                
        AttrTool(siblings, 'draggable', 'true')  
        setTimeout( () => CSS(siblings, 'opacity', '1.0'), 1000)          
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
        <div className="Column">
        <div className={styles.GameChild}>

            <img
            onDragStart={handleDragStart}
            className={styles.coin} src="img/coin.png"
            draggable="true"        
            />

            <img 
                 className={styles.coin} src="img/coin.png"         
                 draggable="true"      
                 />

            {/* <div className="Column">                 */}

            <img 
                className={styles.coin} src="img/coin.png"      
                draggable="true"      
                />            

            <img
                className={styles.coin} src="img/coin.png"                
                draggable="true"      
                />            
        </div>  

            <img            
            draggable="true" 
            onDrop={handleDrop}
            style={{ borderRadius: '50%', border: '2px solid papayawhip', boxShadow: '10px 10px 10px papayawhip'}}            
            className={styles.mine} src="img/mine.png"/>

        {/* <img style={{ border: '5px solid papayawhip', transform: `scale(0.2)` }} src="/img/mine.png"/> */}
        </div>

        </>
    )
}
