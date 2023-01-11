import Page from 'styles/findmine/components/Searchpage'
import styles from 'styles/findmine/sass/FindMine.module.scss'
import Helmet from 'components/Helmet'
import Magnify from 'components/Magnify'
import { useState, useEffect } from 'react'
import $ from 'jquery'
// components/Helmet.tsx

function FindMine () {
    var style = ["style1", "style3", "style4"];
    var tam = ["tam1", "tam1", "tam1", "tam2", "tam3"];
    var opacity = ["opacity1", "opacity1", "opacity1", "opacity2", "opacity2", "opacity3"];
  
    function getRandomArbitrary(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
  
    var sparkle = "";
    var numsparkles = 500;
         
    useEffect( () => {
        var night = $('.constellation')[0]
        // pageparents.css('overflow', 'hidden')
        night.innerHTML = sparkle;
        var widthWindow = window.innerHeight
        var heightWindow = window.innerWidth;
        for (var i = 0; i < numsparkles; i++) {
          sparkle += "<span class='sparkle " + style[getRandomArbitrary(0, 4)] + " " + opacity[getRandomArbitrary(0, 6)] + " "
          + tam[getRandomArbitrary(0, 5)] + "' style='animation-delay: ." +getRandomArbitrary(0, 9)+ "s; left: "
          + getRandomArbitrary(0, widthWindow) + "px; top: " + getRandomArbitrary(0, heightWindow) + "px;'></span>";
        }
    }, [])

    return (
        <Page>
                        <div className="night">
		<div className="constellation">
        </div>
        </div>


        <div className={styles.row}>        
        <Helmet/>
        <Magnify/>
        </div>

        <div className="Row">
            <h1 className={styles.h1}> Find </h1>
            <img src="/img/mine.png"/>
            <h1 className={styles.h1}> Mine </h1>         
        </div>
        
        {/* <h1 style={{ color: 'papayawhip', fontFamily: 'papyrus' }}> Find Mine </h1> */}'


            <div className="night">
		<div className="constellation">
        </div>
        </div>


        </Page>
    )
}
export default FindMine

