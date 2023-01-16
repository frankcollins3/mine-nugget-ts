    import styles from 'styles/findmine/sass/FindMine.module.scss'
    import {useEffect, useState} from 'react'
    import $ from 'jquery'

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
            
            setTimeout( () => {
                $(`#word${randomNumber}`)
                .css('color', `rgba(255, 166, 0, 0.85)`)
                .animate({
                    marginTop: '-20px',
                    // color: 'green'
                }, 1000)

                setTimeout( () => {
                    $(`#word${randomNumber}`)
                    .css('color', 'papayawhip')
                    .animate({
                        marginTop: '0px',
                    }, 1000)
                    setClockTick(randomNumber)
                }, 2000)
            }, 3000)                    
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
