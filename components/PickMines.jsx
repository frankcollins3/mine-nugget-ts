import Container from 'react-bootstrap/Container'

import styled from 'styled-components'
import CardStyle from 'styles/StrainDisplay'
import MineCont from 'styles/PickMines'



let ptag = 'PickMineP' 
let column = 'Column'


let double = [column, ptag].join(' ')
// let tripleclass = [column, ptag, CardStyle].join(' ')


export default function PickMines() {
    return (


        <Container
         style={ {
             display: 'flex',
             flexDirection: 'column',
             justifyContent: 'center',
             alignItems: 'center',
             height: '30%',
             width: '30%'
         }}
        >
                
         {/* <p className={double}> test text </p>  */}
         <MineCont
        className={double}        
            
         >
         <img  
        style={ { height: '5em', width: '5em'}}
        src="/img/pick.png"/>
         </MineCont>
         </Container>

    )
}
