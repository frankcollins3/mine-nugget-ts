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
import {useUrl} from 'Contexts/Url'

// * utility 
import ReturnUrl from 'utility/ReturnUrl'
import Siblings from 'utility/JqSiblings'
import AttrTool from 'utility/JqAttr'
import POST from 'utility/POSTdataJS'

import SignupConstraints from 'components/SignupConstraints'
import SignupContainer from 'components/SignupContainer'

export default function InOut (props) {

    let badwords = props.clientenv.DONTSAYTHAT
    let ezpre = props.clientenv.EZGUESS
    let ezjar = ezpre.split(',')

    let swearjar = badwords.split(',')
    let ezguess = Object.values(ezjar)

    // const [goldClick, setGoldClick] = useState('')    
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

    const { allStrain, getSpecifiedStrain, userStrainPost, getAllUsers  } = useUrl()  //obj destructuring

    const {
        checked, choosechecked, usernamestr, passwordstr, 
        emailstr, agestr, pwstrchange, url, urlSetter,
         emailstrchange, agestrchange, userstrchange, passworduppercase, uppercaseset, specialchar, specialcharset, numberchar, numbercharset,
          tooeasy, tooeasyset, tooeasybucket, easybucketset, nocursing, nocursingset, cursingboolean, cursingbooleanset,
          usergood, usergoodset, validemail, validemailset, oldenough, oldenoughset, constraintshow, constraintshowset,
          goldClick, goldClickSet,
          currentinput, currentinputset, 
usernameinput, usernameinputset, passwordinput, passwordinputset, emailinput, emailinputset, ageinput, ageinputset
    } = useGame()

    const userobject = new Map([
        ['username', ''],
        ['password', ''],
        ['email', ''],
        ['age', ''],
      ]);
    
    useEffect( () => {
        urlSetter(path)  
        nocursingset(swearjar)    
        easybucketset(ezjar) 
    }, [])

    const check = async () => {
        console.log("were just checking")        
    }

    const check2 = () => {
        console.log('nocursing')
        console.log(nocursing)
    }

    const changehandler = async (event) => {
        let target = $(event.target)    
        let typedchar:string = event.target.value
        let targetText = event.target.defaultValue

        if (targetText === 'username') {
            console.log('getAllusers')
            console.log(getAllUsers)
            let alldb = await POST(getAllUsers, 'data')
            console.log('alldb')
            console.log(alldb)
            usernameinputset(typedchar)
        }
        if (targetText === 'password') {
            passwordinputset(typedchar)
        }
        if (targetText === 'email') {
            emailinputset(typedchar)
        }
        // currentinputset(typedchar)
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
            goldClickSet('signup')
            // setGoldClick('signup')
            setTimeout( () => AttrTool($('#AgeInput'), 'value', 'age'), 1000)
            setTimeout( () => AttrTool($('#EmailInput'), 'value', 'email'), 1000)
        }
        else if (siblingText === 'Login') {
            goldClickSet('login')
        }
        if (siblingText === '' || siblingText === undefined || siblingText === null) {
            goldClickSet('')            
        }
    }

    const semisubmit = () => {
    
        $('input').each( (index, elem:any) => {                    
            let jqelem = $(elem)[0]         
            // let jqelem = $(elem)         
            // let value = jqelem[0].attributes[1].nodeValue            
            let value:any = jqelem.value          
        })
    }

    const toggleshow = () => {
        if (constraintshow === false) {
            constraintshowset('true')            
        }
        if (constraintshow === true) {
            constraintshowset('false    ')
        }
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

            

            {/* <img
                style={{ transform: 'scale(0.075)'}}
                src="/img/magnify.png"/> */}

                { goldClick === 'login' || goldClick === 'signup'
                    ?
                    <>
                    <img
                        onClick={toggleshow}
                        style={{ height: '25px', width: '25px', display: 'grid', placeContent: 'center', marginTop: '0.5em' }}
                         src="/img/magnify.png"/>
                    <div
                    // onMouseEnter={semisubmit}
                    onClick={semisubmit}
                    className={sty.MiniGoldBar}
                    ></div>                    
                    </>
                    :
                    <div></div>
                }
{/* 
            <SignupContainer/> */}
        

            {goldClick === 'signup' 
            
                ?
                <Container className={sty.centerYcenterXcolumn}>

                    
                    
                {
                    constraintshow 
                    ?                    
                    <Container className={sty.centerYcenterXcolumn}>

                        <div className="Row">                    

                        </div>

                        <h1  className={sty.BeMine}> Gold To Be Mine.</h1>
                <SignupConstraints/>
                <div className="row">
                <h1  className={sty.BeMine}> Mine to be Gold.</h1>
                {/* <h1  className={sty.BeMine}> Gold To Be <span>Mine</span> to be Gold</h1> */}
                    
                </div>
                </Container>
                :
                <div></div>
                }
                </Container>
                :
                <div></div>
            }
            
            <Container className={sty.endYcenterXcolumn} id={sty.HelmetCont}>                                
                <Helmet/>   
                
                
                </Container>
        </Page>
        
        )
    }

    export async function getServerSideProps (context) {
        let url:any = await ReturnUrl(context);
        let localhost:string = url
        let predata = await fetch(new URL(`${url}/api/strains/strain`))            
        let propurl = await predata.json()        
        let clientenv = process.env
        
                
        return {
            props: {
                localhost, clientenv           
            }
        }
    }

    // * this page will have state that when given a number it uses ternary rendering to render difference custom footers.
    // * one page ninja input. swap login or logout by state.
    // * {we dig you: shovel} {youre pure gold: goldbar} {gold to be mine mine to be gold: mine with border, viva oro: cactus}
