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



export default  function AllStrainContainer(props:any) {   
    const [styleFile, setStyleFile] = useState('')
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
            <li className={styles.li} key={id}> {strain} </li>                          
            </Card.Body>
            </Card>
            :
             <li className={styles.li} key={id}> {strain} </li>                          
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
            {strainmap}
            {/* {bgToggle === 'new' 
            ?
            {strainmap}
            :
            <ul className={joinedClassStr}> 
            {strainmap}
            </ul>
             } */}
        </Container>
        <button onClick={toggleBg}></button>
        </>
    


    )
}
