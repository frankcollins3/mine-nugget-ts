import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ErrorCont from 'styles/Error'
import styles from 'styles/Misc.module.sass'
import Random from 'utility/Randomizer'


export default function Error () {    
    const changeSize = async () => {
        // window.addEventListener("resize", '1000px');
        let screenSizeBucket:(string)[] = ['800px', '400px', '1200px']
        let randomSize:string =  await Random(screenSizeBucket)
        // import Card from 'react-bootstrap'
        console.log('randomSize')
        console.log(randomSize)
    }
    return ( 
        
        // <Container>
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
        //  </Container> 
        
        
    )
}
