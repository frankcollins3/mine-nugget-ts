import Container from 'react-bootstrap/Container'
import { useEffect, useState } from 'react'
import { useGame } from 'Contexts/game'
import $ from 'jquery'
import AttrTool from 'utility/JqAttr'
import Images from 'utility/ImageBin'

export default function ParentRing (props) {
    const [images, setImages] = useState<string[]>([])

    const {
        // gameOn, playing, notplaying,
        //  parents, meetTheParents, 
        //  parent1, parent1state, parent2, parent2state, clearparent1, clearparent2,
        //  dontuse, fillbucket, emptybucket,
         winStreak,
        //   winstreakincrement, wrongGuess, guesswrongincrement,
        //   trophy, addTrophy, 
         } = useGame()
    let ring = $('#Ring')

    useEffect( () => {
        (async() => {
        //  let images = await Images()
        })()
    }, [])

    // let goldimg = Images('gold')
    console.log('goldimg')
    console.log(goldimg)
    
    // AttrTool(ring, 'src', goldimg)

    useEffect( () => {
        // AttrTool(ring, 'src', 'gold.png')        

    }, [winStreak])

    return (
        <Container
        className="RingWatch"
        id="Ring"
        style={{ backgroundImage: `url('img/ring.png')`}}
        // style={{ backgroundImage: `url('img/ring.png')`, backgroundSize: '3%'}}
        
        >            
        {/* <div */}
        {/* // style={{ backgroundImage: `url('img/ring.png')`}} */}
        {/* className="RingWatch"> */}
            {/* <p> {props.parents || 'nothing'} </p> */}
            
        {/* </div> */}
        </Container>
    )
}
