import {useState, useEffect, useContext, createContext } from 'react'

let initialstate = {
    // pokemon:string: '',  cant
    // pokemon: '',
    currentStrain: '',
    savedStrains: '',
    users: [],
    dbStrains: [],
    clickedStrain: undefined || null,
    bgToggle: 'new',
    textState: '',
    displayText: '',
    styleFile: '',
    nothing: '',
    apiLen: 0
}

const StateStore = ({children}) => {
    const [state, setState] = useState(initialstate)

    // const [state, setState] = useState()
    // export default function StateStore({children}) {    
    // Make a context for the store
    const Context = createContext(null as any);
    return (
        <Context.Provider value={[state, setState]}>{children}</Context.Provider> || {my: 'life'}
// w o w 
// {i: 'kept invoking like a utility function'}: provider is literally like a <p> elem w/ open-close tag
// it can be imported and used as a wrapper. {children} the var that gets destructured threw me off.

        // {my: 'life'}
        // <Context.Provider value={[state, setState]}>{children}</Context.Provider> || {my: 'life'}
    )
}
export default StateStore
