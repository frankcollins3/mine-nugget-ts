import {useGame} from 'Contexts/game'
import styles from 'styles/findmine/sass/FindMine.module.scss'
import {useEffect, useState} from 'react'
import Random from 'utility/Randomizer'
let randomNumbers:string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
import $ from 'jquery'
import CSS from 'utility/CSStool'

export default function SelectedSearch() {
    const [uiHover, setUiHover] = useState('')

    let allOrMine = styles.allOrMine
    let h1 = styles.h1
    let soClassy:any = [allOrMine, h1].join()

       const { 
        selectedSearch, searchSelector
        } = useGame()
    
    useEffect( () => {

    }, [searchSelector])

    const bypass = async (event) => {
        let target = $(event.target)
        let btn1 = $('#selectBtn1')
        let btn2 = $('#selectBtn2')
        let doubleObjectRef = [btn1, btn2].join()
        CSS(btn1, 'color', 'gray')
        CSS(btn2, 'color', 'gray')
        const reset = () => setUiHover("");
        // CSS(doubleObjectRef, 'color', 'black')
        const grabNumberSetState = async () => {
            let randomNumber:string = await Random(randomNumbers)
            setUiHover(randomNumber)
        }
        const doublefunction = async () => {
            await reset()
            await grabNumberSetState()
        }
        doublefunction()
    }

    
    return (
        <div id={styles.SelectedSearchBox} className="Column">
            <div
            //  onMouseEnter={bypass}
             className={styles.row}>
                <button
                onClick={bypass}
                id="selectBtn1"
                // onMouseEnter={bypass}
                className={styles.allOrMine}
                >All</button>

        <div 
        style={{ marginTop: '2em'}} className={styles.MiniGoldBar}></div>

        <button
                id="selectBtn2"
                onClick={bypass}
                className={styles.allOrMine}
                >Mine</button>
            </div>

            <p 
            style={{ fontSize: '18px', marginTop: '0.75em', }}
            className={styles.h1}> {selectedSearch || ''} </p>
            {/* className={styles.h1}> {selectedSearch || ''} </p> */}

            
        </div>
    )
}