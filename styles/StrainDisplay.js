import styled from 'styled-components';



const Display = styled.div`    
    opacity: ${props => props.clickedStrain === undefined ? "1.0" : "0.1"};
    border: 5px solid hotpink;
    min-height: 10vh;
    min-width: 10vw;
`





export default Display
