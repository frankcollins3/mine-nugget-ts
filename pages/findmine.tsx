import Page from 'styles/findmine/components/Searchpage'
import styles from 'styles/findmine/sass/FindMine.module.scss'
import Helmet from 'components/Helmet'
import Magnify from 'components/Magnify'
import { useState, useEffect } from 'react'
import $ from 'jquery'
// components/Helmet.tsx

function FindMine () {
    console.log($('body'))
    console.log(typeof $('body'))
    // let pageparents:object = $('body').parents()
    // let pageparents:object = $('body').parents()

    useEffect( () => {
        // pageparents.css('overflow', 'hidden')
    }, [])

    return (
        <Page>
        <div className={styles.row}>

        <Helmet/>
        <Magnify/>

        </div>
        
        {/* <h1 style={{ color: 'papayawhip', fontFamily: 'papyrus' }}> Find Mine </h1> */}'
        <div className="Row">
            <h1 className={styles.h1}> Find </h1>
            <img src="/img/mine.png"/>
            <h1 className={styles.h1}> Mine </h1>
            
        </div>

        </Page>
    )
}
export default FindMine

