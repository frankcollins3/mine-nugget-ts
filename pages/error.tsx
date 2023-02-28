import {useRef} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ErrorCont from 'styles/Error'
import styles from 'styles/Misc.module.sass'
import Random from 'utility/Randomizer'
import Resize from 'hooks/MediaQuery'

export default function Error (props) {    
    // console.log('props')
    // console.log(props)
    let globalappstate:(object|string) = props.globalstate
    console.log('globalappstate')
    console.log(globalappstate)

    let targetRef = useRef(null)
    const changeSize = async () => {
        let screenSizeBucket:(string)[] = ['800px', '400px', '1200px']
        let randomSize:string =  await Random(screenSizeBucket)        
    }
    
    return ( 
        
        <pre ref={targetRef}>
            {/* <Container> */}
            <Container className="Column">
                {/* <p> {media.matches } </p> */}
            <ErrorCont>
                {/* time for an image bank! */}
              <Row>
              <Col>
              <img 
              className={styles.StrainImage}
              src="/img/barrier.png"></img>
              </Col>
              <Col>              
              <img
               className={styles.StrainImage}
               src="/img/dynamite.png"></img>
              </Col>
              <Col>
              <img
               className={styles.StrainImage}
               src="/img/barrier.png"></img>
              </Col>
              </Row>
              {/* <img src="/img/pick.png"/> */}
                          
            </ErrorCont>
            <button onClick={changeSize}></button>
                </Container>
               </pre>
        //  </Container> 
        
        
    )
}
