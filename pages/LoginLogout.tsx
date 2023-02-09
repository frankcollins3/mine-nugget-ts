import {useEffect, useState} from 'react'
import $ from 'jquery'
import Container from 'react-bootstrap/Container'
import {useRouter} from 'next/router'
import bcrypt from 'bcryptjs'
import Axios from 'axios'


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
import POSTuserCLASS from 'utility/POSTuser'
import Regex from 'utility/MasterRegex'
import FindIndex from 'utility/FindIndexForIn'
import ElemEndpoint from 'utility/JqElemEndpoint'

import SignupConstraints from 'components/SignupConstraints'
import SignupContainer from 'components/SignupContainer'
import Helmet from 'components/Helmet'


    
    console.log('bcrypt')
    console.log(bcrypt)

    


    let usernamearray = new Array()

    export default function InOut (props) {

        const [opacityToggle, setOpacityToggle] = useState(false)

        // const [returnstring, setReturnstring] = uses
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

        // * api hitting routes 
        const { allStrain, getSpecifiedStrain, userStrainPost, getAllUsers, POSTuser } = useUrl()  //obj destructuring
        let POSTuserREBUILD = URLclient += POSTuser
        let GETuserspecifyURL = props.GETuserspecifyURL
        console.log('GETuserspecifyURL')
        console.log(GETuserspecifyURL)

        // * global state from /Contexts/game
        const {
            checked, choosechecked, usernamestr, passwordstr, 
            emailstr, agestr, pwstrchange, url, urlSetter,
            emailstrchange, agestrchange, userstrchange, passworduppercase, uppercaseset, specialchar, specialcharset, numberchar, numbercharset,
            tooeasy, tooeasyset, tooeasybucket, easybucketset, nocursing, nocursingset, cursingboolean, cursingbooleanset, userunique,
            usergood, usergoodset, validemail, validemailset, oldenough, oldenoughset, constraintshow, constraintshowset,
            goldClick, goldClickSet,
    currentinput, currentinputset, usernameinput, usernameinputset, passwordinput, passwordinputset, emailinput, emailinputset, ageinput, ageinputset, 
            alluser, alluserset, allusername, allusernameset,
            wrongMsg, wrongmsgset, whatsWrongProblem, whatswrongproblemset, currentusernameset, currentUser, currentUserName, currentuserset
            //  whatsWrong
        } = useGame()

        const userobject = new Map([
            ['username', 'myuser'],
            ['password', 'mypassword'],
            ['email', 'myemail'],
            ['age', 'myage'],
        ]);
        
        useEffect( () => {
            
            // * hit the modular POST function with the getAllUsers and setState to username state
            (async() => {
                let predata:any = await POST(getAllUsers, 'data')            
                let returndata = predata.returndata
                let alldb = returndata.data.users

                // let alldbusername = Object.values(alldb)
                const loopandpush = () => {
                    alldb.forEach( (dbitem) => {
                        usernamearray.push(dbitem.username)
                    })
                }

                const fillbucket = () => {
                    allusernameset(usernamearray)
                }

                const bothfunctions = async () => {
                    await loopandpush() 
                    await fillbucket()                
                }
                bothfunctions()
                

                alluserset(alldb)                        
            })()

            urlSetter(path)  
            nocursingset(swearjar)    
            easybucketset(ezjar) 
        }, [])

        const changehandler = async (event) => {
            let target = $(event.target)    
            let typedchar:string = event.target.value
            let targetText = event.target.defaultValue

            if (targetText === 'username') {
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

        const loginchangeHandler = async () => {
            // was going to deal with params in the above function, would just like to separate concerns for speed and ease of use.
            console.log('loginchangehandler function')
            
        }

        const goldClickFunc = async (event) => {        
            let siblings:any = await Siblings(event.target)
            let siblingText:string = siblings[0].outerText

            setTimeout( () => {
                AttrTool($('#UsernameInput'), 'value', 'username')
                AttrTool($('#PasswordInput'), 'value', 'password')        
                AttrTool($('#LoginUsernameInput'), 'value', 'username')
                AttrTool($('#LoginPasswordInput'), 'value', 'password')        
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
        
        let bucketbucket = []
        let passwordbucket = new Array()
        let emailbucket = new Array()

        const semisubmit = async () => {            
            
                if (passworduppercase === true && specialchar === true && numberchar === true && validemail && ageinput && tooeasy === false && userunique === false ) {

                if (goldClick === 'signup') {
                
                let UsernameInputid = $('#UsernameInput')[0].attributes[0].nodeValue
                let PasswordInputid = $('#UsernameInput')[0].attributes[0].nodeValue
                let EmailInputid = $('#UsernameInput')[0].attributes[0].nodeValue
                let AgeInputid = $('#UsernameInput')[0].attributes[0].nodeValue

                let UsernameInputById:any = document.getElementById('UsernameInput')
                let PasswordInputById:any = document.getElementById('PasswordInput')
                let EmailInputById:any = document.getElementById('EmailInput')
                let AgeInputById:any = document.getElementById('AgeInput')

                let usernamevalue = UsernameInputById.value
                let passwordvalue = PasswordInputById.value
                let emailvalue = EmailInputById.value
                let agevalue = AgeInputById.value


                let indexbucket = [{UsernameInputid:usernamevalue}, {PasswordInputid:passwordvalue}, {EmailInputid:emailvalue}, {AgeInputid:agevalue}]
                // let indexbucket = [UsernameInputID, PasswordInputID, EmailInputID, AgeInputID]
                let allIndex = await FindIndex(indexbucket, 'I')
                console.log('allIndex')
                console.log(allIndex)
                
                let newuser = await POSTuserCLASS(POSTuserREBUILD, allIndex)
                console.log('newuser')
                console.log(newuser)                            
            }
            else {                
                let inputstate = [{passwordU:passworduppercase}, {passwordS:specialchar},{passwordN:numberchar}, {emailE:validemail}]        
                const whatsWrong = async (inputstate:any[]) => {
                    let MsgMap = new Map()
                    
                    MsgMap.set('password', '')
                    MsgMap.set('email', '')
                    let stringbucket:any = []
                
                    await inputstate.forEach(async(stateitems) => {                                    
                        let stateVal = Object.values(stateitems)[0]
                        if (stateVal === false) {
                            let stateKey = Object.keys(stateitems)[0]
                            let lastChar = await Regex(stateKey, 'lastchar')     

                            const mapValueAssertations = async () => {
                                if (lastChar === 'password') await MsgMap.set('password', 'password')
                                if (lastChar === 'email') await MsgMap.set('email', 'email')                        
                            }
                            mapValueAssertations()
                        } else return                     
                    })                    

                    const stateWithValues = async () => {
                            let mapPw = MsgMap.get('password')
                            let mapEmail = MsgMap.get('email')
                            let joinedValues:any = [mapPw, mapEmail].join()
 
                            if (joinedValues.charAt(0) === ',') {
                                console.log('the value is a comma')
                                joinedValues = 'email'
                            }   

                            setOpacityToggle(true)
                            if (wrongMsg.length === 29) {
                                wrongmsgset(joinedValues)
                            }
                            setTimeout( () => {
                                // wrongmsgset('urmom')
                                console.log('wrongMsg.length')
                                console.log(wrongMsg.length)
                                setOpacityToggle(false)
                            }, 2000)    
                            
                    }
                    stateWithValues()
            }
            whatsWrong(inputstate)         
        }
    }
        if (goldClick === 'login') {
            console.log("forms separated from each other keeping all the logic intact!")
            let userloginInput:any = document.getElementById('LoginUsernameInput')
            let PasswordInputById:any = document.getElementById('LoginPasswordInput')
            
            let usernamevalue = userloginInput.value
            let passwordvalue = PasswordInputById.value

            console.log('usernamevalue')
            console.log(usernamevalue)

            console.log('passwordvalue')
            console.log(passwordvalue)
            
            let LoginData = await Axios.post(GETuserspecifyURL, {
                username: usernamevalue,
                password: passwordvalue
            }).then( (data) => {                
                let userdata = data.data
                let username:string = userdata.username
                if (username) currentusernameset(username);
                if (userdata) currentuserset(userdata)
                location.href = '/strain'              
            }).catch( (err) => {
                // * *  show the error component at this point! dismissable upon acknowledgement type of component!
                return []   // this avoids the
            })

        }
    }            
        
        const toggleshow = () => {
            if (constraintshow === false) {
                constraintshowset('true')            
            }
            if (constraintshow === true) {
                constraintshowset('false')
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
                
                <input className="loginInputs"  id="LoginUsernameInput" onChange={loginchangeHandler} />
                <input
                 style={{ marginTop: '0.75em'}}
                 className="loginInputs" id="LoginPasswordInput" onChange={loginchangeHandler} />
            

                </Container>
                :
                <div></div>
                }

                { goldClick === 'signup' 
                    ?
                <Container className={centerYcenterXcolumn} id={sty.LoginDiv}>
                    
                <input  id="UsernameInput" onChange={changehandler} />
                <input  id="PasswordInput" onChange={changehandler} />
                <input  id="EmailInput" onChange={changehandler} />
                <input  id="AgeInput" onChange={changehandler} />
                                            
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
                    <p
                    id="WrongPtag"
                    style={{
                         color: 'papayawhip', 
                         opacity: opacityToggle ? "1.0" : "0.0"
                        
                          }}
                    > {wrongMsg} </p>    
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
                          
            let preuser = await fetch(new URL(`${url}/api/user/GetAllUsers`))
            let newuser = await preuser.json()

            let GETuserspecifyURL = url += '/api/user/GETspecifyuser'
            console.log('GETuserspecifyURL')
            console.log(GETuserspecifyURL)
                                        
            return {
                props: {
                    localhost, clientenv, GETuserspecifyURL
                }
            }
        }
