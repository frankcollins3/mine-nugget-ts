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


        // <Container>
        
        <MineCont>
        {/* <p className={double}> test text </p> */}
        <img  
        style={ { height: '5em', width: '5em'}}
        src="/img/pick.png"/>
        </MineCont>

        // </Container>
    )
}
