import ShadowBorder from 'styles/game/components/GameContainer'
import {connect} from 'react-redux';
import { TypedUseSelectorHook, useSelector } from 'react-redux'

export default  function GameContainer (props) {
    console.log('props from the GameContainer!!!!')
    console.log(props)
    let parents:string = props.redux
    return (
        <>
            <ShadowBorder>
        <div>
            <p> real game container </p>
            <h1
            style= {{ color: 'whitesmoke'}}
            > {parents || 'nice'} </h1>
        </div>
            </ShadowBorder>
        </>
    )
}