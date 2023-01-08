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
            winStreak, wrongGuess
            //   winstreakincrement, wrongGuess, guesswrongincrement,
            //   trophy, addTrophy, 
            } = useGame()
        let ring = $('#Ring')

        useEffect( () => {
            (async() => {
            let allimages = await Images('all')                    
            let gold = await Images('gold')            
        })()
    }, [])

        useEffect( () => {
            const changeimg = async () => {
                let gold = await Images("gold")        
                CSS(ring, 'background-image', `url('${gold}')`)        
            }
            changeimg()
        }, [winStreak])

        useEffect( () => {
            if (wrongGuess === 2) {
                const change = async () => {
                    let firetag = await Images('firetag')
                    CSS(ring, 'background-image', `url('${firetag}')`)
                }
                change()
            }
        }, [wrongGuess])

        return (
            <>
            <Container
            className="RingWatch"
            id="Ring"
            style={{ backgroundImage: `url('img/ring.png')`}}        
            >            
            </Container>        
            </>
        )
    }
