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

    let db:string = props.serverdata
    console.log('db')
    console.log(db)
    

    // tried page:string .... page:any works.
    let allstrains: any[] = [   APIcall('any', null, null)]
    // const classList = [modulecss.Parent-Cont, modulecss.Test-Border].join(" ")
    return (
    // let doubleClass = [modulecss.Parent-Cont, ]
        <>
        {/* <ThemeContext> */}
        <button type="button"></button>
        <Container fluid className={styles.ColumnCenter}>

        </Container>
        {/* </ThemeContext> */}
        </>
    


    )
}
