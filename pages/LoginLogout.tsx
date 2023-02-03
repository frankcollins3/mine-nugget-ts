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
    import Regex from 'utility/MasterRegex'

    import SignupConstraints from 'components/SignupConstraints'
    import SignupContainer from 'components/SignupContainer'


    let usernamearray = new Array()

    export default function InOut (props) {

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
        const { allStrain, getSpecifiedStrain, userStrainPost, getAllUsers } = useUrl()  //obj destructuring

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
            ['username', ''],
            ['password', ''],
            ['email', ''],
            ['age', ''],
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
            
            if (passworduppercase === true && specialchar === true && numberchar === true && validemail && ageinput && tooeasy === false && userunique === false ) {
        console.log("passing every condition of the constraint box from the other component, facilitated by global state.")
        $('input').each( (index, elem:any) => {                    
            let jqelem = $(elem)[0]                 
            let value:any = jqelem.value                  
        })
        } else {                
            let inputstate = [{passwordU:passworduppercase}, {passwordS:specialchar},{passwordN:numberchar}, {emailE:validemail}]        
            const whatsWrong = async (inputstate:any[]) => {
                // let inputstatebucket = [{passwordU:passworduppercase}, {passwordS:specialchar},{passwordN:numberchar}, {emailE:validemail}]                        
                // const loopandpush = async () => {                
                    inputstate.forEach(async(stateitems) => {                                    
                        let stateVal = Object.values(stateitems)[0]
                        if (stateVal === false) {
                            let stateKey = Object.keys(stateitems)[0]
                            let lastChar = await Regex(stateKey, 'lastchar')      
                            let MsgMap = new Map()
                            MsgMap.set('password', 'test')
                            MsgMap.set('email', '')

                            console.log(MsgMap.get('password'))
                            
                            if (lastChar === 'password') {
                                MsgMap.set('password', '')
                                wrongmsgset(MsgMap.get('password'))                        
                                // wrongmsgset(['password', 'email'])                        
                                if (wrongMsg.length < 5) {
                                    // if (returnstring.length < 5) {                                        
                                        // await setReturnstring(`${wrongMsg} ${lastChar}`) //    [returnstring, setReturnstring] = useState('')                                                                                                 
                                    } else {
                                        // await setReturnstring(`${wrongMsg} and ${lastChar}`)
                                    }
                                }
                                if (lastChar === 'email') {
                                    // wrongmsgset('email')                        
                                    // wrongmsgset(lastChar)
                                    if (wrongMsg.length < 5) {
                                    // wrongmsgset(`${lastChar}`)

                                    // await setReturnstring(`${wrongMsg} ${lastChar}`) //    [returnstring, setReturnstring] = useState('')                                                                                                                                     
                                } else {
                                    // await setReturnstring(`${returnstring} and ${lastChar}`)
                                }
                            }                            

                            console.log('lastChar')   // if this works and returns values.
                            console.log(lastChar)
                            // await setReturnstring(`${wrongMsg}${lastChar}`) //    [returnstring, setReturnstring] = useState('')                                                                 
                        } else return                     
                    })                    
                // }


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
                    <button onClick={click1} style={{ backgroundColor: 'olive'}}></button>         
                    <button onClick={click2}style={{ backgroundColor: 'orange'}}></button>     
                    <p
                    style={{ color: 'papayawhip'}}
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
                          
            let preuser = await fetch(new URL(`${url}/api/user/GetAllusers`))            
                                
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
