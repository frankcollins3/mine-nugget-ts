import Strain from 'pages/strain'
import styles from 'styles/AllStrainContainer.module.scss'
// import getAllStrain from '../pages/api/getAllStrain'
import React, { useEffect, useState} from 'react';  
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container'
import $, { data } from 'jquery' // import * as $ from 'jquery'

import APIcall from 'utility/APIcall'
import MasterListStyle from 'utility/MasterListStyle'



export default  function AllStrainContainer(props:any) {    

    const checkstyles = async () => {
        let sassfiles = await MasterListStyle('strain')
        console.log('sassfiles')
        console.log(sassfiles)
    }




    
    let db:any = props.serverdata.getdata
    let strainmap = db.map( (item:any, index:number) => {        
        let strain = item.strain
        let id:number = item.id
        return (        
            <div key={'column' + index} className="Column">
            <img key={`id ${strain} `} src=""/>
            <li className={styles.li} key={id}> {strain} </li>

            </div>            
        )
    })




    
    let allstrains: any[] = [   APIcall('any', null, null)]    
    return (            
        <>
        <Container 
            style={{ overflowY: 'scroll' }}
            className={styles.ColumnCenter}>
            <ul className={styles.ul}>
            {strainmap}
            </ul>
            <button onClick={checkstyles}></button>
        </Container>
        </>
    


    )
}
