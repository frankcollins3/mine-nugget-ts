import Strain from 'pages/strain'
import $ from 'jquery' // import * as $ from 'jquery'
import Axios from 'axios'
import styles from 'styles/AllStrainContainer.module.scss'
import getAllStrain from 'pages/api/strains/strain'
import React, { useEffect, useState} from 'react';  
import getSpecifiedStrain  from 'pages/api/strains/getSpecifiedStrain'
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
import MasterRegex from 'utility/MasterRegex'

export default  function AllStrainContainer(props:any) {   
    const [styleFile, setStyleFile] = useState('')
    const [nothing, setNothing] = useState()
    const [apiLen, setApiLen] = useState(0)

    // const [bgToggle, setBgToggle] = useState('new')
    // const [textState, setTextState] = useState('')

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
        await props.setClickedStrain(text)
        let callbucket:(string|object)[] = []
            let call2 = await $.ajax({
                method: 'get',
                url: `api/strains/getSpecifiedStrain`,                
                data: {  strain: text  }})    
            
            // callbucket.push(call2)

            // find typeof call2 and get length based on that. possible methods Object.keys()
            let keys = Object.keys(call2)
            let vals = Object.values(call2)
            let keylength:number = keys.length
            setApiLen(keylength)

        let predata = await Axios.create({                        
            transformResponse: [function (data) {                        
                return(data)
            }],
        })
        let axiosfactory = await predata.get(`api/strains/strain/nokey${strainId}`) // oops didn't use async had promise returned.
        
        

        let returnedId = JSON.parse(axiosfactory.data)        
        const {strain, dominant, funfact, parents} = returnedId
        
        await SeeAndSave(keys, apiLen, props.textState, props.setTextState)
        await SeeAndSave(vals, apiLen, props.displayText, props.setTextState)
        // props.setTextState(strain)
        
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

            <li  
            id={id.toString()}
            onClick={strainClick}
            style={{ textAlign: 'center' }}
            key={id}> {strain} </li>                          
            </Card.Body>
            </Card>
            :
            <ul>

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
