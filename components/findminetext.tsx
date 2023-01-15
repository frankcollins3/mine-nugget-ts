    import styles from 'styles/findmine/sass/FindMine.module.scss'
    import {useEffect, useState} from 'react'
    import $ from 'jquery'
import { relative } from 'node:path/win32'

    export default function FindMineText (props) {
        const randomNumbers = [1,2,3,4,5,6,7,8]
        let theme = props.findMineTheme
        // let theme:string = props.findMineTheme
        const [clockTick, setClockTick] = useState('')
        
        useEffect( () => {
            setTimeout( () => {
                setClockTick('1')
            }, 2000)
        }, [])
        
        useEffect( () => {
            let randomNumber:string = randomNumbers[Math.floor(Math.random()*randomNumbers.length).toString()]
            let themecolor: string = props.findMineTheme === 'cone' ? `rgba(255, 166, 0, 0.85)` : `rgb(247, 208, 32)` 
            console.log('randomNumber 2nd useEffect')
            console.log(randomNumber)
            // .css('color', 'blue')

            // $(`#word${randomNumber}`)
            // .css('color', 'blue')
            // .animate({
            //     position: `relative`
            // })
            
            setTimeout( () => {
                // let textid = $(`#word${randomNumber}`)
                // textid
                $(`#word${randomNumber}`)
                .animate({
                    marginTop: '-30px'
                }, 1000)
                .animate({                    
                    color: 'orange'
                    // color: themecolor
                    // color: {theme === 'cone' ? `rgba(255, 166, 0, 0.85)` : 'blue'}
                }, 2000)
                .animate({                    
                    color: `papayawhip`
                }, 1000)            
                setClockTick(randomNumber)
            }, 4000)
        }, [clockTick])

        return (
            <>
            <div className={styles.TextParent}>
            <div className={styles.TextParent}>
            <p id="word1" className={styles.h1}> F </p>
            <p id="word2" className={styles.h1}> i </p>
            <p id="word3" className={styles.h1}> n </p>
            <p id="word4" className={styles.h1}> d </p>
            </div>
            <div className={styles.TextParent}>
            <p id="word5" className={styles.h1}> M </p>
            <p id="word6" className={styles.h1}> i </p>
            <p id="word7" className={styles.h1}> n </p>
            <p id="word8" className={styles.h1}> e </p>
            </div>
            </div>
            </>
        )
    }
