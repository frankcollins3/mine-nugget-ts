import Strain from '../pages/strain'
import styles from '../styles/AllStrainContainer.module.scss'
import APIcall from '../utility/APIcall'
// import getAllStrain from '../pages/api/getAllStrain'
import React, { useEffect, useState} from 'react';  
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container'
import $, { data } from 'jquery' // import * as $ from 'jquery'


export default  function AllStrainContainer(props:any) {    
    console.log('props from the container')
    console.log(props)

    let db:any = props.serverdata.getdata
    let strainmap = db.map( (item:any, index:number) => {
        console.log('item')
        console.log(item)
        console.log(item.strain)
        let strain = item.strain
        let id:number = item.id
        return (
            // <ul key={index}> this would create a ul for every element that we are mapping through.
                <li key={id}> {strain} </li>
            // </ul>
        )

    })


    


    // tried page:string .... page:any works.
    let allstrains: any[] = [   APIcall('any', null, null)]
    // const classList = [modulecss.Parent-Cont, modulecss.Test-Border].join(" ")
    return (
    // let doubleClass = [modulecss.Parent-Cont, ]
        
        <>
        <Container fluid className={styles.ColumnCenter}>
            <ul>
            {strainmap}
            </ul>
        </Container>
        </>
    


    )
}
