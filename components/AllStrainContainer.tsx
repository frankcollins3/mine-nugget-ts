import Strain from '../pages/strain'
import styles from '../styles/AllStrainContainer.module.scss'
import APIcall from '../utility/APIcall'
// import getAllStrain from '../pages/api/getAllStrain'
import React, { useEffect, useState} from 'react';  
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container'
import $ from 'jquery' // import * as $ from 'jquery'

const getStrains = async () => {

    $.ajax({
        method: 'get',
        url: './api/getAllStrain',
          data: {
            key: 'GETall'
          }
        }).then( (resFromAPI) => {
          console.log('resFromAPI')
          console.log(resFromAPI)
          let res = resFromAPI || 'hey wats up'
          // *  this is client side 
          return  {
              props: {strains: res}
            }
        })
    
}


export async function getStaticProps() {
    // console.log("hey were in the get static props") dont write code that you expect to see in your browser. this runs at build time. can only fetch and return data as props.
    let allstrains:any = await APIcall('all', null, null)
    // $.ajax({
    //     method: 'get',
    //     url: './api/getAllStrain',
    //       data: {
    //         key: 'GETall'
    //       }
    //     }).then( (resFromAPI) => {
    //       console.log('resFromAPI')
    //       console.log(resFromAPI)
    //       let res = resFromAPI || 'hey wats up'
    //       // *  this is client side 
    //       return  {
    //           props: {strains: res}
    //         }
    //     })
    }


export default  function AllStrainContainer({strains}:any, props:any) {    
// export default  function AllStrainContainer(props:any) {    
    console.log('strains')
    console.log( { strains })
    
    // let allDb = props.allStrains
    console.log('props')
    console.log(props)
    


    

    

    // tried page:string .... page:any works.
    let allstrains: any[] = [   APIcall('any', null, null)]



    // const classList = [modulecss.Parent-Cont, modulecss.Test-Border].join(" ")


    return (
    // let doubleClass = [modulecss.Parent-Cont, ]
        <>
        {/* <ThemeContext> */}
        <button type="button" onClick={getStrains}></button>
        <Container fluid className={styles.ColumnCenter}>

        </Container>
        {/* </ThemeContext> */}
        </>
    


    )
}
