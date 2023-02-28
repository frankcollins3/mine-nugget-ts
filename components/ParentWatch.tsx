import Container from 'react-bootstrap/Container'
import $ from 'jquery'
import AttrTool from 'utility/JqAttr'
import { useState, useEffect} from 'react'
import Images from 'utility/ImageBin'
import { useGame } from 'Contexts/game'
import CSS from 'utility/CSStool'

export default function ParentWatch (props) {

    const {winStreak, wrongGuess} = useGame()
    let Watch = $('#Watch')

    useEffect( () => {        
            CSS(Watch, 'background-image', `url('/img/gold.png')`)        
    }, [winStreak])

    useEffect( () => {
        if (wrongGuess === 2) {
            const change = async () => {
                let firetag = await Images('firetag')
                CSS(Watch, 'background-image', `url('${firetag}')`)
            }
            change()
        }
    }, [wrongGuess])

    return (
        <Container
        id="Watch"
        className="RingWatch"
        style={{ backgroundImage: `url('img/watch.png')`}}        
        >                    
        </Container>        
    )
}
