import styled from 'styled-components';



const Display = styled("div")`
${props => {
    console.log('props firing props from the styled component')
    console.log(props)
    console.log(props.clickedStrain)
    if (props.clickedStrain === undefined ) {
        console.log("props.clickedstrain = undefined")
    }
    props.clickedStrain && `
    display: inline;
    padding-top: 10px;
    padding-right: 30px;    
    border: ${props.clickedStrain === undefined ? '5px solid hotpink' : '3px solid blue'}
    `}
}
`;


export default Display
