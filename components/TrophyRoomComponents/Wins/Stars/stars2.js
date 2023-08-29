import {useState} from 'react'

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function createStar(user) {
  const style = ["style1", "style3", "style4"];
  const tam = ["tam1", "tam1", "tam1", "tam2", "tam3"];
  const opacity = ["opacity1", "opacity1", "opacity1", "opacity2", "opacity2", "opacity3"];
  const [elemHover, setElemHover] = useState(false)

  const starStyle = style[getRandomArbitrary(0, 4)];
  const starOpacity = opacity[getRandomArbitrary(0, 6)];
  const starTam = tam[getRandomArbitrary(0, 5)];
  const animationDelay = getRandomArbitrary(0, 9) / 10;

  const left = getRandomArbitrary(0, 400);
  const top = getRandomArbitrary(0, 400);


  const starClick = (event) => {
    console.log('event', event)
    console.log('id', event.target.id)
  }

  return (
      <span
      // onMouseEnter={() => setElemHover(true)}
      // onMouseLeave={() => setElemHover(false)}
      key={`${starStyle}-${starOpacity}-${starTam}-${animationDelay}-${left}-${top}`}
      className={`star ${starStyle} ${starOpacity} ${starTam}`}
      id={`${user.username} / ${user.wins}`}
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
    {`${user.username}: ${user.wins}`}
    </span>

  );
}

// userProps go here!
const Stars = ({allUsers, sawStars}) => {

  const numStars = allUsers.length
  // const numStars = 500;
  const stars = [];
  allUsers.forEach( (user, index) => {
    console.log('user from stars', user)
    stars.push(createStar(user))
  })

  // for (let i = 0; i < numStars; i++) {
  //   stars.push(createStar());
  // }

  return (
    // sizing!
    <div style={{ minHeight: '50vh', minWidth: '50vw' }} className="night"> 
    {/* <div className="night">  */}
    
    <div className="constellation">{stars}</div>
    </div>
  );
};

export default Stars;
