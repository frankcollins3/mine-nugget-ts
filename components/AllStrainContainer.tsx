import Strain from 'pages/strain'
import styles from 'styles/AllStrainContainer.module.scss'
// import getAllStrain from '../pages/api/getAllStrain'
import React, { useEffect, useState} from 'react';  
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'

import $, { data } from 'jquery' // import * as $ from 'jquery'

import APIcall from 'utility/APIcall'
import MasterListStyle from 'utility/MasterListStyle'
import { convertCompilerOptionsFromJson } from 'typescript';



export default  function AllStrainContainer(props:any) {   
    const [styleFile, setStyleFile] = useState('')
    const [nothing, setNothing] = useState()
    const [bgToggle, setBgToggle] = useState('old')

    const checkstyles = async () => {        
        let allsass = await MasterListStyle('straincontainer')                
    }

    const toggleBg = async () => {
        if (bgToggle === 'old') setBgToggle('new')
        else if (bgToggle === 'new') setBgToggle('old')

    
    }
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
            style={{ textAlign: 'center' }}
            key={id}> {strain} </li>                          
            </Card.Body>
            </Card>
            :
            <ul>
            {/* <ul className={styles.ul}> */}
                <li
                 style={{ 
                    // border: '2px solid papayawhip',
                    margin: '3.33em',
                    minHeight: '10em',
                    minWidth: '10em',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    listStyleType: 'none'

                }}
                 className={styles.li} key={id}> {nothing} </li>                          
                 {/* className={styles.li} key={id}> {strain} </li>                           */}
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
