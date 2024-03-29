  import {useEffect} from "react"
  import axios from 'axios'
  import $ from 'jquery'
  
  // @reduxjs/toolkit
  import {RootState} from "redux/store/rootReducer"
  import {useSelector, useDispatch} from "react-redux"
  import { 
    TOGGLE_PLAYING, TOGGLE_TERNARY_RENDER_KING, TOGGLE_TERNARY_RENDER_QUEEN, SET_WRONG_RIGHT_OPTION_BUCKET, SET_CLICKED_CARD,
    TOGGLE_TERNARY_RENDER_OPTION_0, TOGGLE_TERNARY_RENDER_OPTION_1, TOGGLE_TERNARY_RENDER_OPTION_2, TOGGLE_TERNARY_RENDER_OPTION_3,
    TOGGLE_DRAGGED_OPTION_0, TOGGLE_DRAGGED_OPTION_1, TOGGLE_DRAGGED_OPTION_2, TOGGLE_DRAGGED_OPTION_3,
    SET_GAME_TITLE, SET_GAME_TEXT, DECREMENT_GAME_LIVES, RESET_GAME_LIVES, SET_GAME_OVER
  } from "redux/familyTree/familyTreeSlice"
  
  // components and styles
  import { Draggable, Droppable } from 'react-drag-and-drop'
  import Container from "react-bootstrap/Container"
  import styles from "./KingQueenPlaying.module.scss"
  
  // utils
  import {useImage} from "Contexts/Img"
  import {usePromise} from "Contexts/Promises"
  import { shuffleArray, nothing } from "utility/utilityValues"

  export default function KingQueenPlaying() {
      return <RENDER/>
  }

  function RENDER() {

    const dispatch = useDispatch()

    const CURRENT_USER = useSelector( (state:RootState) => state.main.CURRENT_USER)
    
    const ALL_STRAINS = useSelector( (state:RootState) => state.main.ALL_STRAINS)
    const PLAYING = useSelector( (state:RootState) => state.familyTree.PLAYING)
    const PLAYING_STRAIN = useSelector( (state:RootState) => state.familyTree.PLAYING_STRAIN)
    const PLAYING_PARENT_KING = useSelector( (state:RootState) => state.familyTree.PLAYING_PARENT_KING)
    const PLAYING_PARENT_QUEEN = useSelector( (state:RootState) => state.familyTree.PLAYING_PARENT_QUEEN)
    const PLAYING_GUESS_RIGHT = useSelector( (state:RootState) => state.familyTree.PLAYING_GUESS_RIGHT)
    const PLAYING_GUESS_WRONG_1 = useSelector( (state:RootState) => state.familyTree.PLAYING_GUESS_WRONG_1)
    const PLAYING_GUESS_WRONG_2 = useSelector( (state:RootState) => state.familyTree.PLAYING_GUESS_WRONG_2)
    const PLAYING_GUESS_WRONG_3 = useSelector( (state:RootState) => state.familyTree.PLAYING_GUESS_WRONG_3)
    const WRONG_RIGHT_OPTION_BUCKET = useSelector( (state:RootState) => state.familyTree.WRONG_RIGHT_OPTION_BUCKET)
    const CLICKED_CARD = useSelector( (state:RootState) => state.familyTree.CLICKED_CARD)

    const TERNARY_RENDER_KING = useSelector( (state:RootState) => state.familyTree.TERNARY_RENDER_KING)
    const TERNARY_RENDER_OPTION_0 = useSelector( (state:RootState) => state.familyTree.TERNARY_RENDER_OPTION_0)
    const TERNARY_RENDER_OPTION_1 = useSelector( (state:RootState) => state.familyTree.TERNARY_RENDER_OPTION_1)
    const TERNARY_RENDER_OPTION_2 = useSelector( (state:RootState) => state.familyTree.TERNARY_RENDER_OPTION_2)
    const TERNARY_RENDER_OPTION_3 = useSelector( (state:RootState) => state.familyTree.TERNARY_RENDER_OPTION_3)
    
    const DRAGGED_OPTION_0 = useSelector( (state:RootState) => state.familyTree.DRAGGED_OPTION_0)
    const DRAGGED_OPTION_1 = useSelector( (state:RootState) => state.familyTree.DRAGGED_OPTION_1)
    const DRAGGED_OPTION_2 = useSelector( (state:RootState) => state.familyTree.DRAGGED_OPTION_2)
    const DRAGGED_OPTION_3 = useSelector( (state:RootState) => state.familyTree.DRAGGED_OPTION_3)

    const GAME_TITLE = useSelector( (state:RootState) => state.familyTree.GAME_TITLE)
    const GAME_TEXT = useSelector( (state:RootState) => state.familyTree.GAME_TEXT)
    const GAME_LIVES = useSelector( (state:RootState) => state.familyTree.GAME_LIVES)
    const GAME_OVER = useSelector( (state:RootState) => state.familyTree.GAME_OVER)
    
    const { king, queen, kingspades, queenspades, joker, upsidedowncard, kingqueensplit, goldcursor2, trophy } = useImage()  
    const { guessCardPROMISE, familyTreeStrainsPROMISE, resetCardGamePROMISE } = usePromise()

    useEffect( () => {
      const shuffleBucketPROMISE = new Promise( (resolve:any, reject:any) => {
        const preSortBucket = [PLAYING_GUESS_RIGHT, PLAYING_GUESS_WRONG_1, PLAYING_GUESS_WRONG_2, PLAYING_GUESS_WRONG_3]
        console.log('pre sorted state', preSortBucket)
        const bucketShuffle = shuffleArray(preSortBucket)
        resolve(bucketShuffle)
      })
      shuffleBucketPROMISE
      .then( (bucket:any) => {
        console.log('shuffled state', bucket)
        dispatch(SET_WRONG_RIGHT_OPTION_BUCKET(bucket))
      })
        
    },[])

    useEffect( () => {
      console.log('gamelives', GAME_LIVES)
      if (GAME_LIVES.length === 2) {
        console.log('you lose!')
        dispatch(SET_GAME_OVER("lose"))
        dispatch(SET_GAME_TEXT(`${CURRENT_USER.username || ''} Played The Fool! It was ${PLAYING_GUESS_RIGHT}`))
        // dispatch(SET_GAME_TEXT(`${CURRENT_USER.username || ''} Loses!`))
      }
    }, [GAME_LIVES])

    const resetText = (state:string) => {
      dispatch(SET_GAME_TEXT(`already played ${state}`))
      setTimeout( () => dispatch(SET_GAME_TEXT("")), 1000)
    }

    const cardClick = (event:any) => {
      $('.table').addClass('hover')
      const id = event.target.id
      console.log("id", id)
      console.log("type", typeof id)

      if (id === "0") {
        console.log(WRONG_RIGHT_OPTION_BUCKET[0])
        dispatch(SET_CLICKED_CARD(WRONG_RIGHT_OPTION_BUCKET[0]))
      }
      if (id === "1") {
        console.log(WRONG_RIGHT_OPTION_BUCKET[1])
        dispatch(SET_CLICKED_CARD(WRONG_RIGHT_OPTION_BUCKET[1]))
      }
      if (id === "2") {
        console.log(WRONG_RIGHT_OPTION_BUCKET[2])
        dispatch(SET_CLICKED_CARD(WRONG_RIGHT_OPTION_BUCKET[2]))
      }
      if (id === "3") {
        console.log(WRONG_RIGHT_OPTION_BUCKET[3])
        dispatch(SET_CLICKED_CARD(WRONG_RIGHT_OPTION_BUCKET[3]))
      }
    }

    const tableClickGamePlay = () => {
      console.log('clickedcard', CLICKED_CARD)
      guessCardPROMISE({card: CLICKED_CARD})
    }


    
        return (
          <Container style={{ cursor: `url('${goldcursor2}'), auto`}} id={styles.cont}>
            {/*     Dynamic UI -----> if  GAME_PLAYED === "pairents" || "Lucky Pull"    */}
            <h1 id={styles.gameTitle}> Pairents </h1>

          {/* <img className="hover" src={goldenticket}/>     */}
          <Container id={styles.kingQueenRowCont}>
          {/* <Container style={{ display: GAME_OVER ? "none" : "flex" }} id={styles.kingQueenRowCont}> */}

          <pre className={styles.ghost}> ayoo </pre>

          <Container className={styles.cardColumn}>
          <img className={styles.kingQueenCard} src={GAME_OVER === "lose" ? joker : GAME_OVER === "win" ? kingspades : king}/>
          <pre className={styles.cardText}> {PLAYING_PARENT_KING} </pre>
          </Container>

          <Container className={styles.cardColumn}>
          <img className={styles.kingQueenCard} src={GAME_OVER === "lose" ? joker : GAME_OVER === "win" ? queenspades : queen}/>
          <pre className={styles.cardText}> {PLAYING_PARENT_QUEEN} </pre>
          </Container>

          <pre className={styles.ghost}> hey </pre>

          </Container>

          <Droppable
          types={['card']}
          onDrop={guessCardPROMISE}
          // onDrop={forceHand}
          >            
          <img className="table" onClick={GAME_OVER ? resetCardGamePROMISE : tableClickGamePlay} id={styles.table} src={GAME_OVER === "win" ? trophy : kingqueensplit}/>
          </Droppable>

          <Container style={{ display: GAME_OVER ? "none" : "flex" }} id={styles.cardRow}>
            <pre className={styles.ghost}> filler </pre>

          <Container className={styles.cardColumn}>

          <Draggable type={"card"} data={WRONG_RIGHT_OPTION_BUCKET[0]}> 
          <img id="0" onClick={cardClick} onMouseEnter={() => dispatch(TOGGLE_TERNARY_RENDER_OPTION_0())} onMouseLeave={() => dispatch(TOGGLE_TERNARY_RENDER_OPTION_0())} className={styles.card} src={upsidedowncard}/>
          </Draggable>

  {TERNARY_RENDER_OPTION_0 && <pre style={{ fontSize: '14px' }} className={styles.cardText}> {WRONG_RIGHT_OPTION_BUCKET[0]} </pre>  }
          </Container>

          <Container className={styles.cardColumn}>
            <Draggable type="card" data={WRONG_RIGHT_OPTION_BUCKET[1]}> 
          <img id="1" onClick={cardClick} onMouseEnter={() => dispatch(TOGGLE_TERNARY_RENDER_OPTION_1())} onMouseLeave={() => dispatch(TOGGLE_TERNARY_RENDER_OPTION_1())} className={styles.card} src={upsidedowncard}/>
          </Draggable>
          { TERNARY_RENDER_OPTION_1 && <pre style={{ fontSize: '14px' }} className={styles.cardText}> {WRONG_RIGHT_OPTION_BUCKET[1]} </pre> }
          </Container>

          <Container className={styles.cardColumn}>
          <Draggable type="card" data={WRONG_RIGHT_OPTION_BUCKET[2]}> 
          <img id="2" onClick={cardClick} onMouseEnter={() => dispatch(TOGGLE_TERNARY_RENDER_OPTION_2())} onMouseLeave={() => dispatch(TOGGLE_TERNARY_RENDER_OPTION_2())} className={styles.card} src={upsidedowncard}/>
          { TERNARY_RENDER_OPTION_2 && <pre style={{ fontSize: '14px' }} className={styles.cardText}> {WRONG_RIGHT_OPTION_BUCKET[2]} </pre> }
          </Draggable>
          </Container>

          <Container className={styles.cardColumn}>
            
          <Draggable type="card" data={WRONG_RIGHT_OPTION_BUCKET[3]}> 
          <img id="3" onClick={cardClick} onMouseEnter={() => dispatch(TOGGLE_TERNARY_RENDER_OPTION_3())} onMouseLeave={() => dispatch(TOGGLE_TERNARY_RENDER_OPTION_3())} className={styles.card} src={upsidedowncard}/>
          { TERNARY_RENDER_OPTION_3 && <pre style={{ fontSize: '14px' }} className={styles.cardText}> {WRONG_RIGHT_OPTION_BUCKET[3]} </pre> }
          </Draggable>

          </Container>

          <pre className={styles.ghost}> filler </pre>
          </Container>

          <h6 id={styles.gameText}> {GAME_TEXT}  </h6>
          {/* <h6 id={styles.gameText}> {GAME_TEXT || 'yeah'}  </h6> */}
    
          </Container>
        )
    }
