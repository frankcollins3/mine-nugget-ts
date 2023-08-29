
// @reduxjs/toolkit global state management
import {useSelector, useDispatch} from 'react-redux'
import { RootState } from 'redux/store/rootReducer';

// utils
import {useImage} from "Contexts/Img"

export default function EmailConstraints() {
    return <RENDER/>
}

function RENDER() {
    const { gold } = useImage()

    const EMAIL_UNIQUE = useSelector( (state:RootState) => state.loginSignup.EMAIL_UNIQUE)
    const EMAIL_EXTENSION = useSelector( (state:RootState) => state.loginSignup.EMAIL_EXTENSION)
    const EMAIL_EXTENSION_UI = useSelector( (state:RootState) => state.loginSignup.EMAIL_EXTENSION_UI)

    const ALL_EMAILS = useSelector( (state:RootState) => state.main.ALL_EMAILS)
    const ALL_USERNAMES = useSelector( (state:RootState) => state.main.ALL_USERNAMES)
    
    const uniquetest = () => {
        console.log(ALL_EMAILS)
    }

    const extensiontest = () => {
        console.log(ALL_USERNAMES)
    }

    return (
    <>  
            {
                EMAIL_EXTENSION && !EMAIL_UNIQUE
                            ?
            <img style={{ height: '30px', width: '30px'}} src={gold}/>      
                            :
                            <>
                <pre style={{            
                    color: EMAIL_UNIQUE ? "#E01115" : 'rgb(247, 208, 32)', 
                    fontWeight: 'bolder',
                    margin: '0 0.5em'
                }}
                onClick={uniquetest}
                > unique
                </pre>

                <pre style={{
                    color: EMAIL_EXTENSION ? "rgb(247, 208, 32)" : "moccasin",
                    fontWeight: 'bolder',
                    margin: '0 0.5em'
                }}
                onClick={extensiontest}
                > { EMAIL_EXTENSION_UI || ".com" }
                </pre>
                        </>
            }
    </>      
    )
}