
// components and styles
import Container from "react-bootstrap/Container"
import PanelUserUI from "../PanelUserUI"
import styles from "./PanelUserDataCont.module.scss"

export default function PanelUserData( {userData} ) {
    return <RENDER userData={userData}/>
}

function RENDER({userData}) {

    

    

    return (        
            userData &&
            userData.map( (item, index) => {
                // CURRENT_USER.username !== userData[index].username && localStateHide === false

                return (                
                    <PanelUserUI index={index} key={index} userData={userData}/>
                )
            })        
    )
}