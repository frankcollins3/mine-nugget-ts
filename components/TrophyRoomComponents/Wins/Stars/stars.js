
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
const Stars = ({allUsers, sawStars}) => {
  const STARS_RANDOM_USER = useSelector( (state) => state.trophyRoom.STARS_RANDOM_USER)

  // const numStars = allUsers.length
  const numStars = 500;
  // allUsers.forEach( (user, index) => {
  //   console.log('user from stars', user)
  //   stars.push(createStar(user))
  // })

  for (let i = 0; i < numStars; i++) {
    stars.push(createStar(allUsers));
    // stars.push(createStar());
  }

  return (
    // sizing!
    <div style={{ minHeight: '50vh', minWidth: '50vw' }} className="night"> 
    {/* <div className="night">  */}
    
    <div className="constellation">{stars}
    {
      STARS_RANDOM_USER
          ?
        <Container className="Column">
    <p style={{ color: 'rgb(247, 208, 32)' }}> {STARS_RANDOM_USER.username} </p>
    {/* <p style={{ color: 'rgb(247, 208, 32)' }}> {STARS_RANDOM_USER.wins} </p>  */}
    <StarsDynamicUI stars={STARS_RANDOM_USER.wins}/>
        </Container>
          :
    <p> hey </p>
    }

    {/* this has to import redux state and so does next one  */}
    {/* dynamicUI ------>       <starContainer={5} 5 wins/>      */}
    </div>
    </div>
  );
};

export default Stars;
