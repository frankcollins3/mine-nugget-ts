    import Container from 'react-bootstrap/Container'

    import styled from 'styled-components'
    import CardStyle from 'styles/StrainDisplay'
    import MineCont from 'styles/PickMines'
    import {useEffect, useState} from 'react'



    let ptag = 'PickMineP' 
    let column = 'Column'


    let double = [column, ptag].join(' ')
    // let tripleclass = [column, ptag, CardStyle].join(' ')


    export default function PickMines(props) {

        console.log('props in pickmines')
        console.log(props)


        let globalstate = props.global
        let clickedStrain = props.global.clickedStrain

        console.log('clickedStrain')
        console.log(clickedStrain)
        
        const [global, setGlobal] = useState()
        const [save, setSave] = useState(false)
        const [savedStrain, setSavedStrain] = useState('')

        useEffect( () => {
            setGlobal(globalstate)
        }, [])    

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
                    
            {/* <p className={double}> test text </p>  */}
            <MineCont
            className={double}        
                
            >
        
            <img  
            onClick={() => {
                setSavedStrain(props.global.clickedStrain)
                setSave(true)
                
            }}
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
            > 'You Saved {props.global.clickedStrain}!'</h3>
            <p
            style = { { color: 'white', fontWeight: 'bold' }}
            > gold to be mine. mine to be gold. </p>
            </>
            }
            </MineCont>
            </Container>

        )
    }
