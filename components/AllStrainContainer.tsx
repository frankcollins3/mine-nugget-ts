import Strain from 'pages/strain'
import styles from 'styles/AllStrainContainer.module.scss'
// import getAllStrain from '../pages/api/getAllStrain'
import React, { useEffect, useState} from 'react';  
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import CSS from 'utility/CSStool'
import SeeAndSave from 'utility/SeeAndSave'
import $, { data } from 'jquery' // import * as $ from 'jquery'
import APIcall from 'utility/APIcall'
import MasterListStyle from 'utility/MasterListStyle'
import { convertCompilerOptionsFromJson } from 'typescript';



export default  function AllStrainContainer(props:any) {   
    const [styleFile, setStyleFile] = useState('')
    const [nothing, setNothing] = useState()
    const [bgToggle, setBgToggle] = useState('new')
    const [textState, setTextState] = useState('')
    const [clickedStrain, setClickedStrain] = useState('')

    const checkstyles = async () => {        
        let allsass = await MasterListStyle('straincontainer')                
    }

    const toggleBg = async () => {
        if (bgToggle === 'old') setBgToggle('new')
        else if (bgToggle === 'new') setBgToggle('old')
    }

    const nowYouSee = (event:any) => {
        CSS($(event.target), 'color', 'papayawhip')
    }
    const nowYouDont = (event:any) => {
        let tgt: object = $(event.target)
        CSS($(event.target), 'color', 'transparent')
    }

    const strainClick = async (event:any) => {
        console.log(event)
        let target = event.target
        let text = event.target.innerText
        CSS(target, 'border', '5px solid limegreen')
        let clickedstrain = await APIcall('specify', text, setClickedStrain)
        console.log('clickedstrain')
        console.log(clickedstrain)

        // seeAndSave(target, )
    }
    // const nowYouSee = (event) => CSS($(event.target), 'opacity', '1.0')

    
    const joinedClassStr = [styles.ul, styles.FlexBottom].join(" ")

    
    let db:any = props.serverdata.getdata
    let strainmap = db.map( (item:any, index:number) => {        
        let strain = item.strain
        let id:number = item.id
        return (        
            <div key={'column' + index} className="Column">
            <img key={`id ${strain} `} src=""/>

            {bgToggle === 'new' ?
            <Card 
            className={styles.BstrapContCard}
            style={{ width: '18rem' }}>            
            <Card.Body>
            <li  
            onClick={strainClick}
            style={{ textAlign: 'center' }}
            key={id}> {strain} </li>                          
            </Card.Body>
            </Card>
            :
            <ul>
            {/* <ul className={styles.ul}> */}
                <li
                 onClick={strainClick}
                 style={{ 
                    // border: '2px solid papayawhip',
                    letterSpacing: '0.25em',                    
                    color: 'transparent',
                    margin: '3.33em',
                    minHeight: '10em',
                    minWidth: '10em',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    listStyleType: 'none'

                }}
                  onMouseEnter={nowYouSee} onMouseLeave={nowYouDont}
                  className={styles.li} key={id}> {strain} </li>                           
                {/* //  className={styles.li} key={id}> {nothing} </li>                           */}
            </ul>
            }

            </div>            
        )
    })

    let allstrains: any[] = [   APIcall('any', null, null)]    
    return (            
        <>
        <Container 
            style={{ overflowY: 'scroll' }}
            className={styles.ColumnCenter}>
            {/* {strainmap} */}
           {bgToggle === 'new' 
           ?
           strainmap
           :    
           strainmap        
           }
        
        </Container>
        <button onClick={toggleBg}></button>
        </>
    


    )
}
