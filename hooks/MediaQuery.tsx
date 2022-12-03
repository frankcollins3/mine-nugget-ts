import { useState, useEffect, useLayoutEffect} from 'react'
import useResizeObserver from "@react-hook/resize-observer";


function useSize(target) {
  const [size, setSize] = useState([])

  useLayoutEffect(() => {
    target && setSize(target.getBoundingClientRect());
  }, [target]);

   // magic
  useResizeObserver(target, (entry) => setSize(entry.contentRect));
  return size;
}


    // const BreakPointHook = (widthparam:string) => {
    //     const [matches, setMatches] = useState('')
    //     useEffect( () => {
    //         const media = window.matchMedia(widthparam)
    //         console.log('media')
    //         console.log(media)
    //     }, [matches])
    // }

