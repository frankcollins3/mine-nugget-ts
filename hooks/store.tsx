import {useEffect, useState, useContext, createContext, useMemo} from 'react'

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




export default async function StateStore() {
    // Make a context for the store
    const context = createContext(null as any);
  
    // initialValue provider
    const Provider = ({ initialValue = {}, children }) => {
    //   state
      const [state, setState] = useState(initialValue);
  
      // cache/memo for
      const contextValue = useMemo(() => [state, setState], [state]);
  
      // Provide the store to children
      return <context.Provider value={contextValue}>{children}</context.Provider>;
    };

    // A hook to help consume the store
    const useStore = () => useContext(context);
    return { Provider, useStore };
  }
