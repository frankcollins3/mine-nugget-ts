    import Container from 'react-bootstrap/Container'
    
    import styled from 'styled-components'
    import CardStyle from 'styles/StrainDisplay'
    import MineCont from 'styles/PickMines'
    import React, { useEffect, useState, useContext, createContext } from 'react'
    import DataCall from 'utility/DataCallJS'
    import Axios from 'axios'
    import POST from '/utility/POSTdataJS'
    import MasterRegex from '/utility/MasterRegex'
    import {useUrl} from 'Contexts/Url'

    export default function PickMines(props) {
        
        console.log('props in pickmines')
        console.log(props)
        
        const { userStrainPost } = useUrl()
        let localhost = props.localhost
        
        let globalstate = props.global
        let clickedStrain = props.global.clickedStrain
        
        const [global, setGlobal] = useState()
        const [save, setSave] = useState(false)
        const [savedStrain, setSavedStrain] = useState('')
        
        let ptag = 'PickMineP' 
        let column = 'Column'
    
        let double = [column, ptag].join(' ')

        let userstrainsMAP = new Map()
        
        useEffect( () => {
            setGlobal(globalstate)
        }, [])   

        // useEffect( () => {
        //     (async() => {

        //     })()

        // }, [])
        
        const clickPick = async () => {     
            await userstrainsMAP.set('usersId', 'test')
            await userstrainsMAP.set('strainsId', '')

            console.log("lets see the clickPick!")        
            let localurl = await props.url();
            let realurl = `${localurl}/api/strains/postuserstrains`;
                         
            let straindata = globalstate.currentStrain;       
            console.log('straindata')                 
            console.log(straindata)          
            
            console.log(userstrainsMAP.get('usersId'))       
            let userid = '6'; // this would/will be pulling global.userId.toString()                         

            let submissionData = straindata += userid            
            // let xmldata = await POST(realurl, submissionData);            
            // console.log('xmldata')            
            // console.log(xmldata)            

            
             
            setSavedStrain(props.global.clickedStrain)
            setSave(true)
        }

        

        // let globalstate:(string|object|number)  = props.global


        return (

            <Container
            style={ {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '30%',
                width: '50%'
            }}
            >
                            
            <MineCont
            className={double}        
                
            >
        
            <img  
            onClick={clickPick}
            style={ { height: '5em', width: '7em'}}
            src="/img/pick.png"/>

            {save === false ?
            <h3
            style={ { 
                color: 'white',
                textShadow: '35px 25px 55px white',
                boxShadow: '35px 25px 55px orange',
                fontWeight: 'bold',
            }}
            > save {props.global.clickedStrain || ''} to the mines?</h3>
            :
            <>
            <h3
            style={ { 
                color: 'white',
                textShadow: '35px 25px 55px white',
                boxShadow: '35px 25px 55px orange',
                fontWeight: 'bold',
            }}
            > 'You Saved {props.global.currentStrain}!'</h3>
            <p
            style = { { color: 'white', fontWeight: 'bold' }}
            > gold to be mine. mine to be gold. </p>
            </>
            }
            </MineCont>
            </Container>

        )
    }
