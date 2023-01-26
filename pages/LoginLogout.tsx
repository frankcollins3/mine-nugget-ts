import Helmet from 'components/Helmet'
import styles from 'styles/LoginLogout/LogInOut.module.scss'
import ReturnUrl from 'utility/ReturnUrl'
import Page from 'styles/LoginLogout/styledcomponents/Page'
import {useEffect, useState} from 'react'
import { scaleFadeConfig } from '@chakra-ui/react'

export default function InOut (props) {
    console.log('props')
    console.log(props)
    let URLclient = props.localhost
    console.log('URLclient')
    console.log(URLclient)

    let sty = styles
    let centerYbetweenXrow = [styles.centerYbetweenXrow, styles.flex].join()
    // let centerYbetweenXrow = [sty.centerYbetweenXrow, sty.flex].join()

    return (                            
        <Page>
            <div className={centerYbetweenXrow}>      
            {/* <div className={centerYbetweenXrow}>       */}
            <img className={styles.GoldBar} src="/img/gold.png"/>
            <img className={styles.GoldBar} src="/img/gold.png"/>
            </div>
            <div className={styles.endYcenterXcolumn}>
                <Helmet />
            </div>
        </Page>
        
        )
    }

    export async function getServerSideProps (context) {
        let url:any = await ReturnUrl(context);
        let localhost:string = url
        let predata = await fetch(new URL(`${url}/api/strains/strain`))            
        let propurl = await predata.json()        
        

        
        return {
            props: {
                localhost                
            }
        }
    }

    // * this page will have state that when given a number it uses ternary rendering to render difference custom footers.
    // * one page ninja input. swap login or logout by state.
    // * {we dig you: shovel} {youre pure gold: goldbar} {gold to be mine mine to be gold: mine with border, viva oro: cactus}
