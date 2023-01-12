import styles from 'styles/findmine/sass/FindMine.module.scss'
import Container from 'react-bootstrap/Container'
import { useState, useEffect } from 'react'
import $ from 'jquery'

import store from 'redux/store'
import { useDispatch } from "react-redux";
import customReduxSelector from 'redux/reduxselector'
import {connect} from 'react-redux';
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import {Provider} from 'react-redux';

let reduxstore = store.getState()

export default function Magnify () {
    let style = ["style1", "style3", "style4"];
    let tam = ["tam1", "tam1", "tam1", "tam2", "tam3"];
    let opacity = ["opacity1", "opacity1", "opacity1", "opacity2", "opacity2", "opacity3"];

    const [hover, setHover] = useState(false)
    const [reduxBucket, setReduxBucket] = useState([])

    useEffect( () => {
        console.log('reduxstore from the useEffect')
        let gameReducer = reduxstore.gameReducer
        console.log(reduxstore.gameReducer)
        setReduxBucket(gameReducer)
    }, [])

    

        // let reduxstate = useSelector(state => state)
        // console.log(reduxstate)

    
    
    


  
    function getRandomArbitrary(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
  
    let sparkle = "";
    let numsparkles = 500;
         
    useEffect( () => {
        let night = $('.constellation')[0]
        // pageparents.css('overflow', 'hidden')
        
        // let height:number = parseInt($('#Cont').width().toFixed())
        // let width:number = parseInt($('#Cont').width().toFixed())

        night.innerHTML = sparkle;
        let widthWindow = 150;
        let heightWindow = 150;
        for (let i = 0; i < numsparkles; i++) {
          sparkle += "<span class='sparkle " + style[getRandomArbitrary(0, 4)] + " " + opacity[getRandomArbitrary(0, 6)] + " "
          + tam[getRandomArbitrary(0, 5)] + "' style='animation-delay: ." +getRandomArbitrary(0, 9)+ "s; left: "
          + getRandomArbitrary(0, widthWindow) + "px; top: " + getRandomArbitrary(0, heightWindow) + "px;'></span>";
        }
    }, [])

    const stateHandler = () => {
        console.log('reduxBucket from the hover function')
        console.log(reduxBucket)
    }

    return (
        <>        
        <div id="Cont" onMouseEnter={stateHandler} onMouseLeave={() => setHover(false)}
        // <div id="Cont" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
         className={styles.MagnifyCont}>                          
            <div style={{ display: hover === true ? 'none' : 'flex'}} className="night">
                <div  style={{ display: hover === true ? 'none' : 'flex'}}  className="constellation">
                </div>
            </div>
        </div>
            
        
        {/* </Container> */}
        {/* </div>             */}
        </>        
    )
}
