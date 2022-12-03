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
                {/* time for an image bank function! */}

              <img src="/img/barrier.png"></img>
              <img src="/img/dynamite.png"></img>
              <img src="/img/barrier.png"></img>
              {/* <img src="/img/pick.png"/> */}
              {/*  was going to use  no-digging sign */}
              {/* barrier dynamite barrier */}
              {/* everything blew up! */}
            </ErrorCont>
                </Container>
        //  </Container> 
        
        
    )
}
