// * dependencies
import {connect} from 'react-redux';
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import styles from 'styles/game/sass/FamilyTree.module.scss'
// * CSS
import ShadowBorder from 'styles/game/components/GameContainer'



// * components:
import ParentRing from 'components/ParentRing'
import ParentWatch from 'components/ParentWatch'
import Container from 'react-bootstrap/Container'
import Family from 'components/FamilyTreeContainer1'
import Family2 from 'components/FamilyTreeContainer2'





export default  function GameContainer (props) {
    console.log('props from the GameContainer!!!!')
    console.log(props)
    let parents:string = props.redux
    return (
        <>

            <ShadowBorder>
        <div>
        


        <div 
        className={styles.Row2}>
        <Family/>
        <Family/>
        <Family/>
        </div>
        
        

        <Container className={styles.Row}>
            {/* <div className={styles.Row}> */}
            <Container className={styles.ColumnParent}>
            <ParentRing parents={parents}/>
            <h1> {parents || ''}</h1>
            </Container>

            <Container className={styles.ColumnParent}>
            <ParentWatch parents={parents}/>
            <h1> {parents || ''}</h1>            
            </Container>
            {/* </div> */}
        </Container>
        

        {/* <Family2/> */}

        <div 
        className={styles.Row2}>
        <Family/>
        <Family/>
        <Family/>
        </div>
        
        


        </div>
            </ShadowBorder>
        </>
    )
}
