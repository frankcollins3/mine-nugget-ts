
// components and styles
import Container from "react-bootstrap/Container"
import StarsDynamicUI from "./StarsDynamicUI/StarsDynamicUI"

import {useState} from 'react'
import $ from 'jquery'

// @reduxjs/toolkit
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import { SET_STARS_RANDOM_USER } from "redux/trophyRoom/trophyRoomSlice"

import { randomValueFromArray } from 'utility/utilityValues';

// utils
import {useImage} from "Contexts/Img"

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const stars = [];

function createStar(allUsers) {
  const dispatch = useDispatch()

  const style = ["style1", "style3", "style4"];
  const tam = ["tam1", "tam1", "tam1", "tam2", "tam3"];
  const opacity = ["opacity1", "opacity1", "opacity1", "opacity2", "opacity2", "opacity3"];
  const [elemHover, setElemHover] = useState(false)
  const [randomUsername, setRandomUsername] = useState('')
  const [randomWins, setRandomWins] = useState('')

  const starStyle = style[getRandomArbitrary(0, 4)];
  const starOpacity = opacity[getRandomArbitrary(0, 6)];
  const starTam = tam[getRandomArbitrary(0, 5)];
  const animationDelay = getRandomArbitrary(0, 9) / 10;

  const widthWindow = window.innerWidth;
  const heightWindow = window.innerHeight;

  const left = getRandomArbitrary(0, widthWindow);
  const top = getRandomArbitrary(0, heightWindow);

  const starClick = (event) => {
    console.log('event', event)
    console.log('id', event.target.id)
  }

  const starHover = (event) => {
    console.log('allUsers', allUsers)
    setElemHover(true)
    const randomUser = randomValueFromArray(allUsers)
    dispatch(SET_STARS_RANDOM_USER(randomUser))      
  }

  return (
      <span
      onMouseEnter={starHover}
      key={`${starStyle}-${starOpacity}-${starTam}-${animationDelay}-${left}-${top}`}
      className={`star ${starStyle} ${starOpacity} ${starTam}`}
      // id={`${user.username} / ${user.wins}`}
      style={{   
        animationDelay: `${animationDelay}`,
        left: `${left}px`,
        top: `${top}px`,
        height: '2px',
        width: '2px',
        fontSize: "12px",
        color: 'rgb(247, 208, 32)'
      }}
      onClick={starClick}
    > 
    {/* { elemHover && `${randomUsername}: ${randomWins}` } */}
    {/* {`${user.username}: ${user.wins}`} */}
    </span>

  );
}

// userProps go here!
const Stars = ({allUsers}) => {

  const dispatch = useDispatch()
  const STARS_RANDOM_USER = useSelector( (state) => state.trophyRoom.STARS_RANDOM_USER)

  const { curtain, twinkle } = useImage()
  const numStars = 500;

  for (let i = 0; i < numStars; i++) {
    stars.push(createStar(allUsers));
  }

  const clickNight = async () => {
    console.log("clickNight")

    const randomUser = randomValueFromArray(allUsers)
    dispatch(SET_STARS_RANDOM_USER(randomUser))
  }

  return (
    // sizing!
    <div onClick={clickNight} style={{ minHeight: '50vh', minWidth: '50vw', cursor: `url('${twinkle}'), auto` }} className="night"> 
    
    <div className="constellation">{stars}
    {
      STARS_RANDOM_USER
          &&
        <Container className="Column">
    <p style={{ color: 'rgb(247, 208, 32)', cursor: 'none' }}> {STARS_RANDOM_USER.username} </p>
    {/* <p style={{ color: 'rgb(247, 208, 32)' }}> {STARS_RANDOM_USER.wins} </p>  */}

    <StarsDynamicUI stars={STARS_RANDOM_USER.wins} allUsers={allUsers}/>
        </Container>
    }

    {/* this has to import redux state and so does next one  */}
    {/* dynamicUI ------>       <starContainer={5} 5 wins/>      */}
    </div>
    {/* <h1 style={{ color: 'papayawhip' }}> hey how are you </h1> */}
    {/* <img onClick={curtainClick} style={{ height: '50px', width: '50px', cursor: 'pointer', border: '5px solid hotpink', pointerEvents: 'all' }} src={curtain}/> */}
    </div>
  );
};

export default Stars;
