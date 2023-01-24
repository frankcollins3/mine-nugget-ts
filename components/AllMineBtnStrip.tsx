import styles from 'styles/findmine/sass/FindMine.module.scss'

export default function AllMine () {

    const testclick = () => {
        console.log('test the click!')
    }

    return (
        <div className="Column">

        <div className={styles.row}>
    
        <div
        onClick={testclick}
        id="selectBtn1" className={styles.allOrMine}        
        >
        <p                
        >All</p>               
        </div>

<div 
style={{ marginTop: '2em'}} className={styles.MiniGoldBar}></div>

        <div
        onClick={testclick}
        id="selectBtn1" className={styles.allOrMine}
        >
        <p                
        >All</p>               
        </div>

    </div>     
        </div>

        


    )
}