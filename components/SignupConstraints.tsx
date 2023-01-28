import styles from 'styles/LoginLogout/LogInOut.module.scss'
import Container from 'react-bootstrap/Container'
import {useEffect, useState} from 'react'
import $ from 'jquery'
// possible dictionary API to check for simple syllable words or too easily guessed words?
// email API to check if its a valid email?
// possible to make an API and to basically hash that API so that you can't read it but can consist of vulgar words that aren't accepted?

export default function SignupConstraints(props) {

        const [checked, setChecked] = useState('')

        let sty = styles

        useEffect( () => {
            // console.log("heres my inputs")
            // console.log($('input'))

            // $('input')                
        })

        const inputClick = (event) => {
            let target = $(event.target)
            console.log('event')
            console.log(event)
            // setChecked('checked')
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
            

            let cb1:any = $('#cb1')
            let cb2:any = $('#cb2')
            let cb3:any = $('#cb3')
            
            console.log('cb1')
            console.log(cb1)
            console.log(cb1[0].checked)
            console.log('cb2')
            console.log(cb2)
            console.log(cb2[0].checked)
            console.log('cb3')
            console.log(cb3)
            console.log(cb3[0].checked)
        }

        return (
            <Container id={sty.ConstraintGrid}>

                <div id={sty.ConstraintA} className="DivParent Row">

            <div className={sty.checkboxcontainer}>            
                <input  type="checkbox" id="cb1"/>
                <label htmlFor="cb1">username</label>
            </div>
            <div className={sty.checkboxcontainer}>
                <input type="checkbox" id="cb2"/>
                <label htmlFor="cb2">password</label>
            </div>
            <div className={sty.checkboxcontainer}>
                <input type="checkbox" id="cb3"/>
                <label htmlFor="cb3">email</label>
            </div>
                 </div>
                <div id={sty.ConstraintB}>
                 </div>
                 <button style={{ backgroundColor: 'blue', width: '80px'}} onClick={btnclick}></button>
                 <button style={{ backgroundColor: 'red', width: '80px'}} onClick={btnclick2}></button>
                 <button style={{ backgroundColor: 'yellow', width: '80px'}} onClick={btnclick3}></button>
            </Container>
        )
    }
            {/* username constraints: 6-30 characters long */}
            {/* password constraints: 1 special character, 1 uppercase letter, 7-14 characters */}
            {/* age constraints: must be atleast 16 years old!  */}
            {/* valid email constraints: must have an @ in the list. or end in .edu .com etc  */}
