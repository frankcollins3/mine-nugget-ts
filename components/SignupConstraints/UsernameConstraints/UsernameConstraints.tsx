

// @reduxjs/toolkit global state management
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store/rootReducer';

// utils
import {useImage} from "Contexts/Img"

export default function UsernameConstraints() {
    return <RENDER/>
}

function RENDER() {
    const { gold } = useImage()

    const USERNAME_UNIQUE = useSelector( (state:RootState) => state.loginSignup.USERNAME_UNIQUE)
    const USERNAME_LENGTH = useSelector( (state:RootState) => state.loginSignup.USERNAME_LENGTH)
    
    return (
    <>
        {
            USERNAME_LENGTH && USERNAME_UNIQUE === false 
                                ?
                <img style={{ height: '30px', width: '30px'}} src={gold}/>
                                :
                                <>

                    <pre style={{            
                        color: USERNAME_UNIQUE ? "#E01115" : 'rgb(247, 208, 32)', 
                        fontWeight: 'bolder',
                        margin: '0 0.5em'
                    }}
                    > unique
                    </pre>

                    <pre style={{
                        color: USERNAME_LENGTH ? "rgb(247, 208, 32)" : "moccasin",
                        fontWeight: 'bolder',
                        margin: '0 0.5em'
                    }}
                    > length
                    </pre>
                        </>
        }
    </>      
    )
}


{/* <>
<pre style={{
 color: 'moccasin',
 fontWeight: 'bold',
 margin: '0 0.5em'
}}> unique
</pre>

<pre style={{
 color: 'moccasin',
 fontWeight: 'bold',
 margin: '0 0.5em'
}}> length
</pre>
</> */}