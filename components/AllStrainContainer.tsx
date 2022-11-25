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

    const checkstyles = async () => {        
        let allsass = await MasterListStyle('straincontainer')                
    }
    const joinedClassStr = [styles.ul, styles.FlexBottom].join(" ")

    
    let db:any = props.serverdata.getdata
    let strainmap = db.map( (item:any, index:number) => {        
        let strain = item.strain
        let id:number = item.id
        return (        
            <div key={'column' + index} className="Column">
            <img key={`id ${strain} `} src=""/>

            <Card style={{ width: '18rem' }}>
            {/* <Card.Img variant="top" src="" /> */}
            <Card.Body>
            <li className={styles.li} key={id}> {strain} </li>                          
            </Card.Body>
            </Card>

            </div>            
        )
    })




    
    let allstrains: any[] = [   APIcall('any', null, null)]    
    return (            
        <>
        <Container 
            style={{ overflowY: 'scroll' }}
            className={styles.ColumnCenter}>
            {/* <ul className={joinedClassStr}> */}
            {strainmap}
            {/* </ul>             */}
        </Container>
        </>
    


    )
}
