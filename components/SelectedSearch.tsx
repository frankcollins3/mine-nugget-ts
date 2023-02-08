import {useGame} from 'Contexts/game'
import styles from 'styles/findmine/sass/FindMine.module.scss'
import {useEffect, useState} from 'react'
import Random from 'utility/Randomizer'
let randomNumbers:string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
import $ from 'jquery'
import CSS from 'utility/CSStool'
import AllMine from 'components/AllMineBtnStrip'

export default function SelectedSearch(props) {
    const [uiHover, setUiHover] = useState('')

    let allOrMine = styles.allOrMine
    let h1 = styles.h1
    let soClassy:any = [allOrMine, h1].join()

       const { 
        selectedSearch, searchSelector, searchStrainId, 
        searchType, usersOfSearchStrain, usersofsearchstrainset, 
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

    // let usersOfSearchStrainMap = usersOfSearchStrain.map((mapitem) => {
    //     console.log('mapitem')
    //     console.log(mapitem)
    //     return (
    //         <p>  {mapitem || ''}  </p>
    //     )
    // })


    
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
                    usersOfSearchStrain ? usersOfSearchStrain.map( (mapitem, idx) => {
                        return (
                            <p key={idx} style={{ color: 'papayawhip', margin: '0 2em' }}> {mapitem} </p>
                            )
                        })
                        :
                        <div> </div>
                        :
                        <pre >. . .</pre>
                    }
             </div>
                    
        {/* if all render all the strains */}
        {/* if mine render all the usersStrains data for that strain. */}


        <img className={styles.Shovel} onClick={() => console.log("image click")} src="/img/shovel.png"/>
            
        </div>
        </>
    )
}
