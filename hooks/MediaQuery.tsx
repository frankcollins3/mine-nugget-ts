import { useState, useEffect} from 'react'

    const BreakPointHook = (widthparam:string) => {
        const [matches, setMatches] = useState('')

        useEffect( () => {
            const media = window.matchMedia(widthparam)
            console.log('media')
            console.log(media)
        }, [matches])

    }

