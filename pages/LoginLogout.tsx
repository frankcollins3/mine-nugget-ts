import Helmet from 'components/Helmet'
import styles from 'styles/LoginLogout/LogInOut.module.scss'
import ReturnUrl from 'utility/ReturnUrl'
import Page from 'styles/LoginLogout/styledcomponents/Page'
import {useEffect, useState} from 'react'
import $ from 'jquery'
import {useGame} from 'Contexts/game'
import Siblings from 'utility/JqSiblings'
import AttrTool from 'utility/JqAttr'
import { createNoSubstitutionTemplateLiteral } from 'typescript'
// import {useUser} from 'Contexts/usercontext'


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
        }

    }
    
    return (                            
        <Page>
            <div style={{ maxWidth: '50vw'}} className={centerYbetweenXrow}>      

            <div className={centerYcenterXcolumn}>
            <img className={sty.GoldBar} src="/img/gold.png"/>
            <p className={sty.UserText}> Login</p>
            </div>

            { goldClick === 'signup' 
            ?
            <div className={centerYcenterXcolumn} id={sty.LoginDiv}>

            <input  id="UsernameInput" onChange={changehandler} />
            <input  id="PasswordInput" onChange={changehandler} />
            {/* <input value={'username'} className={sty.Signup} id={sty.UsernameInput} onChange={changehandler} />
            <input value={'password'} className={sty.Signup} id={sty.PasswordInput} onChange={changehandler} /> */}

            <div className={sty.MiniGoldBar}></div>
            {/* <input className={sty.MiniGoldBar} type="submit"/> */}
            </div>
            :
            <div></div>
            }

            <div className={centerYcenterXcolumn}>
            <img onClick={goldClickFunc} className={sty.GoldBar} src="/img/gold.png"/>
            <p className={sty.UserText}> Signup</p>
            </div>

            </div>
            <div className={sty.endYcenterXcolumn} id={sty.HelmetCont}>
                <Helmet/>
                {/* <button onClick={check}></button>
                <p> {username} </p>
                <p> {gameOn} </p> */}
            </div>
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
