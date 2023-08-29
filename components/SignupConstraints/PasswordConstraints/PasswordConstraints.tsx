
// @reduxjs/toolkit
import {useSelector, useDispatch} from 'react-redux'
import { RootState } from 'redux/store/rootReducer';

// utils
import {useImage} from "Contexts/Img"

export default function PasswordConstraints() {
    return <RENDER/>
}

const RENDER = () => {
    
    const PASSWORD_UPPERCASE = useSelector( (state:RootState) => state.loginSignup.PASSWORD_UPPERCASE)
    const PASSWORD_LENGTH_PASS = useSelector( (state:RootState) => state.loginSignup.PASSWORD_LENGTH_PASS)
    const PASSWORD_NUMBER_CHAR = useSelector( (state:RootState) => state.loginSignup.PASSWORD_NUMBER_CHAR)
    const PASSWORD_SPECIAL_CHAR = useSelector( (state:RootState) => state.loginSignup.PASSWORD_SPECIAL_CHAR)
    const PASSWORD_TOO_EZ = useSelector( (state:RootState) => state.loginSignup.PASSWORD_TOO_EZ)

    const {gold} = useImage()

    return (
                <>
        {
            PASSWORD_UPPERCASE && PASSWORD_NUMBER_CHAR && PASSWORD_SPECIAL_CHAR && PASSWORD_LENGTH_PASS && !PASSWORD_TOO_EZ 
                                            ?
                    <img style={{ height: '30px', width: '30px' }} src={gold}/>
                                                :
                                                <>          
                                                {
                                                    PASSWORD_TOO_EZ
                                                        &&
                                                 <pre style={{
                                                color: PASSWORD_TOO_EZ ? "#E01115" : "rgb(247, 208, 32)",
                                                fontWeight: 'bold'
                                            }}
                                            > tooEZ </pre> 
                                                }    

                                                {
                                                    !PASSWORD_TOO_EZ  &&
                                                    <>
                                                <pre style={{                        
                                                    color: PASSWORD_UPPERCASE ? "rgb(247, 208, 32)" : "moccasin",
                                                    fontWeight: 'bold', 
                                                }}                    
                                                > upper </pre>
                                            
                                            <pre style={{
                                                color: PASSWORD_NUMBER_CHAR ? "rgb(247, 208, 32)" : "moccasin",
                                                fontWeight: 'bold',
                                                // color: RhasNums.test(SIGNUP_PASSWORD_INPUT) ? "rgb(247, 208, 32)" : "moccasin",
                                            }}
                                            > number </pre>
                                            
                                            <pre style={{                        
                                                color: PASSWORD_SPECIAL_CHAR ? "rgb(247, 208, 32)" : "moccasin",
                                                fontWeight: 'bold'
                                            }}> special </pre>
                                            
                                            {/* color: tooeasy ? '#E01115' : 'rgb(247, 208, 32)', */}
                                            <pre style={{
                                                color: PASSWORD_LENGTH_PASS ? "rgb(247, 208, 32)" : "moccasin",
                                                fontWeight: 'bold'
                                                // color: PASSWORD_TOO_EZ ? "#E01115" : "rgb(247, 208, 32)"
                                            }}
                                            > length </pre>
                                                    </>
                                                }                                                                                          
                                    </>
            }
            </>
    )
}