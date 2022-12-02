import Container from 'react-bootstrap/Container'

import styled from 'styled-components'
import CardStyle from 'styles/StrainDisplay'

let ptag = 'PickMineP' 
let column = 'Column'


let double = [column, ptag].join(' ')
// let tripleclass = [column, ptag, CardStyle].join(' ')


export default function PickMines() {
    return (


        <Container fluid="md">
        {/* <div >             */}
        <CardStyle>
        <p className={double}> test text </p>

        </CardStyle>
        {/* </div> */}
        </Container>
    )
}
