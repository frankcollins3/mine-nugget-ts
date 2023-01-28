import styles from 'styles/LoginLogout/LogInOut.module.scss'
import Container from 'react-bootstrap/Container'
import {useEffect, useState} from 'react'
import $ from 'jquery'
import Siblings from 'utility/JqSiblings'
import CSS from 'utility/CSStool'
// possible dictionary API to check for simple syllable words or too easily guessed words?
// email API to check if its a valid email?
// possible to make an API and to basically hash that API so that you can't read it but can consist of vulgar words that aren't accepted?

export default function SignupConstraints(props) {
    
    
        const [checked, setChecked] = useState('')

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
            setChecked('checked')
        }
        
        const btnclick2 = () => { 
            console.log('* * * * * cb1 - cb3 * * * * *  ')
            console.log( $('#cb1'))           
            console.log( $('#cb2'))           
            console.log( $('#cb3'))           
            setChecked('')
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
            console.log('checktext')
            console.log(checktext)

            setChecked(checktext || 'true')

            target.removeClass($(boxcont))
            target.addClass("redborder")

            let tag = $('.tag')
        
            // $('.tag').css('border', '5px solid green')
            $('.tag').css('pointer-events', 'none')
            $('.tag').css('cursor', 'not-allowed')

            

            setTimeout( () => {
                $(target[0]).css('pointer-events', 'auto')
            }, 2000)

            // tag.children().css('pointer-events', 'none')

            // $(sty.checkboxcontainer).css('border', '5px solid green')



        }
            
            
          
            

        return (
            <Container id={sty.ConstraintGrid}>

                <div id={sty.ConstraintA} className="DivParent Row">

            <div className={boxcont}>            
                <input 
                style={{ pointerEvents: checked.length > 1 ? 'none' : 'all'}}
                onClick={checkboxclick}  type="checkbox" id="cb1"/>
                <label htmlFor="cb1">username</label>
            </div>
            <div className={boxcont}>
                <input
                style={{ pointerEvents: checked.length > 1 ? 'none' : 'all'}}
                 onClick={checkboxclick} type="checkbox" id="cb2"/>
                <label htmlFor="cb2">password</label>
            </div>
            <div className={boxcont}>
                <input
                style={{ pointerEvents: checked.length > 1 ? 'none' : 'all'}}
                 onClick={checkboxclick} type="checkbox" id="cb3"/>
                <label htmlFor="cb3">email</label>
            </div>
                 </div>
                <div id={sty.ConstraintB}>
                 </div>
                 <button
                  style={{ backgroundColor: 'blue', width: '80px'}} onClick={btnclick}></button>
                 <button style={{ backgroundColor: 'red', width: '80px'}} onClick={btnclick2}></button>
                 <button style={{ backgroundColor: 'yellow', width: '80px'}} onClick={btnclick3}></button>
            </Container>
        )
    }
            {/* username constraints: 6-30 characters long */}
            {/* password constraints: 1 special character, 1 uppercase letter, 7-14 characters */}
            {/* age constraints: must be atleast 16 years old!  */}
            {/* valid email constraints: must have an @ in the list. or end in .edu .com etc  */}
