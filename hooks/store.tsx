import {useEffect, useState, useContext, createContext, useMemo} from 'react'


let initialstate = {
    pokemon: '',
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




export default async function StateStore({children}) {
    // Make a context for the store
    const Context = createContext(null as any);
    const [state, setState] = useState(initialstate)

    return (
        <Context.Provider value={[state, setState]}>{children}</Context.Provider>

    )

}


// * index.tsx
//   const [ pokemon, setPokemon ] = useState('')
//   const [currentStrain, setCurrentStrain] = useState('')
//   const [savedStrains, setSavedStrains] = useState('')
//   const [users, setUsers] = useState([])
//   const [dbStrains, setDbStrains] = useState([])
// * strain.tsx
// const [clickedStrain, setClickedStrain] = useState()
// const [bgToggle, setBgToggle] = useState('new')
// const [textState, setTextState] = useState('')
// const [displayText, setDisplayText] = useState('')
// * AllStrainContainer
// const [styleFile, setStyleFile] = useState('')
// const [nothing, setNothing] = useState()
// const [apiLen, setApiLen] = useState(0)

// initialValue provider
    // const Provider = ({ initialValue = {}, children }) => {
    //   state
    //   const [state, setState] = useState(initialValue);
      // cache/memo for
    //   const contextValue = useMemo(() => [state, setState], [state]);
      // Provide the store to children
    //   return <context.Provider value={contextValue}>{children}</context.Provider>;
    // };
    // A hook to help consume the store
    // const useStore = () => useContext(context);
    // return { Provider, useStore };
//   }
