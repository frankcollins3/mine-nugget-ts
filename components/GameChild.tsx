import styles from 'styles/game/sass/FamilyTree.module.scss'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
 

export default function GameChild () {


    return (
        <>
        <div className={styles.GameChild}>
            <img className={styles.coin} src="img/coin.png"/>
            <img className={styles.coin} src="img/coin.png"/>
            <img className={styles.coin} src="img/coin.png"/>            
        </div>
        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button  type="submit">
        Submit
      </Button>
    </Form>
        </>
    )
}