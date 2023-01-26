import styles from 'styles/findmine/sass/FindMine.module.scss'
import Container from 'react-bootstrap/Container'
import { useState, useEffect } from 'react'
import Regex from 'utility/MasterRegex'
import APIcall from 'utility/APIcall'
import $ from 'jquery'
// var jsdom = require('jsdom');
// $ = require('jquery')(new jsdom.JSDOM().window);
import {useUrl} from 'Contexts/Url'
import {useGame} from 'Contexts/game'
import FirstLetter from 'utility/firstLetterSearch'

import NumberSearch from 'utility/NumberSearch'
import dbFirstLetter from 'pages/api/strains/dbFirstLetter'
import GET from 'utility/GETdataJS'
import POST from 'utility/POSTdataJS'
import Scrambler from 'utility/ArrayScrambler'
import IntStringCount from 'utility/IntStringCount'

// * components
import AllMine from 'components/AllMineBtnStrip'

// let hoverstring:string = magnifyhover.toString()


export default function Magnify (props) {
    let style = ["style1", "style3", "style4"];
    let tam = ["tam1", "tam1", "tam1", "tam2", "tam3"];
    let opacity = ["opacity1", "opacity1", "opacity1", "opacity2", "opacity2", "opacity3"];
    let theme:string = props.findMineTheme
    

    const { allStrain, getSpecifiedStrain, userStrainPost, dbFirstLetter, dbNumber } = useUrl()  //obj destructuring

const { 
    gameOn, playing, searchHover, searchOn, searchOff,
    findMineTheme, toggleTheme, searchChar, searchCharFunc,
    searchBucket, fillSearchBucket
    } = useGame()

    const [hover, setHover] = useState(false)
    const [reduxBucket, setReduxBucket] = useState([])

    const checkKey = (event) => {
        console.log("checkKey firing!")
        console.log(event)
    }

    
    
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
        if (searchHover) {

            let precode:string = evt.code
            let code:string = evt.code.slice(3).toLowerCase()        
            // gpmcwd gorilla, pineapple, mimosa, cherry, wid & cake, dosidos
    
            let numreturn = await Regex(precode, 'numreturn')
            let allstrains = await APIcall('all', null, null)
    
            let regexlength:number = numreturn.length        
            if (regexlength < 1) {
    
    
                if (code === 'g' || code === 'w' || code === 'p' || code === 'm' || code === 'c' || code === 'd') {
                    let searchFor:(string|object|any) = await FirstLetter(code)
                    fillSearchBucket(searchFor)                
                } else {
                    if (code === 'aleft') return   
                    let allStrainsScrambled = await Scrambler(allstrains) 
                    fillSearchBucket(allStrainsScrambled)                
                }
                
            } 
            else if (regexlength >= 1) {
    
                if (parseInt(numreturn) <= 6 || parseInt(numreturn) > 6) {                                    
                    let newcode = await Regex(code, 'numreturn')
    
                    const specifyStringLength = await IntStringCount(newcode)
                    let stringjoin:string = specifyStringLength.join()
                    let searching = await POST(dbNumber, stringjoin)                                
    
                    let myarray = ['1', '2', '3', '4', '5']
                    // fillSearchBucket(allstrains)                
                    let myStrains = await NumberSearch(numreturn)
    
                    console.log('myStrains')
                    console.log(myStrains)
                    fillSearchBucket(myStrains)                
                }            
            }        

        }
    }

    const nothing = () => { 
        console.log("nothing function is firing");
     }

    const searchOnFunc = () => {        
        searchOn()        
    }

    const searchOffFunc = () => {        
        searchOff()        
    }

    const something = () => {
        console.log("something function!")
    }


    return (
        <Container className="Column">


        <div         
        onKeyDown={searchHover === true ? keyHandler : nothing}        
        tabIndex={0} 
        style={{ backgroundImage: `url('/img/magnify.png')` }}
        id="Cont"        
        onMouseLeave={searchOffFunc}
        onClick={searchOnFunc}
        className={styles.MagnifyCont}
        >  
             
            <div className="night">
                <div className="constellation">
                </div>
            </div>
        </div>

        {/* <AllMine/> */}  
        </Container>
    )
}



