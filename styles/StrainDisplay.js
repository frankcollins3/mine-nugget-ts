// Button.js
import styled from 'styled-components';

const Display = styled.div`
    
    opacity: ${props => props.clickedStrain ? "1.0" : "0.1"};
    margin-top: 1.5em;
    border: 5px solid hotpink;
    height: 200px;
    width: 400px;    
  }
`
export default Display;
