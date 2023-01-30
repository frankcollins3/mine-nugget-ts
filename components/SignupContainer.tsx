import styles from 'styles/LoginLogout/LogInOut.module.scss'
import {useGame} from 'Contexts/game'
import Container from 'react-bootstrap/Container'

import Helmet from 'components/Helmet'
import SignupConstraints from 'components/SignupConstraints'


export default function SignupContainer() {
        let sty = styles

        const { checked, choosechecked, usernamestr, passwordstr, 
            emailstr, agestr, pwstrchange, currentinput, currentinputset,
             emailstrchange, agestrchange, userstrchange, passworduppercase, uppercaseset, specialchar, specialcharset, numberchar, numbercharset,
              tooeasy, tooeasyset, tooeasybucket, easybucketset, nocursing, nocursingset, cursingboolean, cursingbooleanset,
              usergood, usergoodset, validemail, validemailset, oldenough, oldenoughset, constraintshow, constraintshowset,
              goldClick, goldClickSet,
              } = useGame()

        // let mainContainer = arrayclass.join("")

         

        return (
            <div 
            style={{ position: constraintshow ? "relative" : "absolute", margin: '0 auto', padding: '0'}}
            className={sty.SignupCont}>

                {goldClick === 'signup' 
                ?
                <Container className={sty.centerYcenterXcolumn}>
                {
                    constraintshow 
                    ?                    
                    <Container className={sty.centerYcenterXcolumn}>    
                    <h1  className={sty.BeMine}> Gold to be Mine. </h1>
                <SignupConstraints/>
                    {/* <img  
                     onClick={() => constraintshowset("true")}
                     style={{ transform: 'scale(0.5)', display: constraintshow ? "none" : "", margin: '0 auto', padding: '0'}}
                     src="/img/magnify.png"
                    /> */}
                <h1  className={sty.BeMine}> Mine to be Gold</h1>
                <img
                        onClick={() => constraintshowset("false")}
                        style={{ height: '25px', width: '25px'}}
                         src="/img/magnify.png"/>
                </Container>
                :
                <div></div>
            }
                </Container>
                :
                <div></div>
            }

                {/* <Container className={sty.endYcenterXcolumn} id={sty.HelmetCont}>                
                
                <Helmet/>   
                <img
                        onClick={() => constraintshowset("true")}
                        style={{ height: '25px', width: '25px'}}
                         src="/img/magnify.png"/>
                </Container> */}

                {/* <img
                onClick={() => constraintshowset('true')}
                style={{ height: '2em', width: '2em', padding: '0', margin: 'auto'}}
                // style={{ transform: 'scale(0.075)', padding: '0', margin: 'auto'}}
                 src="/img/magnify.png"/>                       */}

                 {/* <button onClick={check}></button>                 
                 <button onClick={check2}></button>                                   */}

            </div>
        )
}