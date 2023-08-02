// @ts-nocheck
import { useState, useEffect, useLayoutEffect} from 'react'
import useResizeObserver from "@react-hook/resize-observer";

export default function Resize(target) {
  const [size, setSize] = useState([])

  useLayoutEffect(() => {
    target && setSize(target.getBoundingClientRect());
  }, [target]);

  // magical. 
  useResizeObserver(target, (entry) => {
      console.log("atleast were here")
      console.log('target')
      console.log(target)
      setSize(entry.contentRect);
      return size;
    })
}
    // const BreakPointHook = (widthparam:string) => {
    //     const [matches, setMatches] = useState('')
    //     useEffect( () => {
    //         const media = window.matchMedia(widthparam)
    //         console.log('media')
    //         console.log(media)
    //     }, [matches])
    // }
