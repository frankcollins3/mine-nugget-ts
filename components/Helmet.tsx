import styles from 'styles/findmine/sass/FindMine.module.scss'
import Container from 'react-bootstrap/Container'

export default function Helmet () {
    let sassdiv:string = styles.div
    let helmet:string = styles.helmet
    let barrier:string = styles.barrier

    // let halfsizediv = [styles.div, ".halfpint"].join(" ")

    return (
                
        <Container className={styles.div}>
        <img src="/img/helmet.png" className={helmet} ></img>
        <img src="/img/barrier.png" className={barrier}></img>            
        </Container>
        
        
    )
}
