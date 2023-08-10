import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery'
import {useDispatch} from "react-redux"

const Boop = ({ children }) => {
// const Boop = ({ rotateAngle, speed, children, setImg, iconScreenFlag, showBoat, boat, className }: Props) => {

  const dispatch = useDispatch()
  
  const targetElemRef:any = useRef(null)

  const [isRotated, setIsRotated] = useState(false);

//   useEffect(() => {
//     let halfFassed:number = speed / 2 
//     if (isRotated) {
//       const timeoutId = setTimeout(() => {
//         let elemCurrent = targetElemRef.current
//         if (elemCurrent) {
//           setTimeout( () => elemCurrent.style.transform = `rotate(${rotateAngle}deg)`, speed)
//           setTimeout( () => elemCurrent.style.transform = `rotate(-${rotateAngle}deg)`, halfFassed)
//           setTimeout( () => elemCurrent.style.transform = `rotate(0)`, speed * 1.5)
//         } else {
//           return
//         }                  
//       }, 5);
//       return () => clearTimeout(timeoutId);
//     } else {
//       return
//     }
//   }, [isRotated, rotateAngle]);

//   const boopBehaviorEnter = (event:any) => {
//     let src:string = event.target.src
//     let afterLastSlash = src.substring(src.lastIndexOf('/'), src.length)      
//     let url:string = src.slice(0, src.length - 19)
//     targetElemRef.current = event.target
//     setIsRotated(true);
//     let backSlice = src.slice(src.length - 20) 
//     if (afterLastSlash === '/pants.png') {
//       console.log('that it does pants')
//       $(event.target).attr('src', `${url}water_img/bikini.png`)
//     }

//     if (afterLastSlash === '/bikini.png') {
//       let url2:string = src.slice(0, src.length - 20)
//       $(event.target).attr('src', `${url2}water_img/pants.png`)      
//     }
// }
    
  
//   const boopBehaviorLeave = () => { setIsRotated(false); };

//   const elemClick = (event:any) => {     
//     let src:string = event.target.src    
//     console.log('src')
//     console.log(src)
//     let length:number = src.length
//     let hrefCheck:string = src.slice(0, 4);
//     let imgCheck:string = src.slice(length - 3, length)    
//     if (hrefCheck === 'http' && imgCheck === 'png' || imgCheck === 'jpeg') {
//       // dispatch(setImg(src))
//       dispatch(setImg(src))
//       dispatch(iconScreenFlag())
//       if (boat === false) showBoat()
//       $(event.target)
//       .animate({
//         top: '100px'
//       }, 500)       
//     }
//     return
//   }

const testClick = () => {
  console.log("testing the click")
}

return (
    <div>
        {React.Children.map(children, (child, index) => {
            const styledChild = React.cloneElement(child, {
              className: "boop",
              style: {
                boxShadow: '5px 5px 5px papayawhip'
              },
              onClick: testClick
            });

            return styledChild
        })}
    </div>
)

//   return (
//     <div className="boop">
//       {React.Children.map(children, (child, index) => {
//         const styledChild = React.cloneElement(child, {
//           className: className,
//           style: {
//             margin: 0
//           },
//           onMouseEnter: boopBehaviorEnter,
//           onMouseLeave: boopBehaviorLeave,
//           onClick: elemClick 
//         });

//         return styledChild;
//       })}
//     </div>
//   );
};

export default Boop;