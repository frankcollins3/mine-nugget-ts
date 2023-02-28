
import styles from 'styles/game/sass/FamilyTree.module.scss'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useRef, useState, useEffect } from 'react'
import $ from 'jquery'
import CSS from 'utility/CSStool'
import AttrTool from 'utility/JqAttr'
import Siblings from 'utility/JqSiblings'
import Random from 'utility/Randomizer'
import Regex from 'utility/MasterRegex'
// import Endpoint from 'utility/StrainEndpoint'
import ReturnRight from 'utility/ReturnRight'
import ReturnWrong from 'utility/ReturnWrong'
import Children from 'utility/jqChildren'
import Family from 'utility/FamilyJS'
import Animate from 'utility/jqAnimate'
import { Draggable, Droppable } from 'react-drag-and-drop'



// * redux 
import store from 'redux/store'
import { useDispatch, useSelector } from "react-redux";

// * context
import { useGame } from 'Contexts/game'
import { setTextRange } from 'typescript'


export default function GameChild (props) {

    console.log('props in the gameChild!')
    let gold1 = props.gold1
    let gold2 = props.gold2

    const [coin1, setCoin1] = useState(false)
    const [coin2, setCoin2] = useState(false)
    const [coin3, setCoin3] = useState(false)
    const [coin4, setCoin4] = useState(false)

    const setAllCoins = (set:string) => {
        if (set === 'true') {
            setCoin1(true)
            setCoin2(true)
            setCoin3(true)
            setCoin4(true)
        } else if (set === 'false') {
            setCoin1(false)
            setCoin2(false)
            setCoin3(false)
            setCoin4(false)

        }

    }

    const [label1, setLabel1] = useState('')
    const [label2, setLabel2] = useState('')
    const [label3, setLabel3] = useState('')
    const [label4, setLabel4] = useState('')

    const [yesNumber, setYesNumber] = useState(0)
    const [guessText, setGuessText] = useState('')
    const [guessYet, setGuessYet] = useState(false)
    const [hideGold, setHideGold] = useState(false)
    
    const[hoverCoin, setHoverCoin] = useState('')

    const [streakBackup, setStreakBackup] = useState(0)

    const {
        gameOn, playing, notplaying,
         parents, meetTheParents, 
         parent1, parent1state, parent2, parent2state,
         dontuse, fillbucket, emptybucket,
         winStreak, winstreakincrement, clearwinstreak, wrongGuess, guesswrongincrement, clearguesswrong,
         clearparent1, clearparent2, clearparents, EitherParents
         } = useGame()

        let reduxstore:any = useSelector(state => state)
        let numbers:number[] = [1, 2, 3, 4]

        // * jquery
        let mine = $('#mine')
        let suitcase = $('#SuitCase')
        
    useEffect( () => {
        (async() => {
            let randomnumber:number = await Random(numbers)
            setYesNumber(randomnumber)            
        })()

    }, [])

    const handleDragStart = async (event) => {        
        let target = event.target        
        let targetid = target.id        
        let familyparents = await Family(target, 'parents')                
        
        if (familyparents) {            
            let dragParent = familyparents[0]            
            let familytype = dragParent.attributes
            let coinid = await Regex(targetid, 'numreturn')
            let coinint:number = parseInt(coinid)
            let newparents = await ReturnRight(parents) 
            let wrongStrain = await ReturnWrong(parents, dontuse)   
            
            const coincheck = (number:string) => {  
                if (number === 'coin1') {
                    if (coinint === yesNumber) {
                        setLabel1(newparents)
                    } else {
                        if (label1.length < 2) setLabel1(wrongStrain)
                    }
                }
                if (number === 'coin2') {
                    if (coinint === yesNumber) {
                        setLabel2(newparents)
                    } else {
                        if (label2.length < 2) setLabel2(wrongStrain)
                    }
                }
                if (number === 'coin3') {
                    if (coinint === yesNumber) {
                        setLabel3(newparents)
                    } else {
                        if (label3.length < 2) setLabel3(wrongStrain)
                    }
                }
                if (number === 'coin4') {
                    if (coinint === yesNumber) {
                        setLabel4(newparents)
                    } else {
                        if (label4.length < 2) setLabel4(wrongStrain)
                    }
                }
        }
            
            if (familytype[0].textContent === 'notcoin') {

            } else {                
                if (targetid === 'coin1') coincheck('coin1')
                if (targetid === 'coin2') coincheck('coin2')
                if (targetid === 'coin3') coincheck('coin3')
                if (targetid === 'coin4') coincheck('coin4')  
            }            
        }
    }

    const rightparentsfunc = () => {
                    setHideGold(false)                    
                    notplaying()                    
                    CSS($('h6'), 'color', 'rgb(247, 208, 32)')                    
                    EitherParents('1', 'You!')
                    EitherParents('2', 'Win!')                    
                    AttrTool(mine, 'src', '/img/trophy.png')
                    AttrTool(gold1, 'src', '/img/ring.png')
                    AttrTool(gold2, 'src', '/img/watch.png')
                    setStreakBackup(streakBackup + 1)

                    winstreakincrement()                    
                    // winstreakincrement()                    
                    setAllCoins('true')
    }

    const wrongparentsfunc = () => {
        guesswrongincrement()
        CSS($('h6'), 'color', 'red')
        setGuessText('Wrong!')        
        setTimeout( () => notplaying(), 1000)
        setTimeout( () => playing(), 2000)
        if (wrongGuess === 2) {
            // EitherParents('both', '')            
            EitherParents('1', 'YOU')
            EitherParents('2', 'LOSE')
            clearwinstreak()
            clearguesswrong()
        }        
    }


    const handleDrop = async (event) => {          
        if (gameOn === 'playing') {
        let coin:string = event.coin
        let idint:string|number = await Regex(coin, 'numreturn')                
        let coinelem = $(`#coin${idint}`)
        const coinlabel = $(`.label${idint}`)
                        
            type numstring = object | string;                                            
            let labeltext:string = coinlabel[0].innerText        
            setGuessYet(true)       
            if (coin === 'coin1') setCoin1(true)                                     
            if (coin === 'coin2') setCoin2(true)                                     
            if (coin === 'coin3') setCoin3(true)                                     
            if (coin === 'coin4') setCoin4(true)                                     
            let rightparents = await ReturnRight(parents)
            Animate($(`#coin${idint}`), 'opacity', '0.1', 250)
            setTimeout( () => setGuessText(labeltext), 1000)                
            setTimeout( () => {
                Animate($('span'), 'opacity', '0.1', 600)
                setTimeout( () => setGuessText(''), 2000)
                setTimeout( () => setGuessYet(false), 3000)                                 

                if (labeltext === rightparents) {   
                    rightparentsfunc()                
                } else {
                    wrongparentsfunc()
                }
            }, 2000)                                                                           
            }
    }

    const mineclick = async () => {          
        clearparents()
        clearparent1()
        clearparent2()
        props.setCactusHover(false)
    }

    const nofunction = () => {}


    return (
        <>
        <div className="Column">
        <div className={styles.GameChild}>

            {/* <Draggable type={"coin"} data="sourog">      */}
            <div className="Column">                
            <Draggable type={coin1 === false ? "coin" : "notcoin"} data="coin1">     
            <img
            id="coin1"
            draggable="true"
            onMouseEnter={parent1.length > 2 ? handleDragStart : nofunction }         
            onDragStart={() => setHideGold(true)}         
            className={styles.coin} src="img/coin.png" 
            />
            </Draggable>
            <p
            className="label1"
            > {label1 || ''} </p>
            </div>
            {/* <p> hey </p> */}

            <div className="Column">                
            <Draggable type={coin2 === false ? "coin" : "notcoin"} data="coin2">     
            <img
            id="coin2"
            draggable="true"
            onMouseEnter={parent1.length > 2 ? handleDragStart : nofunction }         
            onDragStart={() => setHideGold(true)}         
            className={styles.coin} src="img/coin.png" 
            />
            </Draggable>
            <p
            className="label2"
            > {label2 || ''} </p>
            </div>
            
            <div className="Column">                
            <Draggable type={coin3 === false ? "coin" : "notcoin"} data="coin3">     
            <img
            id="coin3"
            draggable="true"
            onMouseEnter={parent1.length > 2 ? handleDragStart : nofunction }         
            onDragStart={() => setHideGold(true)}         
            className={styles.coin} src="img/coin.png" 
            />
            </Draggable>
            <p
            className="label3"
            > {label3 || ''} </p>
            </div>

            <div className="Column">
            <Draggable type={coin4 === false ? "coin" : "notcoin"} data="coin4">     
            <img
            id="coin4"
            draggable="true"
            onMouseEnter={parent1.length > 2 ? handleDragStart : nofunction }         
            onDragStart={() => setHideGold(true)}         
            className={styles.coin} src="img/coin.png" 
            />
            </Draggable>
            <p
            className="label4"
            > {label4 || ''} </p>
            </div>
     
        </div>  

            { guessYet 
            ?
            <h6
            style={ { color: 'papayawhip', letterSpacing: '0.25em'} }        
            > you picked <span> { gameOn === 'playing' ? guessText : '' } </span>  </h6>
            // > you picked <span> { guessText } </span>  </h6>
            :
            ''
            }

            
            
            <div className="Row">

            <Droppable types={['coin']} onDrop={handleDrop}>
            <img     
            id="mine"       
            draggable="true" 
            onClick={mineclick}
            onMouseEnter={() => CSS($('.wintext'), 'color', 'white')}
            // onMouseEnter={() => winStreak > 0 ? CSS($('.wintext'), 'color', 'white') : nofunction}
            onMouseLeave={() => winStreak > 0 ? CSS($('.wintext'), 'color', 'transparent') : nofunction}
            // onDrop={handleDrop}
            style={{ borderRadius: '50%', border: '2px solid papayawhip', boxShadow: '10px 10px 10px papayawhip'}}            
            className={styles.mine} src="img/mine.png"/>
            </Droppable>

            <img 
            id="SuitCase"
            className={styles.goldbars}
            style={{ display: winStreak > 0 && hideGold === false ?  'inline' : 'none' }}            
            src="/img/gold-bars.png"/>
            </div>
            <p
             className="wintext"
             style={{ marginTop: '1em', color: 'transparent'}}> 

             {streakBackup || winStreak === 1 ? `#${streakBackup || winStreak} ` : 
                streakBackup || winStreak > 1 ? `${streakBackup || winStreak} streak!` :
                streakBackup || winStreak > 5 ? `Golden Streaker ${streakBackup || winStreak}` : ''
             }
             {/* {winStreak === 1 ? `#${winStreak} ` : 
                winStreak > 1 ? `${winStreak} streak!` :
                winStreak > 5 ? `Golden Streaker ${winStreak}` : ''
             } */}
              </p>       
        </div>

        </>
    )
}
