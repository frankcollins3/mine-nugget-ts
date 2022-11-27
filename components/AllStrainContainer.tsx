import Strain from 'pages/strain'
import $ from 'jquery' // import * as $ from 'jquery'
import Axios from 'axios'
import styles from 'styles/AllStrainContainer.module.scss'
import getAllStrain from 'pages/api/strains/strain'
import React, { useEffect, useState} from 'react';  
import getSpecifiedStrain from 'pages/api/getSpecifiedStrain'
// import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container'
// import Card from 'react-bootstrap/Card'
import {Alert, Card} from 'react-bootstrap'


import DataCall from 'utility/DataCallJS'
import AttrTool from 'utility/JqAttr'
import Siblings from 'utility/JqSiblings'
import Children from 'utility/jqChildren'
import CSS from 'utility/CSStool'
import SeeAndSave from 'utility/SeeAndSave'
import APIcall from 'utility/APIcall'
import MasterListStyle from 'utility/MasterListStyle'





export default  function AllStrainContainer(props:any) {   
    const [styleFile, setStyleFile] = useState('')
    const [nothing, setNothing] = useState()
    // const [bgToggle, setBgToggle] = useState('new')
    const [textState, setTextState] = useState('')

    let clickedStrain = props.clickedStrain
    let setClickedStrain = props.setClickedStrain
    // const [clickedStrain, setClickedStrain] = useState('')  state passed above to parent.
    

    const checkstyles = async () => {        
        let allsass = await MasterListStyle('straincontainer')                
    }
    const toggleBg = async () => {        
        if (props.bgToggle === 'old') props.setBgToggle('new')
        else if (props.bgToggle === 'new') props.setBgToggle('old')
    }
    const nowYouSee = (event:any) => {
        CSS($(event.target), 'color', 'papayawhip')
    }
    const nowYouDont = (event:any) => {
        let tgt: object = $(event.target)
        CSS($(event.target), 'color', 'transparent')
    }

    
    const strainClick = async (event:any) => {             
        let target = event.target
        let childrenOfTarget = await Children(target)
        let text:string = event.target.innerText      
        let strainId:string = event.target.attributes[0].nodeValue       
        let otherstrainId:(string|number) = event.target.id
        console.log('otherstrainId')   
        console.log(otherstrainId)   
        props.setClickedStrain(text)
        await console.log('props.clickedStrain this is in the strain click function')
        await console.log(props.clickedStrain)
        // let predata = await Axios.get(`api/getSpecifiedStrain`) 
        // let predata = await Axios({
        //     method: 'GET',
        //     url: 'api/getAllStrain',           
        // })
        // let predata = await DataCall('axios', `api/getSpecifiedStrain`, null)

        // let predata = await Axios({
        //     method: 'get',
        //     url: `api/strains/strain/2`,
            // data: text 
            // data: { text }
        // })

        
        let predata = await Axios.create({
            // method: 'get',       defaults to get if unspecified.
            // baseURL: 'api/strains/strain/3',
            // timeout: 2000
            // headers: {'Behind-The-Scenes-Thanks-To:': 'HTTP from AXIOS not XML from AJAX'}, oh wow there are valid response headings 
            data: { strainId: otherstrainId },
            transformResponse: [function (data) {
                // Do whatever you want to transform the data
                console.log("transform response function!")                    
                console.log('data in the transformResponse clientside')
                console.log(data)

                return data;
            }],
        })
        let axiosfactory = await predata.get(`api/strains/strain/${strainId}`) // oops didn't use async had promise returned.
        let returnedId = axiosfactory.data
        console.log('returnedId')
        console.log(returnedId)
    
        
        let pokedata = await Axios.get(`https://pokeapi.co/api/v2/pokemon/slowpoke`)
        // let pokedata = DataCall('axios', `/getAllStrains`, null)
        

        
        // await specifyDbStrain(target, {})
        // let returndata = await DataCall('ajax', '/api/getSpecifiedStrain', null)
        
        
        

        
        // const familyTree = async () => {
            // let sis:object|any = await Siblings($(event.target))            
            // let niece:object|any = await Children(sis)            
        //     await AttrTool(niece, 'value', text)            
        // }
        // familyTree()        
        // let clickedstrain = await APIcall('specify', text, setClickedStrain)                
        
        
    }

    const joinedClassStr = [styles.ul, styles.FlexBottom].join(" ")    
    let db:any = props.serverdata.getdata
    let strainmap = db.map( (item:any, index:number) => {        
        let strain = item.strain
        let id:(number|string) = item.strainId  //oh wow was using sequelize table id getting wrong id.
        
        return (        
            <div key={'column' + index} className="Column">
            <img key={`id ${strain} `} src=""/>

            {props.bgToggle === 'new' ?
            <Card 
            className={styles.BstrapContCard}
            style={{ width: '18rem' }}>            
            <Card.Body>
            {/* <form action="/api/getAllStrain" method="POST" id="strainForm">
            <input
            className="strainInput" 
            id={styles.InvisibleInput}
            />
            <input type="submit"/>
            </form> */}
            <li  
            id={id.toString()}
            onClick={strainClick}
            style={{ textAlign: 'center' }}
            key={id}> {strain} </li>                          
            </Card.Body>
            </Card>
            :
            <ul>
            {/* <ul className={styles.ul}> */}
                <li
                 id={id.toString()}
                 onClick={strainClick}
                 style={{ 
                    // border: '2px solid papayawhip',
                    letterSpacing: '0.25em',                    
                    color: 'transparent',
                    margin: '3.33em',
                    minHeight: '10em',
                    minWidth: '10em',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    listStyleType: 'none'

                }}
                  onMouseEnter={nowYouSee} onMouseLeave={nowYouDont}
                  className={styles.li} key={id}> {strain} </li>                           
                {/* //  className={styles.li} key={id}> {nothing} </li>                           */}
            </ul>
            }

            </div>            
        )
    })

    let allstrains: any[] = [   APIcall('any', null, null)]    
    return (            
        <>
        <Container 
            style={{ overflowY: 'scroll' }}
            className={styles.ColumnCenter}>
            {/* {strainmap} */}
           {props.bgToggle === 'new' 
           ?
           strainmap
           :    
           strainmap        
           }
        
        </Container>
        <button onClick={toggleBg}></button>
        </>
    


    )
}
