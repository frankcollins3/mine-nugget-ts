import Container from 'react-bootstrap/Container'
import { useEffect, useState } from 'react'
import { useGame } from 'Contexts/game'
import $ from 'jquery'
import AttrTool from 'utility/JqAttr'
import CSS from 'utility/CSStool'
import Images from 'utility/ImageBin'

export default function ParentRing (props) {
    const [imgbucket, setImgbucket] = useState([])
    const [gameimg, setGameimg] = useState('')    

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
        let allimages = await Images('all')
        // setImgbucket(allimages)
                
        let gold = await Images('gold')            
        setGameimg(gold)
    })()
}, [])

    //  let imagebucket:string|any[] = [goldbarimg, ringimg, watchimg]
    // let goldimg = Images('gold')
    
    
    // AttrTool(ring, 'src', goldimg)

    useEffect( () => {
        // AttrTool(ring, 'src', 'gold.png')        
        
        // AttrTool(ring, 'src', '/public/img/gold.png')
        CSS(ring, 'background-image', `url('${img}')`)
        // $(ring).css('border', '10px solid hotpink')
        // AttrTool(ring, 'src', currimg)
    }, [winStreak])

    return (
        <>
        <Container
        className="RingWatch"
        id="Ring"
        style={{ backgroundImage: `url('img/ring.png')`}}        
        >            
        </Container>
        <button onClick={() => console.log("hey") }></button>
        </>
    )
}
