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

    let allOrMine = styles.allOrMine
    let h1 = styles.h1
    let soClassy:any = [allOrMine, h1].join()

    let findMineMyStrains = props.findMineMyStrains
    console.log('findMineMyStrains')
    console.log(findMineMyStrains)

       const { 
        selectedSearch, searchSelector, searchStrainId, 
        searchType, usersOfSearchStrain, usersofsearchstrainset, 
        currentUser, currentusernameset, currentuseridset, userstrainset, userStrains, 
        
        } = useGame()

    useEffect( () => {
        console.log('usersOfSearchStrain in selected search component!')
        console.log(usersOfSearchStrain)
    }, [usersOfSearchStrain])   




    
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


    

    return (
        <>        
        <div         
        id={styles.SelectedSearchBox} className="Column">
            <p 
            style={{ fontSize: '18px', marginTop: '0.75em', }}
            onClick={shovel}
            className={styles.h1}>
             {selectedSearch || ''} 
            </p> 
                <div className="Row">

                {
                    searchType === 'All'                     
                    ?
                    usersOfSearchStrain.length
                     ?
                      usersOfSearchStrain.map( (mapitem, idx) => {
                        return (
                            <p key={idx} style={{ color: 'papayawhip', margin: '0 2em' }}> {mapitem} </p>
                            )
                        })
                        :
                        <div> </div>
                        :
                        <pre style={ {color: 'papayawhip'}}>. . .</pre>
                    }
                
                {
                    searchType === 'Mine' 
                    ?
                    // <p> hey </p>                    
                    findMineMyStrains.map( (mystrain, idx) => {
                        // if (mystrain.usersId)
                        console.log('mystrain from the map statement')
                        console.log(mystrain)
                        return (
                            <p key={idx}> {mystrain} </p>
                        )                        
                    })
                    :
                    <pre></pre>
                }
                
             </div>
                    
        
        <img className={styles.Shovel} onClick={() => console.log("image click")} src="/img/shovel.png"/>
            
        </div>
        </>
    )
}
