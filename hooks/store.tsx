import {useEffect, useState, createContext, useMemo} from 'react'
export default async function StateStore () {
    const [state, setState] = useState('')
    const context = createContext(null) // a default value has to be provided   

    // initialValue provider:
    const Provider = ({ initialValue = {}, children}) => {
        // create state 
        const [state, setState] = useState(initialValue)

        // memoize with hook
        const contextvalue = useMemo( () => [state, setState], [state] )

    }
}
