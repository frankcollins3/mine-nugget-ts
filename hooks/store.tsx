import {useEffect, useState, createContext} from 'react'
export default async function StateStore () {
    const [state, setState] = useState('')
    const context = createContext(null) // a default value has to be provided   
}
