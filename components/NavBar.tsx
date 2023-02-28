import styles from 'styles/NavBar.module.scss'
import Link from 'next/link'
import {useGame} from 'Contexts/game'
import Helmet from 'components/Helmet'
import {useState, useEffect} from 'react'

export default function NavBar () {

    const [isUser, setIsUser] = useState(false)

    useEffect( () => {
        let currentUsername = window.localStorage.getItem('currentUserName')        
        currentUsername ? setIsUser(true) : setIsUser(false)
    }, [])

    const {   currentuserset, currentUser, currentUserName, currentusernameset, currentuseridset,  currentUserId   } = useGame()

    const logout = () => {
        currentuserset([])  
        currentusernameset('')
        currentuseridset(0)
        window.localStorage.setItem('currentUserId', '')
        window.localStorage.setItem('currentUserName', '')
        window.localStorage.setItem('myStrains', '')
        setIsUser(false)
    }

    return (
        
        <div id={styles.NavContainer}>            
    
            <Link href="/strain">
            <div style={{ backgroundImage: 'url(/img/gold.png)'}} className={styles.NavBtn} id="StrainLink"></div>
            </Link> 

            <Link href="/findmine">
            <div style={{ backgroundImage: 'url(/img/magnify.png)'}} className={styles.NavBtn} id="FamTreeLink"></div>        
            </Link>

        <Link href="/famtree">
            <div style={{ backgroundImage: 'url(/img/ring.png)'}} className={styles.NavBtn} id="FindMineLink"></div>                    
            </Link>

            <img
            onClick={logout}
            style={{ display: isUser  ? 'block' : 'none'}}            
            className={styles.cart} src="/img/cart.png"></img>
        </div>        
    )
}
