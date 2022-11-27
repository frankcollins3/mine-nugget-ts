import styled from 'styled-components';
import $ from 'jquery'



const Display = styled.div`        
        opacity: ${props => props.clickedStrain === undefined ? "0.1" : "1.0"};       
        
        
        display: flex;
        flex-flow: column wrap;
        justify-content: center;
        align-items: center;
        margin-top: 2em;
        // color: papayawhip;
        min-height: 8vh;
        min-width: 50vw;
        `        
        
        const CardStyle = styled(Display)`
        // background-color: ${props => props.bgToggle === 'new' ? "rgb(62, 50, 32)" : "transparent"};       
        // background-color: ${props => props.bgToggle === 'new' ? "red" : "transparent"};       
        box-shadow: 10px 10px 10px rgb(247, 208, 32);    
        border: 3px solid rgb(247, 208, 36);
    
        
        
        
     
`







export default CardStyle
// export default [Display, CardStyle]
