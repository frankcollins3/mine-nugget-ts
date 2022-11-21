import Strain from '../pages/strain'
import styles from '../styles/AllStrainContainer.module.scss'
import APIcall from '../utility/APIcall'
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container'
import $ from 'jquery' // import * as $ from 'jquery'



import React, { useEffect, useState} from 'react';  

export default  function AllStrainContainer(page:string){    
    // tried page:string .... page:any works.
    let allstrains: any[] = [   APIcall('any', null, null)]



    // const classList = [modulecss.Parent-Cont, modulecss.Test-Border].join(" ")


    return (
    // let doubleClass = [modulecss.Parent-Cont, ]
        {page === 'strain'  // This condition will always return 'false' since the types '{ page: string; }' and 'string' have no overlap.ts(2367)
        ?
        <Container fluid className={styles.ColumnCenter}>
        </Container>
        :
        <p> '' </p>

    }


    )
}
