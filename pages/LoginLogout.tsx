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
    import POSTuserCLASS from 'utility/POSTuser'
    import Regex from 'utility/MasterRegex'
    import FindIndex from 'utility/FindIndexForIn'
    import ElemEndpoint from 'utility/JqElemEndpoint'

    import SignupConstraints from 'components/SignupConstraints'
    import SignupContainer from 'components/SignupContainer'


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
            wrongMsg, wrongmsgset, whatsWrongProblem, whatswrongproblemset, 
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

        const goldClickFunc = async (event) => {        
            let siblings:any = await Siblings(event.target)
            let siblingText:string = siblings[0].outerText

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
        
        let bucketbucket = []
        let passwordbucket = new Array()
        let emailbucket = new Array()

        const semisubmit = async () => {            
                // let inputstate = [{password_uppercase:passworduppercase}, {password_special:specialchar},{password_number:numberchar}, validemail]                
                // let newuserPOST = await POSTuserCLASS(POSTuserREBUILD, {username: 'me', password: 'hey123', email: 'me@gmail.com', age: 30})
                // console.log('newuserPOST')
                // console.log(newuserPOST)

                // let userPOST = await POSTuserCLASS(POSTuserClient, )      
                
                // let userPOST = await POSTuser(POSTuserClient, {username: 'yeah sure', password: 'my password', email: 'my email', age: 30}            
                // console.log("passing every condition of the constraint box from the other component, facilitated by global state.")


                if (passworduppercase === true && specialchar === true && numberchar === true && validemail && ageinput && tooeasy === false && userunique === false ) {

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


                
// * leave this else block of code its for the return statement for when the password validator isn't filled out correctly.
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
                            let joinedValues = [mapPw, mapEmail].join()
                            setOpacityToggle(true)
                            wrongmsgset(joinedValues)
                            setTimeout( () => {
                                wrongmsgset('')
                                setOpacityToggle(false)
                            }, 2000)    

                            
                    }
                    stateWithValues()
            }
            whatsWrong(inputstate)  
            
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

        const click1 = () => {
            console.log('* * * click1 function')
            // setReturnstring("set by click1")
        }

        const click2 = () => {
            console.log('click2 function running')
            console.log('returnstring')
            // console.log(returnstring)
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
                         opacity: opacityToggle ? "1.0" : "0.2"
                        
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

            // let prePOSTuser = await fetch(new URL(`${url}/api/user/POSTuser`))   
            // let POSTuserAPI = await prePOSTuser.json()
            // let redeclare = POSTuserAPI;
                                
            return {
                props: {
                    localhost, clientenv, 
                }
            }
        }

        // * this page will have state that when given a number it uses ternary rendering to render difference custom footers.
        // * one page ninja input. swap login or logout by state.
        // * {we dig you: shovel} {youre pure gold: goldbar} {gold to be mine mine to be gold: mine with border, viva oro: cactus}


        // const whatsWrong = async (inputstate:any[]) => {
        //     let i:number = 0;
        //     length = inputstate.length;
        //     let problemstate = ''
        //     let problemarray = new Array();                
        //     let message = [`Fools Gold.`, 'Please Fix Your: ']            
        //     inputstate.forEach(async(stateitems) => {                    
        //         // * whatswrongMsg State. Message. Problem state. 
        //         let stateVal = Object.values(stateitems)[0]
        //         if (stateVal === false) {
        //             let stateKey = Object.keys(stateitems)[0]
        //             let lastChar = await Regex(stateKey, 'lastchar')
        //             problemstate = lastChar;
        //             await whatswrongproblemset(`${stateKey}`)                        
        //             let msgrebuild:string = `${wrongMsg}${lastChar}`                        
        //         }
        //     })                    
        // }
