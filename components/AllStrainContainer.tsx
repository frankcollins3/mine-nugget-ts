import Strain from '../pages/strain'
import styles from '../styles/AllStrainContainer.module.scss'
import APIcall from '../utility/APIcall'
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container'


import React, { useEffect, useState} from 'react';  

export default  function AllStrainContainer (){    
    let allstrains: any[] = [   APIcall('any', null, null)]



    // const classList = [modulecss.Parent-Cont, modulecss.Test-Border].join(" ")


    return (
    // let doubleClass = [modulecss.Parent-Cont, ]
        <Container className={styles.ColumnCenter}>

        <h1> hi </h1>
        </Container>


    )
}
