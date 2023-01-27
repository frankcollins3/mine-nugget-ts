import Helmet from 'components/Helmet'
import {useEffect, useState} from 'react'
import $ from 'jquery'
import Container from 'react-bootstrap/Container'

//* CSS  */
import styles from 'styles/LoginLogout/LogInOut.module.scss'
import Page from 'styles/LoginLogout/styledcomponents/Page'

// * state / context
import {useGame} from 'Contexts/game'

// * utility 
import ReturnUrl from 'utility/ReturnUrl'
import Siblings from 'utility/JqSiblings'
import AttrTool from 'utility/JqAttr'

import SignupConstraints from 'components/SignupConstraints'


export default function InOut (props) {
    
    const {username, password, 
        email, age, strains, 
        playing, gameOn} = useGame()
    // const {userName, password, email, age, strains, quickcheck} = useUser()

    const [goldClick, setGoldClick] = useState('')
    
    

    // const {username, password, age, email} = useUser()
    
    let URLclient = props.localhost

    let sty = styles        // sty:object
    let centerYbetweenXrow = [sty.centerYbetweenXrow, sty.flex].join(" ")
    let centerYcenterXcolumn  = [sty.centerYcenterXcolumn, sty.flex].join(" ")
    let rowandborder = [sty.centerYbetweenXrow, sty.blueborder].join(" ")

    let UsernameInputDouble = [sty.UsernameInput, "SignupUsername"].join(" ")
    

    const check = async () => {
        console.log("were just checking")
        playing()
    }

    const changehandler = (event) => {
        let target = $(event.target)
        
        // AttrTool(target, 'value', '');
        // AttrTool()
    }

    const goldClickFunc = async (event) => {
        console.log(event)
        let siblings:any = await Siblings(event.target)
        let siblingText:string = siblings[0].outerText

        console.log($('#UserNameInput'))

        // $('#UsernameInput').css('border', '5px solid hotpink')

        setTimeout( () => {
            // $('#UsernameInput').css('border', '5px solid hotpink')
            AttrTool($('#UsernameInput'), 'value', 'username')
            AttrTool($('#PasswordInput'), 'value', 'password')        
        }, 1000)

        if (siblingText === 'Signup') {
            setGoldClick('signup')
            setTimeout( () => AttrTool($('#AgeInput'), 'value', 'age'), 1000)
            setTimeout( () => AttrTool($('#EmailInput'), 'value', 'email'), 1000)
        }
        else if (siblingText === 'Login') {
            setGoldClick('login')
        }
        if (siblingText === '' || siblingText === undefined || siblingText === null) {
            setGoldClick('')            
        }
    }
    
    const semisubmit = () => {
        $('input').each( (index, elem:any) => {                    
            let jqelem = $(elem)            
            let value = jqelem[0].attributes[1].nodeValue            
            console.log('jqelem')
            console.log(jqelem)
            
            console.log('value')
            console.log(value)

            console.log('elem.value')
            console.log(elem.value)
            
            if (value === 'age' || value === 'username' || value === 'email' || value === 'age') {

            }
            
        })
        
    }
    
    return (                            
        <Page>
            <img 
            onClick={goldClickFunc}
            className={sty.GoldBar} 
            style={{ 
                display: goldClick === 'signup' || goldClick === 'login' ? 'flex' : 'none',
                transform: 'scale(0.25)',
                  }} 
            src="/img/gold.png"/>
            <Container style={{  maxWidth: '100vw'}} className={centerYbetweenXrow}>      

            <Container
            style={{ display: goldClick === 'signup' || goldClick === 'login' ? 'none' : 'flex' }}
            // style={{ display: goldClick === 'signup' || goldClick === 'login' ? 'none' : 'flex' }}
            className={centerYcenterXcolumn}>
            <img onClick={goldClickFunc} className={sty.GoldBar} src="/img/gold.png"/>
            <p className={sty.UserText}> Login</p>
            </Container>
        
            { goldClick === 'login' 
                ?
            <Container className={centerYcenterXcolumn} id={sty.LoginDiv}>
            
            <input  id="UsernameInput" onChange={changehandler} />
            <input  id="PasswordInput" onChange={changehandler} />
        

            </Container>
            :
            <div></div>
            }


            { goldClick === 'signup' 
                ?
            <Container className={centerYcenterXcolumn} id={sty.LoginDiv}>

            <input  id="UsernameInput" onChange={changehandler} />
            <input  id="PasswordInput" onChange={changehandler} />
            <input  id="AgeInput" onChange={changehandler} />
            <input  id="EmailInput" onChange={changehandler} />
        
            {/* <div onClick={semisubmit} className={sty.MiniGoldBar}></div> */}
            
            </Container>
            :
            <div></div>
            }


            <Container 
            style={{ display: goldClick === 'signup' || goldClick === 'login' ? 'none' : 'flex' }}
            className={centerYcenterXcolumn}>
            <img onClick={goldClickFunc} className={sty.GoldBar} src="/img/gold.png"/>
            <p className={sty.UserText}> Signup</p>
            </Container>

            </Container>

                { goldClick === 'login' || goldClick === 'signup'
                    ?
                    <div
                    // onMouseEnter={semisubmit}
                     onClick={semisubmit}
                    className={sty.MiniGoldBar}></div>
                    :
                    <div></div>
                }
            
            {goldClick === 'signup' 
                ?
            <SignupConstraints/>
                :
                <div></div>
            }

            <Container className={sty.endYcenterXcolumn} id={sty.HelmetCont}>
                <Helmet/>
                {/* <button onClick={check}></button>
                <p> {username} </p>
                <p> {gameOn} </p> */}
            </Container>
        </Page>
        
        )
    }

    export async function getServerSideProps (context) {
        let url:any = await ReturnUrl(context);
        let localhost:string = url
        let predata = await fetch(new URL(`${url}/api/strains/strain`))            
        let propurl = await predata.json()        
                
        return {
            props: {
                localhost                
            }
        }
    }

    // * this page will have state that when given a number it uses ternary rendering to render difference custom footers.
    // * one page ninja input. swap login or logout by state.
    // * {we dig you: shovel} {youre pure gold: goldbar} {gold to be mine mine to be gold: mine with border, viva oro: cactus}
