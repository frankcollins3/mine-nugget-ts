import styles from 'styles/findmine/sass/FindMine.module.scss'
import Container from 'react-bootstrap/Container'
import { useState, useEffect } from 'react'
import Regex from 'utility/MasterRegex'

import $ from 'jquery'
// var jsdom = require('jsdom');
// $ = require('jquery')(new jsdom.JSDOM().window);
import {useUrl} from 'Contexts/Url'
import {useGame} from 'Contexts/game'
import FirstLetter from 'utility/firstLetterSearch'

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

    const checkKey = (event) => {
        console.log("checkKey firing!")
        console.log(event)
    }


    useEffect( () => {

    })
    
    useEffect( () => {
        console.log("useEffect is firing lets see those keys!")
        // checkKey()
        $('document').on('mousemove', () => {
            console.log("pressing a key without having to click on anything!")
        })

    }, [searchHover])


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

    const mouseleave = () => {
        
    }

    const keyHandler = async (evt) => {        
        let precode:string = evt.code
        let code:string = evt.code.slice(3)
        
        let numreturn = await Regex(precode, 'numreturn')
        let regexlength:number = numreturn.length        
        if (regexlength < 1) {
            console.log("no length no letters lived!")
            let searchFor:(string|object|any) = await FirstLetter(code)
            console.log('searchFor')
            console.log(searchFor)
            console.log(typeof searchFor)

        } 
        else if (regexlength >= 1) {
            console.log("there is some regex length this is a number")
        }

        

        // let code:string = evt.code.slice(3)
        console.log(`i just pressed ${code}`)
    }

    

    return (
        <>        
        <div         
        tabIndex={0} onKeyDown={keyHandler}        
        style={{ backgroundImage: `url('/img/magnify.png')` }}
        id="Cont" onMouseLeave={mouseleave}        
         className={styles.MagnifyCont}>  
             
            <div  className="night">
                <div className="constellation">
                </div>
            </div>
        </div>
    </>       
    )
}



