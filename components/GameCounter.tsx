import Container from 'react-bootstrap/Container'

export default function GameCounter (props) {
    return (

        <Container
        className="GameCounter"        
        style={{
             display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',
             border: 'none', boxShadow: 'none'
        }}
        >            
        <p> Wrong Guess: </p>
        <p> Win Streak: </p>
        </Container>
        
    )
}