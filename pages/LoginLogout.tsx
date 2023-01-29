import Helmet from 'components/Helmet'
import {useEffect, useState} from 'react'
import $ from 'jquery'
import Container from 'react-bootstrap/Container'
import {useRouter} from 'next/router'

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

// import { loadEnvConfig } from '@next/env'

let seeit = process.cwd()



export default function InOut (props) {

console.log('seeit')
console.log(seeit)

console.log('process')
console.log(process)

// console.log('loadEnvConfig loginlogout')
// console.log(loadEnvConfig)
    
    const { username, password, email, age, strains, 
        playing, gameOn, url, urlSetter, 
        checked, choosechecked, usernamestr, passwordstr, emailstr, agestr, pwstrchange, emailstrchange, agestrchange, userstrchange,
        currentinput, currentinputset
    } = useGame()

    console.log('props')
    console.log(props)

    const userobject = new Map([
        ['username', ''],
        ['password', ''],
        ['email', ''],
        ['age', ''],
      ]);
    // const {userName, password, email, age, strains, quickcheck} = useUser()
    const [goldClick, setGoldClick] = useState('')    
        let router = useRouter()
        let path = router.asPath    
        let pathProps = {
            pathprop: path
        }
        let URLclient = props.localhost
        let sty = styles        // sty:object
        let centerYbetweenXrow = [sty.centerYbetweenXrow, sty.flex].join(" ")
        let centerYcenterXcolumn  = [sty.centerYcenterXcolumn, sty.flex].join(" ")
        let rowandborder = [sty.centerYbetweenXrow, sty.blueborder].join(" ")
        let UsernameInputDouble = [sty.UsernameInput, "SignupUsername"].join(" ")


    
    useEffect( () => {
        urlSetter(path)        
    }, [])


    

    const check = async () => {
        console.log("were just checking")
        playing()        
        // urlSetter(path)
    }

    const check2 = () => {
        console.log(userobject)
    }

    const changehandler = (event) => {
        let target = $(event.target)    
        let typedchar:string = event.target.value
        currentinputset(typedchar)
        // console.log(event)
        
    }


    const goldClickFunc = async (event) => {        
        let siblings:any = await Siblings(event.target)
        let siblingText:string = siblings[0].outerText

        console.log($('#UserNameInput'))

        setTimeout( () => {
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

    // choosechecked('im choosing checked!')
        // userstrchange('hey watsup')
        // pwstrchange('nice new password')
        // emailstrchange('@gmail.com')
        // agestrchange('happy birthday')
    // * nugget click function
    
    const semisubmit = () => {
        console.log("hey lets see the deal")

        $('input').each( (index, elem:any) => {                    
            let jqelem = $(elem)[0]         
            // let jqelem = $(elem)         
            // let value = jqelem[0].attributes[1].nodeValue            
            let value:any = jqelem.value          
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

            {/* <p style={{ color: 'moccasin', fontWeight: 'bold', fontSize: '30px'}}> {checked} </p> */}



            { goldClick === 'signup' 
                ?
            <Container className={centerYcenterXcolumn} id={sty.LoginDiv}>

            <input  id="UsernameInput" onChange={changehandler} />
            <input  id="PasswordInput" onChange={changehandler} />
            <input  id="EmailInput" onChange={changehandler} />
            <input  id="AgeInput" onChange={changehandler} />
        
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

                {/* <p style={{ color: 'moccasin', fontWeight: 'bold', fontSize: '30px'}}> {checked} </p> */}
                 {/* <p style={{ color: 'moccasin', fontWeight: 'bold', fontSize: '30px'}}> {usernamestr} </p> */}
                 {/* <p style={{ color: 'moccasin', fontWeight: 'bold', fontSize: '30px'}}> {agestr} </p>
                 <p style={{ color: 'moccasin', fontWeight: 'bold', fontSize: '30px'}}> {emailstr} </p>
                 <p style={{ color: 'moccasin', fontWeight: 'bold', fontSize: '30px'}}> {passwordstr} </p> */}
            
            {goldClick === 'signup' 
                ?
                <Container className={sty.centerYcenterXcolumn}>
                <h1  className={sty.BeMine}> Gold to be Mine. </h1>
            <SignupConstraints/>
                <h1  className={sty.BeMine}> Mine to be Gold</h1>
                </Container>
                :
                <div></div>
            }
            

            <Container className={sty.endYcenterXcolumn} id={sty.HelmetCont}>
                <Helmet/>
                 <button onClick={check}></button>                 
                 <button onClick={check2}></button>                 
                 {/* <button onClick={usernamestr}></button>                  */}

            
            </Container>
        </Page>
        
        )
    }

    export async function getServerSideProps (context) {
        let url:any = await ReturnUrl(context);
        let localhost:string = url
        let predata = await fetch(new URL(`${url}/api/strains/strain`))            
        let propurl = await predata.json()        

        // let envVar = process
        // let envVar = process.env
                
        return {
            props: {
                localhost           
            }
        }
    }

    // * this page will have state that when given a number it uses ternary rendering to render difference custom footers.
    // * one page ninja input. swap login or logout by state.
    // * {we dig you: shovel} {youre pure gold: goldbar} {gold to be mine mine to be gold: mine with border, viva oro: cactus}
