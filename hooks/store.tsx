import {useEffect, useState, createContext, useMemo} from 'react'
export default async function StateStore () {
    const [state, setState] = useState('')
    const context = createContext(null as any) // a default value has to be provided   

    // initialValue provider:
    const Provider = ({ initialValue = {}, children}) => {
        // create state 
        const [state, setState] = useState(initialValue)

        // memoize 
        const contextvalue = useMemo( () => [state, setState], [state] )
        
        // return <context.Provider value={contextvalue}> {children} </context.Provider>;
        return <context.Provider value={contextvalue}> {children} </context.Provider>;

    }
}
