import styles from 'styles/LoginLogout/LogInOut.module.scss'
import Container from 'react-bootstrap/Container'
import {useEffect, useState} from 'react'
import $ from 'jquery'
import {useGame} from 'Contexts/game'
import {useUrl} from 'Contexts/Url'

// * utility functions!
import Siblings from 'utility/JqSiblings'
import CSS from 'utility/CSStool'
import POST from 'utility/POSTdataJS'


// * api

export default function SignupConstraints(props) {
    
    const { allStrain, getSpecifiedStrain, userStrainPost, getAllUsers, } = useUrl()  //obj destructuring
    
const { checked, choosechecked, usernamestr, passwordstr, 
    emailstr, agestr, pwstrchange, currentinput, currentinputset,
     emailstrchange, agestrchange, userstrchange, passworduppercase, uppercaseset, specialchar, specialcharset, numberchar, numbercharset,
      tooeasy, tooeasyset, tooeasybucket, easybucketset, nocursing, nocursingset, cursingboolean, cursingbooleanset,
      usergood, usergoodset, validemail, validemailset, oldenough, oldenoughset, constraintshow, constraintshowset,
usernameinput, usernameinputset, passwordinput, passwordinputset, emailinput, emailinputset, ageinput, ageinputset, userunique, useruniqueset,
alluser, alluserset, allusername, allusernameset

      } = useGame()

    let passPassword = [passworduppercase, specialchar, numberchar]
    let passKey = passPassword.length // if password.length === 2 (toggled to boolean true for 2 instances which populate and lengthify array)
    let sty = styles; 
    let classtag = 'tag'
    let boxcont = [sty.checkboxcontainer, 'tag'].join(" ")
    // let specialcharstring:any = '!@#$%^&*?'
    let specialcharbucket = ['!', '@', '#', '$', '%', '^', '&', '*', '?']
    let numberPattern = /\d+/g;
    let upperCasePattern = /[A-Z\s]/g;
    let specialPattern = /[!@#$%&*?]/g;
    let onlyLettersPattern = /[a-zA-Z]/g;

    // 

        useEffect( () => {
            console.log('passwordinput')
            console.log(passwordinput)
            // console.log(typeof currentinput)
            let stringinput:any = currentinput
            let passwordinputstring:any = passwordinput.toString()

           let actualstring = stringinput.toString()
           
           let loopsafeNoCursing = [nocursing]
           let loopsafeezbucket:any = tooeasybucket
           
           
           
           if (stringinput.length < 1) {
            uppercaseset('false')
            numbercharset('false')
            specialcharset('false')
           }
           
            // if (checked === 'password') {
                console.log('tooeasybucket in the password')
                console.log(tooeasybucket)



                let uppercaseRegex = passwordinputstring.match(upperCasePattern)            
                let regexnumber = passwordinputstring.match(numberPattern)                        
                // let regexnumber = actualstring.match(numberPattern)                        
                let specialRegex = passwordinputstring.match(specialPattern)
                let onlyletters = passwordinputstring.length > 2 ? passwordinputstring.match(onlyLettersPattern) : ['friends', 'for', 'ever']

                let easycount = 0

                loopsafeezbucket.forEach( (easyword:string) => {

                    let lettersArrayJoined = onlyletters.join("")
                    if (lettersArrayJoined === easyword) {
                        // console.log('lettersArrayJoined')
                        // console.log(lettersArrayJoined)
                        easycount++
                        tooeasyset('true')
                    } else {
                        if (easycount === 0) {
                            tooeasyset('false')
                        }
                    }
                })

                if (specialRegex) {
                    specialcharset('true')
                } else {
                    specialcharset('false')
                }
                
                if (uppercaseRegex) {                                    
                    uppercaseset('true')
                } else {
                    uppercaseset('false')
                }

                if (regexnumber) {                
                    numbercharset('true')
                } else {
                    numbercharset('false')
                }
                

        }, [passwordinput])

        useEffect( () => {
            let emailinputstring:any = emailinput.toString()
            let atMatchPattern = /[\/@]/g

            let atMatch = emailinputstring.match(atMatchPattern)
            if (atMatch) {                
                let stringAfterSlash = emailinputstring.lastIndexOf('.') ? emailinputstring.substring(emailinputstring.lastIndexOf('.')).replace(/[\/.]/g, '') : ''                
                let validEmailLength = stringAfterSlash.length                         
                if (validEmailLength === 3 && stringAfterSlash === 'com' || stringAfterSlash === 'net' || stringAfterSlash === 'edu') { // io is not 3
                    validemailset('true')                    
                } else {
                    validemailset('false')                    
                }                                
            } else { return}
        }, [emailinput])

        useEffect( () => {
            let usernamebucket = new Array() 
            let userinputstring:any = usernameinput.toString()
            let inputlength:number = userinputstring.length
            let onlyletters = userinputstring.length > 2 ? userinputstring.match(onlyLettersPattern).join("") : ""
            
            let loopsafeezbucket:any = tooeasybucket

            if (allusername.includes(userinputstring)) {
                useruniqueset('true')
            } else {
                useruniqueset('false')
            }
    
            if (inputlength < 16 && inputlength > 8) {
                usergoodset('true')
            } else {
                usergoodset('false')
            }

        }, [usernameinput])
            
        const inputClick = (event) => {            
            
        }

        const btnclick3 = () => {  
                        
        }

        const checkboxclick = async (event) => {
            let cb1:any = $('#cb1')
            let cb2:any = $('#cb2')
            let cb3:any = $('#cb3')
            let usercheck:string = cb1[0].checked
            let passcheck:string = cb2[0].checked
            let emailcheck:string = cb3[0].checked
        
            let target:any = $(event.target)
            // let target:any = $(event.target)[0]
            let boxsibling:any = await Siblings(target)

            let checktext:any = boxsibling[0].innerText
            let tag = $('.tag')
            
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
                    await blankvalue()
                    await resetToNone()
                }
                doublefunctions()                
            }

        }
            
        return (
            
            <Container id={sty.ConstraintGrid} className="Column">
  
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
                    {/* <p style={{ color: 'moccasin', fontWeight: 'bold', fontSize: '30px'}}> {currentinput} </p> */}

                    {
                        checked === 'password' 
                        ?
                        <div className="Column">
                        
                        <img 
                        style={{ 
                            display: passworduppercase === true && specialchar === true && numberchar === true ? "flex" : "none",
                            height: '65px', width: '65px'
                              }}
                        src="/img/gold.png"
                        />

                        <div 
                        style={{ 
                            display: passworduppercase === true && specialchar === true && numberchar === true ? "none" : "flex"
                        }}
                        // style={{ display: passPassword.length > 2 ? "none" : "flex"}}
                        className="Row">

                     <p
                      className={sty.ConstraintText}
                      style={{ 
                          color: passworduppercase ? 'rgb(247, 208, 32)' : 'moccasin',
                          fontWeight: 'bold', fontSize: '15px'
                        }}> upper </p>

                     <p
                      className={sty.ConstraintText}
                      style={{ 
                          color: specialchar ? 'rgb(247, 208, 32)' : 'moccasin',
                          fontWeight: 'bold', fontSize: '15px'
                        }}> special </p>

                     <p
                      className={sty.ConstraintText}
                      style={{ 
                          color: numberchar ? 'rgb(247, 208, 32)' : 'moccasin',
                          fontWeight: 'bold', fontSize: '15px'
                        }}> number </p>

                    <p
                      className={sty.ConstraintText}
                      style={{ 
                          color: tooeasy ? '#E01115' : 'rgb(247, 208, 32)', // 9b111E E01115
                          fontWeight: 'bold', fontSize: '15px'
                        }}> too-ez </p>   
                        </div>                        
                        </div>
                        
                        :
                        <div> </div>
                    }

                    {
                        checked === 'email'
                        ?
                        <div className="Column">                        
                        <div 
                        className="Row"
                        style={{ 
                            display: passworduppercase === true && specialchar === true && numberchar === true ? "none" : "flex"
                        }}>

                        <p
                      className={sty.ConstraintText}
                      style={{ 
                        color: validemail ? 'rgb(247, 208, 32)' : 'moccasin',
                          fontWeight: 'bold',
                        }}> @email.com </p>
                                            
                        </div>
                        </div>

                        :
                        <div></div>
                    }

                    {
                        checked === 'username'
                        ?
                        <div className="Column">

                        <div 
                        className="Row"
                        style={{ 
                            display: passworduppercase === true && specialchar === true && numberchar === true ? "none" : "flex"
                        }}>

                        <p
                        className={sty.ConstraintText}
                        style={{ 
                          color: userunique ? '#E01115' : usergood ? 'rgb(247, 208, 32)' : 'moccasin',
                        //   color:  userunique ? '#E01115' : 'moccasin',
                          fontWeight: 'bold',
                        }}> unique </p>

                        <p
                        className={sty.ConstraintText}
                        style={{ 
                          color: usergood ? 'rgb(247, 208, 32)' : 'moccasin',
                          fontWeight: 'bold',
                        }}> username </p>

                        {/* <p
                        className={sty.ConstraintText}
                        style={{ 
                          color: tooeasy ? 'rgb(247, 208, 32)' : 'moccasin',
                          fontWeight: 'bold',
                        }}> too-ez </p> */}
                        
                        </div>
                        </div>
                            :
                            <div></div>                            
                    }

                        



                 {/* <p style={{ color: 'moccasin', fontWeight: 'bold', fontSize: '30px'}}> {agestr} </p>
                 <p style={{ color: 'moccasin', fontWeight: 'bold', fontSize: '30px'}}> {emailstr} </p>
                 <p style={{ color: 'moccasin', fontWeight: 'bold', fontSize: '30px'}}> {passwordstr} </p> */}
                 </div>                 
            </Container>
        )
    }
            {/* username constraints: 6-30 characters long */}
            {/* password constraints: 1 special character, 1 uppercase 45, 7-14 characters */}
            {/* age constraints: must be atleast 16 years old!  */}
            {/* valid email constraints: must have an @ in the list. or end in .edu .com etc  */}
