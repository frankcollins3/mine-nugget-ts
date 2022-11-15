// import modulecss from '../styles/Strain.module.scss'
import styles from '../styles/Strain.module.scss'
// import '../styles/globals.css'
// import globals from '../styles/globals.css'


export default function Strain (){
    const classList = [styles.Page, 'Column'].join(" ")
    const textClasses = [styles.FontSizeTest, styles.BorderTest].join(" ");
    // const classList = [modulecss.Parent-Cont, modulecss.Test-Border].join(" ")


    return (
    // let doubleClass = [modulecss.Parent-Cont, ]
        <div className={classList}>
            <h1> yeah buddy </h1>
            <p className={textClasses}> quick look </p>
        </div>
    )
}