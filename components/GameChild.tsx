import styles from 'styles/game/sass/FamilyTree.module.scss'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useRef } from 'react'
 

export default function GameChild () {

    const dragStart = async () => {
        console.log("hey were dragging something")
    }

    // possibly using useRef to distinguish the coin that will have the 
    // hover on the coin and the label will say what strain it is in small text. then drag and it makes the coin disappear.

    return (
        <>
        {/* <div className="Column"> */}
        <div className={styles.GameChild}>
            <img draggable="true" onDragStart={dragStart}className={styles.coin} src="img/coin.png"/>
            <img className={styles.coin} src="img/coin.png"/>
            <div className="Column">
            <img
             style={{ borderRadius: '50%', border: '2px solid papayawhip', boxShadow: '10px 10px 10px papayawhip'}}
            //  border-radius: 50%;
            //  border: 2px solid papayawhip;
            //  box-shadow: 10px 10px 10px papayawhip;
             className={styles.coin} src="img/mine.png"/>
             {/* <h1> ayoo</h1> */}
            </div>    
            <img className={styles.coin} src="img/coin.png"/>            
            <img className={styles.coin} src="img/coin.png"/>            
        </div>  
        {/* <img style={{ border: '5px solid papayawhip', transform: `scale(0.2)` }} src="/img/mine.png"/> */}
        {/* </div> */}

        </>
    )
}
