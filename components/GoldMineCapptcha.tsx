import React from 'react';
import Container from 'react-bootstrap/Container';
import {useImage} from "Contexts/Img"
import {useState} from "react"


// type CapptchaProps = {
//   size: string;
//   type: string;
// };

export let COMPLETE = false

const GoldMineCapptcha = (props:any) => {
    const resetFunc = props.resetFunc
// const GoldMineCapptcha: React.FC<CapptchaProps> = ({ size, type }) => {
  // if type then another captcha will be used. I'll make another one for another context and happily take submissions for future captchas
  return (
    <Container className="containercapptcha">      
        <Box resetFunc={resetFunc}/>        
    </Container>
  );
};


function Box (props:any) {
// const Box: React.FC = (resetFunc) => {
  const { signUpSigns, dynamite, helmet, barrier,         trophy, gold, cart,     luckypull  } = useImage();
  
  const imagebucket:string[] = [signUpSigns, dynamite, helmet, barrier, trophy, gold, cart]


  const [goldFound, setGoldFound] = useState(false)
  const [img, setImg] = useState(signUpSigns)

    const hoverShuffle = () => {
      let randomImage:any = imagebucket[Math.floor(Math.random() * imagebucket.length)]
        setImg(randomImage)
      }          

    const capptchaEval = (event:any) => {
      // store the img src of the clicked image into the event object for retrieval and comparison
        let src:string = event.target.src

        // check event.target.value against img-src that would indicate successful evaluation
        if (src.includes(trophy) || src.includes(gold) || src.includes(cart)) {
          // captcha is complete so change UI to show the mines, change text as well.
          setGoldFound(true)
          COMPLETE = true

          // user provided params that has to be a state resetting function that will trigger this function out of visibility, should be by ternary or conditional UI
          setTimeout( () => {
            props.resetFunc()
          }, 2000)
        } 
    }

    return (
        <Container onMouseEnter={hoverShuffle} id="imgBox">
          {/* invisible <pre> to make things vertically spaced evenly. */}
        <pre className="ghostcapptcha"> nice </pre>
        <img onClick={capptchaEval} className="imgcapptcha" src={img}/>
        {
          goldFound
          ? <Mine/>
          : <Slots/>
        }
        
        <pre className="textcapptcha"> {goldFound ? "Find the Mines" : "Find the Gold"} </pre>
        {/* <pre className="text"> Find the Gold. Find the Mine. </pre> */}
        </Container>
    )
}

const Slots: React.FC = () => {
    const { luckypull } = useImage()
    return <img className="slotscapptcha" src={luckypull}/> 
}

const Mine: React.FC = () => {
  const { mine } = useImage()
    return <img className="slotscapptcha" src={mine}/>
}

export default GoldMineCapptcha;
