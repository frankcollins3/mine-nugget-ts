import Container from 'react-bootstrap/Container';
import ErrorCont from 'styles/Error'
// import Card from 'react-bootstrap'

export default function Error () {
    return ( 
        
        // <Container>
                <Container className="Column">
            <ErrorCont>
                {/* time for an image bank! */}

              <img src="/img/barrier.png"></img>
              <img src="/img/dynamite.png"></img>
              <img src="/img/barrier.png"></img>
              {/* <img src="/img/pick.png"/> */}
              {/* i was going to use a no-digging sign */}
              {/* barrier dynamite barrier */}
              {/* everything blew up! */}
            </ErrorCont>
                </Container>
        //  </Container> 
        
        
    )
}
