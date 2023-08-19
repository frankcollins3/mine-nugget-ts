
// components and styles
import Container from "react-bootstrap/Container"
import PanelUserUI from "../PanelUserUI"
import styles from "./PanelUserDataCont.module.scss"

export default function PanelUserData( {userData} ) {
    return <RENDER userData={userData}/>
}

function RENDER({userData}) {

    console.log('userData from component', userData)

    return (
        
            userData &&
            userData.map( (item, index) => {
                return (                
                    <PanelUserUI index={index} key={index} userData={userData}/>
                )
            })        
    )
}