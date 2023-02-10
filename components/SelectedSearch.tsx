import Axios from 'axios';
import {useGame} from 'Contexts/game'
import styles from 'styles/findmine/sass/FindMine.module.scss'
import {useEffect, useState} from 'react'
import Random from 'utility/Randomizer'
let randomNumbers:string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
import $ from 'jquery'
import CSS from 'utility/CSStool'
import AllMine from 'components/AllMineBtnStrip'
import userStrainsForUsersId from 'pages/api/strains/userStrainsForUsersId'

export default function SelectedSearch(props) {
    const [uiHover, setUiHover] = useState('')
    const [searchId, setSearchId] = useState<any>(0)

    let getIDurl = props.getIDurl
    console.log('getIDurl')
    console.log(getIDurl)

    let allOrMine = styles.allOrMine
    let h1 = styles.h1
    let soClassy:any = [allOrMine, h1].join()


    let findMineMyStrains = props.findMineMyStrains
    console.log('findMineMyStrains')
    console.log(findMineMyStrains)

       const { 
        selectedSearch, searchSelector, searchStrainId, searchstrainidset,
        searchType, usersOfSearchStrain, usersofsearchstrainset, 
        currentUser, currentusernameset, currentuseridset, userstrainset, userStrains, 
        allMyStrains, allmystrainset,
        MineShovelUser, mineshoveluserset, noMineShovel, nomineshovelset,
        searchMinePost, searchminepostset, searchMineRead, searchminereadpost, 
        } = useGame()

    useEffect( () => {
        console.log('usersOfSearchStrain in selected search component!')
        console.log(usersOfSearchStrain)
    }, [usersOfSearchStrain])   

    useEffect( () => {
        console.log('selectedSearch in the selectedSearch component')
        console.log(selectedSearch)

        const getId = async () => {

            Axios.post(getIDurl, {
                name: selectedSearch
            }).then( (id) => {
                // let returnid:number = id
                return id        
            })
        }
            // searchstrainidset(1)
        // let searchID = getId()
        // setSearchId(searchID)
            

    }, [])


    
    const quicktest = () => {
        console.log("hey from quicktest!")
    }

    const test2 = () => {
        console.log("test2 this is crazy")
    }

    const bypass = () => {
        console.log('bypass at selectedSearch side!')
    }

    const shovel = () => {
        console.log('shovel click')
    }

    const usernameClick = (event) => {
        console.log(event)
        console.log('event.target')
        console.log(event.target)
        let text = event.target.outerText
        mineshoveluserset(text)
        console.log('text')
        console.log(text)
    }

    const onChange = () => {
        console.log('we are changing the input')
    }

    const fakesubmit = () => {
        // let input = $('.shovelMineInput')
        let input:any = document.querySelector('.shovelMineInput')
        let inputvalue:string = input.value

        console.log('input')
        console.log(input)

        console.log('inputvalue')
        console.log(inputvalue)
        

    }
    
    

    return (
        <>        
        <div         
        id={styles.SelectedSearchBox} className="Column">
        <div
        style = {{
            // backgroundImage: `url('/img/cone.png')`, backgroundSize: '10%', backgroundRepeat: 'no-repeat',
        }}
        >
            {/* <h1 
            style={{ fontSize: '18px', marginTop: '0.75em', }}
            onClick={shovel}
            className={styles.h1}>
             {selectedSearch || ''} 
            </h1>  */}
                    
            
            
                <div className="Row">

                {
                    searchType === 'All'                     
                    ?
                    usersOfSearchStrain.length
                     ?
                      usersOfSearchStrain.map( (mapitem, idx) => {
                        return (
                            <div key={`div${idx}`} 
                            className="Row"
                            // style={{
                            //     display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'
                            // }}
                            >
                            <p
                            onClick={usernameClick}
                             key={idx} style={{ color: 'papayawhip', margin: '0 2em', cursor: 'pointer' }}> {mapitem} </p>
                            
                            
                            </div>                                
                            )
                    })
                        :
                        <div> </div>
                        :
                        <pre></pre>
                        // <pre style={ {color: 'papayawhip'}}>. . .</pre>
                        
                    }
                </div>       
                
                {
                    searchType === 'Mine' 
                    ?
                    allMyStrains.map( (mystrain, idx) => {  
                            if (parseInt(mystrain) === searchStrainId) {                                    
                                return (
                                    <div 
                                    key={`${idx}div`}                                    
                                    className="Column"
                                    >                                                                                             
                                    <img style={{ height: '4em', width: '4em' }} src="/img/gold.png"/>                                    
                                    </div>
                                )
                            }                            
                    })                                
                    :
                    <pre></pre>
                }          

                    {searchType === 'Mine'
                        ?
                        <div className="Column">
                        {searchMineRead === true 
                            ?
                        <p> read is true </p>
                            :
                        <pre></pre>
                        }
                        
                        {searchMinePost === true 
                            ?
                        <form action="/" className="Column">
                        <input onChange={onChange} type="text" className="shovelMineInput"/>
                        <div onClick={fakesubmit} style={{ marginTop: '0.95em' }} className="MiniGoldBar"></div>
                        </form>
                            :
                        <pre></pre>
                        }

                        </div>                            
                        :
                        <pre></pre>
                    }

                


                {/* <h2> {searchType === 'Mine' ?  }  </h2> */}
                {/* <h2> this is where the display text container will go </h2> */}
                <h2 style={{ color: 'rgb(247, 208, 36)', boxShadow: '2px 10px 2px rgb(247, 208, 36)'}}> {noMineShovel} </h2>
                
             </div>   
                                    
        {/* <img className={styles.Shovel} onClick={() => console.log("image click")} src="/img/shovel.png"/> */}
                {/* <button style={{ backgroundColor: 'yellow' }} onClick={quicktest}></button> */}
        </div>
        </>
    )
}
