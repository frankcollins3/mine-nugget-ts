    import styles from 'styles/findmine/sass/FindMine.module.scss'
    import {useEffect, useState} from 'react'
    import $ from 'jquery'
    import {useGame} from 'Contexts/game'
    import Container from 'react-bootstrap/Container'

    export default function FindMineText (props) {
        const randomNumbers = [1,2,3,4,5,6,7,8]
        let theme = props.findMineTheme
        // let theme:string = props.findMineTheme
        const [clockTick, setClockTick] = useState('')

        const { 
             searchHover, searchOn, searchOff, searchChar, searchCharFunc,
            searchBucket, fillSearchBucket, searchType, searchTypeClick, selectedSearch, searchSelector,
            usersOfSearchStrain, usersofsearchstrainset, userStrains, myminereviewset, myminetitleset,

            allMyStrains, allmystrainset,
            MineShovel, mineshovelset, 
            searchStrainId,
            } = useGame()
        
        useEffect( () => {
            setTimeout( () => {
                setClockTick('1')
            }, 2000)
        }, [])

        const shoveltest = () => {
            console.log('shovel')
        }
        
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

        const allormine = async (event) => {
            let btnText:string = event.target.outerText
            if (btnText === 'Mine') {                
                myminereviewset('')
                myminetitleset('')            
                await searchTypeClick(btnText)
                allMyStrains.includes(searchStrainId.toString()) 
                ?
                 await searchTypeClick(btnText)
                  :
                  mineshovelset("This Gold Isn't Mine")
                }      
            if (btnText === 'All') {                
                mineshovelset('')                
                await searchTypeClick(btnText)
            }
        }

        const unsearch = async () => {                      
            searchSelector('');
            searchTypeClick('');
        }

        return (
            <>
            <Container
            id="ParentFindMine" className="Column">

            <Container id="outerParent" className={styles.TextParent}>

            <Container className="Column">
            <Container className={styles.TextParent}>
            <p id="word1" className={styles.h1}> F </p>
            <p id="word2" className={styles.h1}> i </p>
            <p id="word3" className={styles.h1}> n </p>
            <p id="word4" className={styles.h1}> d </p>
            </Container>
            {selectedSearch.length > 5 ? <button onClick={allormine} className={styles.allOrMine}>All</button> : <pre></pre>}
            
            </Container>

            <div
                style={{
                cursor: 'pointer'            
                }}
                onClick={unsearch}
                className={styles.MiniGoldBar}
                // src="/img/gold.png"
                ></div>

            <Container className="Column">
            <Container className={styles.TextParent}>
            <p id="word5" className={styles.h1}> M </p>
            <p id="word6" className={styles.h1}> i </p>
            <p id="word7" className={styles.h1}> n </p>
            <p id="word8" className={styles.h1}> e </p>
            </Container>
            {selectedSearch.length > 5 ? <button onClick={allormine} className={styles.allOrMine}>Mine</button> : <pre></pre>}         
            </Container>

            </Container>

            </Container>  


            </>
        )
    }
