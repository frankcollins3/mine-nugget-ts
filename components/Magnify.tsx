import styles from 'styles/findmine/sass/FindMine.module.scss'
import Container from 'react-bootstrap/Container'
import { useState, useEffect } from 'react'
import $ from 'jquery'

export default function Magnify () {
    let style = ["style1", "style3", "style4"];
    let tam = ["tam1", "tam1", "tam1", "tam2", "tam3"];
    let opacity = ["opacity1", "opacity1", "opacity1", "opacity2", "opacity2", "opacity3"];
  
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
        let widthWindow = window.innerWidth
        let heightWindow = window.innerHeight;
        for (let i = 0; i < numsparkles; i++) {
          sparkle += "<span class='sparkle " + style[getRandomArbitrary(0, 4)] + " " + opacity[getRandomArbitrary(0, 6)] + " "
          + tam[getRandomArbitrary(0, 5)] + "' style='animation-delay: ." +getRandomArbitrary(0, 9)+ "s; left: "
          + getRandomArbitrary(0, widthWindow) + "px; top: " + getRandomArbitrary(0, heightWindow) + "px;'></span>";
        }
    }, [])

    return (
        <>
        {/* <div className={styles.div}> */}
        {/* <img src="/img/helmet.png" className={helmet} ></img>
        <img src="/img/barrier.png" className={barrier}></img>             */}
        {/* <Container> */}
        
        <div id="Cont" className={styles.MagnifyCont}>
            <div className="night">
                <div className="constellation"></div>
            </div>
        </div>
        
        {/* </Container> */}
        {/* </div>             */}
        </>        
    )
}