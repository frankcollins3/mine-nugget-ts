
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
import Endpoint from 'utility/StrainEndpoint'
import ReturnRight from 'utility/ReturnRight'
import ReturnWrong from 'utility/ReturnWrong'
import { Draggable, Droppable } from 'react-drag-and-drop'

import Children from 'utility/jqChildren'
import Family from 'utility/familyJS'
import { propTypes } from 'react-bootstrap/esm/Image'

// * redux 
import store from 'redux/store'
import { useDispatch, useSelector } from "react-redux";

// * context
import { useGame } from 'Contexts/game'
import { setTextRange } from 'typescript'


export default function GameChild (props) {


    const [coin1, setCoin1] = useState(false)
    const [coin2, setCoin2] = useState(false)
    const [coin3, setCoin3] = useState(false)
    const [coin4, setCoin4] = useState(false)

    const [label1, setLabel1] = useState('')
    const [label2, setLabel2] = useState('')
    const [label3, setLabel3] = useState('')
    const [label4, setLabel4] = useState('')

    const [yesNumber, setYesNumber] = useState(0)
    const [guessText, setGuessText] = useState('')
    const [guessYet, setGuessYet] = useState(false)

    const[hoverCoin, setHoverCoin] = useState('')

    const {
        gameOn, playing, notplaying,
         parents, meetTheParents, 
         parent1, parent1state, parent2, parent2state,
         dontuse, fillbucket, emptybucket
         } = useGame()
// * these context variables are working facilitate guessing with the coins.
// * the coins will need labels with: [ReturnRight() && ReturnWrong] depending on if coin matches up.
// * import { useGame } from 'Contexts/game'


    let reduxstore:any = useSelector(state => state)

    
    // let parents:string = props.rootparents
    // let rootparents = parents

    let numbers:number[] = [1, 2, 3, 4]


    useEffect( () => {
        (async() => {
            let randomnumber:number = await Random(numbers)
            setYesNumber(randomnumber)            
        })()

    }, [])
    
    const handleDragStart = async (event) => {
        let target = event.target        
        let targetid = target.id
        // $(target).css('border', '10px solid pink')        
        let familyparents = await Family(target, 'parents')                
        
        if (familyparents) {            
            let dragParent = familyparents[0]            
            let familytype = dragParent.attributes
            let coinid = await Regex(targetid, 'numreturn')
            let coinint:number = parseInt(coinid)
            let newparents = await ReturnRight(parents) 
            let wrongStrain = await ReturnWrong(parents, dontuse)                                                                   
            
            if (familytype[0].textContent === 'notcoin') {

            } else {                
                if (targetid === 'coin1') {                    
                    // setCoin1(true)
                    // setGuessText(newparents)                    
                    if (coinint === yesNumber) {                                                
                        // let newparents = await ReturnRight(parents)                                            
                        setLabel1(newparents)
                    } else {                                                
                        if (label1.length < 2) { setLabel1(wrongStrain) }     
                        fillbucket(wrongStrain)                        
                        // await AttrTool(dragParent, 'type', 'notcoin')
                        // await AttrTool(dragParent, 'data', '')                
                        // await CSS(target, 'opacity', '0.1')                                                                            
                    }                     
                }
                
                if (targetid === 'coin2') {                    
                    setCoin2(true)                                        
                    if (coinint === yesNumber) {
                        // let newparents = await ReturnRight(parents)                                            
                        setLabel2(newparents)     
                        // setGuessText(newparents)                   
                    } else {                                                
                        if (label2.length < 2) { setLabel2(wrongStrain) }     
                        fillbucket(wrongStrain)                        
                    }
                }
                if (targetid === 'coin3') {
                    // setCoin3(true)                                    
                    if (coinint === yesNumber) {                        
                        setLabel3(newparents)                          
                    } else {                                                
                        if (label3.length < 2) { setLabel3(wrongStrain) }     
                        fillbucket(wrongStrain)
                    }
                }
                if (targetid === 'coin4') {                                    
                    // setCoin4(true)                    
                    if (coinint === yesNumber) {                        
                        setLabel4(newparents)                                            
                    } else {                                                
                        if (label4.length < 2) { setLabel4(wrongStrain) }     
                        fillbucket(wrongStrain)
                    }
                }
                                
            }            
        }
    }

    const nativeDrop = async (event) => {        

    }

    const handleDrop = async (event) => {        
        console.log("we are firing the drop function!")        
        console.log(event)
        let coin:string = event.coin
        if (coin === 'coin1') {
            console.log('weve got coin1. great')
                // let newparents = await ReturnRight(parents)                                            
                // setLabel1(newparents)      
                // setGuessText(newparents) 
                

                type objectStr = object | string;
                

                let kids = await Children($('#coin1'))                
                console.log('kids')
                console.log(kids)
                // let kids = $('#coin1').children()
                let sibs = $('#coin1').siblings()
                console.log('sibs')
                console.log(sibs)

                // let kids = await Children<objectStr>($(`#${coin}`), 'children')
                


            
                            
                setGuessYet(true)       
                setCoin1(true)          
        }

        if (coin === 'coin1') {
            console.log('weve got coin1. great')
                let newparents = await ReturnRight(parents)  

                console.log($('#coin1'))                                          
                let jqcoin = $('#coin1')
                console.log('jqcoin')
                console.log(jqcoin)

                let kids = $('#coin1').children()
                console.log('kids')
                console.log(kids)

                let coinchild = await Family(jqcoin, 'children')
                // let coinchild = await Family(jqcoin, 'children')
                // console.log('coinchild')
                // console.log(coinchild)
                // let childrenofthecoin

                setLabel1(newparents)      
                setGuessText(newparents) 
                setGuessYet(true)                 
        }
    }

    const mineclick = async () => {        
        props.setCactusHover(false)
    }


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
            onMouseEnter={handleDragStart}         
            // onDragStart={handleDragStart}         
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
            onMouseEnter={handleDragStart}         
            // onDragStart={handleDragStart}         
            className={styles.coin} src="img/coin.png" 
            />
            <h1 style={{ color: 'white'}}></h1>
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
            onMouseEnter={handleDragStart}         
            // onDragStart={handleDragStart}         
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
            onMouseEnter={handleDragStart}         
            // onDragStart={handleDragStart}         
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
            > you picked <span> { guessText } </span>  </h6>
            :
            ''
            }

            
            

            <Droppable types={['coin']} onDrop={handleDrop}>
            <img            
            draggable="true" 
            onClick={mineclick}
            // onDrop={handleDrop}
            style={{ borderRadius: '50%', border: '2px solid papayawhip', boxShadow: '10px 10px 10px papayawhip'}}            
            className={styles.mine} src="img/mine.png"/>
            </Droppable>

            {/* <button 
            style={{ 
            borderRadius: '50%', backgroundColor: 'limegreen',
             height: '50px', width: '50px'
            }}
            onClick={() => console.log(parents)}></button> */}

            

            


        {/* <img style={{ border: '5px solid papayawhip', transform: `scale(0.2)` }} src="/img/mine.png"/> */}
        </div>

        </>
    )
}
