import styles from 'styles/findmine/sass/FindMine.module.scss'
import Container from 'react-bootstrap/Container'
import { useState, useEffect } from 'react'
import $ from 'jquery'
import {useUrl} from 'Contexts/Url'
import {useGame} from 'Contexts/game'
// let hoverstring:string = magnifyhover.toString()


export default function Magnify (props) {
    let style = ["style1", "style3", "style4"];
    let tam = ["tam1", "tam1", "tam1", "tam2", "tam3"];
    let opacity = ["opacity1", "opacity1", "opacity1", "opacity2", "opacity2", "opacity3"];
    let theme:string = props.findMineTheme

    const { allStrain, getSpecifiedStrain, userStrainPost } = useUrl()  //obj destructuring
    const { gameOn, playing, searchHover, hoverOnSearch, findMineTheme, toggleTheme  } = useGame()

    const [hover, setHover] = useState(false)
    const [reduxBucket, setReduxBucket] = useState([])

    // * redux
    
    function getRandomArbitrary(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
  
    let sparkle = "";
    let numsparkles = 500;
         
    useEffect( () => {
        let night = $('.constellation')[0]
        
        night.innerHTML = sparkle;
        let widthWindow = 150;
        let heightWindow = 150;
        for (let i = 0; i < numsparkles; i++) {
          sparkle += "<span class='sparkle " + style[getRandomArbitrary(0, 4)] + " " + opacity[getRandomArbitrary(0, 6)] + " "
          + tam[getRandomArbitrary(0, 5)] + "' style='animation-delay: ." +getRandomArbitrary(0, 9)+ "s; left: "
          + getRandomArbitrary(0, widthWindow) + "px; top: " + getRandomArbitrary(0, heightWindow) + "px;'></span>";
        }
    }, [])

    const checkKey = () => {
        console.log("wow what a night")
    }
      

    return (
        <>        
        <div 
        tabIndex={0} onKeyDown={() => console.log('key pressed')}
        // onKeyUp={checkKey}
        style={{ backgroundImage: `url('/img/magnify.png')` }}
        id="Cont" onMouseLeave={() => console.log("we just left")}
        // <div id="Cont" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
         className={styles.MagnifyCont}>  
             
            <div  className="night">
                <div className="constellation">
                </div>
            </div>
        </div>
    </>       
    )
}



