import styles from 'styles/findmine/sass/FindMine.module.scss'

export default function Helmet () {
    return (
        <div className={styles.div}>
        <img src="/img/helmet.png" className={styles.helmet}></img>
        <img src="/img/barrier.png" className={styles.barrier}></img>            
        {/* <p> hey </p> */}
        </div>            
    )
}