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


        const { allStrain, getSpecifiedStrain, userStrainPost, getAllUsers } = useUrl()  //obj destructuring

        const {
            checked, choosechecked, usernamestr, passwordstr, 
            emailstr, agestr, pwstrchange, url, urlSetter,
            emailstrchange, agestrchange, userstrchange, passworduppercase, uppercaseset, specialchar, specialcharset, numberchar, numbercharset,
            tooeasy, tooeasyset, tooeasybucket, easybucketset, nocursing, nocursingset, cursingboolean, cursingbooleanset, userunique,
            usergood, usergoodset, validemail, validemailset, oldenough, oldenoughset, constraintshow, constraintshowset,
            goldClick, goldClickSet,
    currentinput, currentinputset, usernameinput, usernameinputset, passwordinput, passwordinputset, emailinput, emailinputset, ageinput, ageinputset, 
            alluser, alluserset, allusername, allusernameset,
            wrongMsg, whatsWrongProblem, whatswrongproblemset,
             whatsWrong
        } = useGame()

        const userobject = new Map([
            ['username', ''],
            ['password', ''],
            ['email', ''],
            ['age', ''],
        ]);
        
        useEffect( () => {
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
                // let usernameDB = await alldb.filter( (dbitem) => {dbitem.username})

                // console.log('usernameDB')
                // console.log(usernameDB)

            })()

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


        const semisubmit = async () => {
            // let inputstate = [{password_uppercase:passworduppercase}, {password_special:specialchar},{password_number:numberchar}, validemail]
            
            if (passworduppercase === true && specialchar === true && numberchar === true && validemail && ageinput && tooeasy === false && userunique === false ) {
        console.log("passing every condition of the constraint box from the other component, facilitated by global state.")
        $('input').each( (index, elem:any) => {                    
            let jqelem = $(elem)[0]                 
            let value:any = jqelem.value                  
        })
    } else {
        console.log('well actually...')
        
        let inputstate = [{passwordU:passworduppercase}, {passwordS:specialchar},{passwordN:numberchar}, {emailE:validemail}]

        
        const whatsWrong = async (inputstate:any[]) => {
            let inputstatebucket = [{passwordU:passworduppercase}, {passwordS:specialchar},{passwordN:numberchar}, {emailE:validemail}]                        
            let passwordbucket:string[] = []       
            let emailbucket:string[] = []               

            const loopandpush = () => {
                inputstatebucket.forEach(async(stateitems) => {                                    
                    let stateVal = Object.values(stateitems)[0]
                    if (stateVal === false) {
                        let stateKey = Object.keys(stateitems)[0]
                        let lastChar = await Regex(stateKey, 'lastchar')
                        console.log('lastChar')
                        console.log(lastChar)
                        await whatswrongproblemset(`${stateKey}`)                        
                        if (lastChar === 'password') {
                            console.log('hey password!')
                            console.log(`lastChar in the password: ${lastChar} `)
                            if (passwordbucket.length < 1) passwordbucket.push(lastChar)
                        }
                        if (lastChar === 'email') {
                            console.log('hey email! hey bear!!')
                            console.log(`lastChar in the email: ${lastChar} `)
                            if (emailbucket.length < 1) emailbucket.push(lastChar)
                        }
                        // if (lastChar === 'password') passwordbucket.push(lastChar)
                        // if (lastChar === 'email') emailbucket.push(lastChar)
                    } else {
                        return 
                    }
                })                    
            }
            const checkValues = () => {
                console.log('running the check values function')
                console.log('passwordbucket')
                console.log(passwordbucket)
                
                console.log('emailbucket')
                console.log(emailbucket)

                console.log('wrongMsg')
                console.log(wrongMsg)

                let newMessage:string = wrongMsg;

                console.log("email and passwordbucket length")
                console.log(emailbucket.length)
                console.log(passwordbucket.length)

                if (passwordbucket) newMessage += passwordbucket[0]
                if (emailbucket) newMessage += emailbucket[0]

                // console.log('newMessage')
                // console.log(newMessage)
                
            }
            const loopAndCheck = async () => {
                await loopandpush()
                await checkValues()
            }
            loopAndCheck()
        }
        whatsWrong(inputstate)
           
           
            
            // let wrongstate = await whatsWrong(inputstate)            
            // console.log('wrongstate')
            // console.log(wrongstate)


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
