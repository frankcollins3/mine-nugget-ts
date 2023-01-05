import { useContext, createContext } from 'react'

type gameContextType = {
    gameOn: boolean, 
    // setGameOn: (setGameOn: (value: string) => void) => void,
}

const gamecontextdefaults: gameContextType = {
    gameOn: false
}

const gameContext = createContext<gameContextType>(gamecontextdefaults)
console.log('gameContext')
console.log(gameContext)


// * gameOn, setGameOn, parents, setParents, parent1, setParent1,
// * parent2, setParent2, winStreak, setWinStreak, wrongGuess, setWrongGuess







