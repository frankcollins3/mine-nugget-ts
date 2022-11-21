import Strain from '../pages/strain'
import styles from '../styles/Strain.module.scss'
import APIcall from '../utility/APIcall'
import Alert from 'react-bootstrap/Alert';

import React, { useEffect, useState} from 'react';  

export default  function AllStrainContainer (){    
    let allstrains: any[] = [   APIcall('any', null, null)]



    // const classList = [modulecss.Parent-Cont, modulecss.Test-Border].join(" ")


    return (
    // let doubleClass = [modulecss.Parent-Cont, ]
        <div className={styles.StrainBox}>
        <h1> hi </h1>
        {[
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'light',
        'dark',
      ].map((variant) => (
        <Alert key={variant} variant={variant}>
          This is a {variant} alert—check it out!
        </Alert>
      ))}

        </div>
    )
}