import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ErrorCont from 'styles/Error'
// import Card from 'react-bootstrap'

export default function Error () {
    return ( 
        
        // <Container>
                <Container className="Column">
            <ErrorCont>
                {/* time for an image bank! */}
              <Row>
              <Col>
              <img src="/img/barrier.png"></img>
              </Col>
              <Col>
              <img src="/img/dynamite.png"></img>
              </Col>
              <Col>
              <img src="/img/barrier.png"></img>
              </Col>
              </Row>
              {/* <img src="/img/pick.png"/> */}
                          
            </ErrorCont>
                </Container>
        //  </Container> 
        
        
    )
}
