// Button.js
import styled from 'styled-components';

const Display = styled.div`
    
    
    opacity: ${props => {
        console.log('props in the styled component ')
        console.log(props)
    }}

    margin-top: 1.5em;
    border: 5px solid papayawhip;
    height: 200px;
    width: 400px;    
  }
`
export default Display;
