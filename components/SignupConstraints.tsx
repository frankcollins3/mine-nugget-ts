import styles from 'styles/LoginLogout/LogInOut.module.scss'
import Container from 'react-bootstrap/Container'
import {useEffect, useState} from 'react'
import $ from 'jquery'
import Siblings from 'utility/JqSiblings'
import CSS from 'utility/CSStool'
import {useGame} from 'Contexts/game'
// possible dictionary API to check for simple syllable words or too easily guessed words?
// email API to check if its a valid email?
// possible to make an API and to basically hash that API so that you can't read it but can consist of vulgar words that aren't accepted?

export default function SignupConstraints(props) {
    
    
        // const [checked, setChecked] = useState('not checked')

        const {
                    checked, choosechecked, 
                    usernamestr, passwordstr, emailstr, agestr,
                    pwstrchange, emailstrchange, agestrchange, userstrchange
              } = useGame()



        

        let sty = styles
        let classtag = 'tag'
        let boxcont = [sty.checkboxcontainer, 'tag'].join(" ")
        // let boxcont = sty.checkboxcontainer

        useEffect( () => {
            // console.log("heres my inputs")
            // console.log($('input'))

            // $('input')                
        })


        const inputClick = (event) => {            
            console.log('event')
            console.log(event)

        }

        const btnclick = () => {
            console.log('cb1 - cb3 and checked')
            console.log( $('#cb1'))           
            console.log( $('#cb2'))           
            console.log( $('#cb3'))           
            choosechecked('checked')
            // setChecked('checked') from successful local stage entry
        }
        
        const btnclick2 = () => { 
            console.log('* * * * * cb1 - cb3 * * * * *  ')
            console.log( $('#cb1'))           
            console.log( $('#cb2'))           
            console.log( $('#cb3'))           
            choosechecked('')
        }

        const btnclick3 = () => {  
            console.log('checked')    
            console.log(checked) 
            
        }
            

              

        const checkboxclick = async (event) => {
            let cb1:any = $('#cb1')
            let cb2:any = $('#cb2')
            let cb3:any = $('#cb3')
            let usercheck:string = cb1[0].checked
            let passcheck:string = cb2[0].checked
            let emailcheck:string = cb3[0].checked

        

            console.log('usercheck')
            console.log(usercheck)
            console.log('passcheck')
            console.log(passcheck)
            console.log('emailcheck')
            console.log(emailcheck)

            let target:any = $(event.target)
            // let target:any = $(event.target)[0]
            let boxsibling:any = await Siblings(target)

            let checktext:any = boxsibling[0].innerText
            let tag = $('.tag')
            console.log('checked')
            console.log(checked)
            
            console.log('checktext')
            console.log(checktext)
            
            if (checked === 'not checked' && checktext === 'username') {
                console.log("checked === not checked checktext === username")
                    choosechecked('username')
                    // setChecked('username')
                    $('#boxcont2').css('position', 'static')
                    $('#boxcont3').css('position', 'static')
                    $('#boxcont2').css('pointer-events', 'none')
                    $('#boxcont3').css('pointer-events', 'none')
                }

            if (checked === 'not checked' && checktext === 'password') {
                console.log("checked === not checked checktext === password")
                    choosechecked('password')
                    // setChecked('password')
                    $('#boxcont1').css('position', 'static')
                    $('#boxcont3').css('position', 'static')
                    $('#boxcont1').css('pointer-events', 'none')
                    $('#boxcont3').css('pointer-events', 'none')
                }

            if (checked === 'not checked' && checktext === 'email') {
                console.log("checked === not checked checktext === password")
                    choosechecked('email')
                    // setChecked('email')
                    $('#boxcont1').css('position', 'static')
                    $('#boxcont2').css('position', 'static')
                    $('#boxcont1').css('pointer-events', 'none')
                    $('#boxcont2').css('pointer-events', 'none')
                }
   

            if (checked === 'username') {
                    console.log("checked === username and we are clicking again!")
                const blankvalue = () => {
                    $('#boxcont2').css('pointer-events', '')
                    $('#boxcont3').css('pointer-events', '')
                }
                const resetToNone = () => {
                    $('#boxcont2').css('position', 'relative')
                    $('#boxcont3').css('position', 'relative')
                    $('#boxcont2').css('pointer-events', 'auto')
                    $('#boxcont3').css('pointer-events', 'auto')
                }
                const doublefunctions = async () => {
                    choosechecked('not checked')
                    // setChecked('not checked')
                    await blankvalue()
                    await resetToNone()
                }
                doublefunctions()                
            }

            if (checked === 'password') {
                    console.log("checked === username and we are clicking again!")
                const blankvalue = () => {
                    $('#boxcont1').css('pointer-events', '')
                    $('#boxcont3').css('pointer-events', '')
                }
                const resetToNone = () => {
                    $('#boxcont1').css('position', 'relative')
                    $('#boxcont3').css('position', 'relative')
                    $('#boxcont1').css('pointer-events', 'auto')
                    $('#boxcont3').css('pointer-events', 'auto')
                }
                const doublefunctions = async () => {
                    choosechecked('not checked')
                    // setChecked('not checked')
                    await blankvalue()
                    await resetToNone()
                }
                doublefunctions()                
            }

            if (checked === 'email') {
                    console.log("checked === username and we are clicking again!")
                const blankvalue = () => {
                    $('#boxcont1').css('pointer-events', '')
                    $('#boxcont2').css('pointer-events', '')
                }
                const resetToNone = () => {
                    $('#boxcont1').css('position', 'relative')
                    $('#boxcont2').css('position', 'relative')
                    $('#boxcont1').css('pointer-events', 'auto')
                    $('#boxcont2').css('pointer-events', 'auto')
                }
                const doublefunctions = async () => {
                    choosechecked('not checked')
                    // setChecked('not checked')
                    await blankvalue()
                    await resetToNone()
                }
                doublefunctions()                
            }

        }
            
            
          
            

        return (
            <Container id={sty.ConstraintGrid}>

                <div id={sty.ConstraintA} className="DivParent Row">

            <div className={boxcont} id="boxcont1">            
                <input 
                style={{ pointerEvents: checked.length > 1 ? 'none' : 'all'}}
                onClick={checkboxclick}  type="checkbox" id="cb1"/>
                <label htmlFor="cb1">username</label>
            </div>
            <div className={boxcont} id="boxcont2">
                <input
                style={{ pointerEvents: checked.length > 1 ? 'none' : 'all'}}
                 onClick={checkboxclick} type="checkbox" id="cb2"/>
                <label htmlFor="cb2">password</label>
            </div>
            <div className={boxcont} id="boxcont3">
                <input
                style={{ pointerEvents: checked.length > 1 ? 'none' : 'all'}}
                 onClick={checkboxclick} type="checkbox" id="cb3"/>
                <label htmlFor="cb3">email</label>
            </div>
                 </div>
                <div id={sty.ConstraintB}>
                 </div>

                 <button
                onClick={btnclick3}
                 style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'moccasin'}
                }>
                    MineGold
                </button>
                 
            </Container>
        )
    }
            {/* username constraints: 6-30 characters long */}
            {/* password constraints: 1 special character, 1 uppercase letter, 7-14 characters */}
            {/* age constraints: must be atleast 16 years old!  */}
            {/* valid email constraints: must have an @ in the list. or end in .edu .com etc  */}
