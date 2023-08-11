import {useEffect} from "react"

// @reduxjs/toolkit
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import { 
  TOGGLE_PLAYING, TOGGLE_TERNARY_RENDER_KING, TOGGLE_TERNARY_RENDER_QUEEN, SET_WRONG_RIGHT_OPTION_BUCKET, 
  TOGGLE_TERNARY_RENDER_OPTION_1, TOGGLE_TERNARY_RENDER_OPTION_2, TOGGLE_TERNARY_RENDER_OPTION_3, TOGGLE_TERNARY_RENDER_OPTION_4,
 } from "redux/familyTree/familyTreeSlice"

// components and styles
import Container from "react-bootstrap/Container"
import styles from "./KingQueenPlaying.module.scss"

// utils
import {useImage} from "Contexts/Img"
import { shuffleArray } from "utility/utilityValues"

export default function KingQueenPlaying() {
    return <RENDER/>
}

function RENDER() {

  const dispatch = useDispatch()
  
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

  const TERNARY_RENDER_KING = useSelector( (state:RootState) => state.familyTree.TERNARY_RENDER_KING)
  const TERNARY_RENDER_OPTION_1 = useSelector( (state:RootState) => state.familyTree.TERNARY_RENDER_OPTION_1)
  const TERNARY_RENDER_OPTION_2 = useSelector( (state:RootState) => state.familyTree.TERNARY_RENDER_OPTION_2)
  const TERNARY_RENDER_OPTION_3 = useSelector( (state:RootState) => state.familyTree.TERNARY_RENDER_OPTION_3)
  const TERNARY_RENDER_OPTION_4 = useSelector( (state:RootState) => state.familyTree.TERNARY_RENDER_OPTION_4)

  const { king, queen, upsidedowncard, deckcards, kingqueensplit, goldcursor2 } = useImage()  

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

  const setStatePopState = () => {

  }
  
      return (
        <Container style={{ cursor: `url('${goldcursor2}'), auto`}} id={styles.cont}>
        {/* <img className="hover" src={goldenticket}/>     */}
        <Container id={styles.kingQueenRowCont}>

        <pre className={styles.ghost}> ayoo </pre>

        <Container className={styles.cardColumn}>
        <img className={styles.kingQueenCard} src={king}/>
        <pre className={styles.cardText}> {PLAYING_PARENT_KING} </pre>
        </Container>

        <Container className={styles.cardColumn}>
        <img className={styles.kingQueenCard} src={queen}/>
        <pre className={styles.cardText}> {PLAYING_PARENT_QUEEN} </pre>
        </Container>

        <pre className={styles.ghost}> hey </pre>

        </Container>

        <img id={styles.table} src={kingqueensplit}/>

        <Container id={styles.cardRow}>
          <pre className={styles.ghost}> filler </pre>

        <Container className={styles.cardColumn}>
        <img onMouseEnter={() => dispatch(TOGGLE_TERNARY_RENDER_OPTION_1())} onMouseLeave={() => dispatch(TOGGLE_TERNARY_RENDER_OPTION_1())} className={styles.card} src={upsidedowncard}/>
        {TERNARY_RENDER_OPTION_1 && <pre style={{ fontSize: '14px' }} className={styles.cardText}> {WRONG_RIGHT_OPTION_BUCKET[0]} </pre> }
        </Container>

        <Container className={styles.cardColumn}>
        <img onMouseEnter={() => dispatch(TOGGLE_TERNARY_RENDER_OPTION_2())} onMouseLeave={() => dispatch(TOGGLE_TERNARY_RENDER_OPTION_2())} className={styles.card} src={upsidedowncard}/>
        { TERNARY_RENDER_OPTION_2 && <pre style={{ fontSize: '14px' }} className={styles.cardText}> {WRONG_RIGHT_OPTION_BUCKET[1]} </pre> }
        </Container>

        <Container className={styles.cardColumn}>
        <img onMouseEnter={() => dispatch(TOGGLE_TERNARY_RENDER_OPTION_3())} onMouseLeave={() => dispatch(TOGGLE_TERNARY_RENDER_OPTION_3())} className={styles.card} src={upsidedowncard}/>
        { TERNARY_RENDER_OPTION_3 && <pre style={{ fontSize: '14px' }} className={styles.cardText}> {WRONG_RIGHT_OPTION_BUCKET[2]} </pre> }
        </Container>

        <Container className={styles.cardColumn}>
        <img onMouseEnter={() => dispatch(TOGGLE_TERNARY_RENDER_OPTION_4())} onMouseLeave={() => dispatch(TOGGLE_TERNARY_RENDER_OPTION_4())} className={styles.card} src={upsidedowncard}/>
        { TERNARY_RENDER_OPTION_4 && <pre style={{ fontSize: '14px' }} className={styles.cardText}> {WRONG_RIGHT_OPTION_BUCKET[3]} </pre> }
        </Container>

        <pre className={styles.ghost}> filler </pre>
        </Container>
  
        </Container>
      )
  }