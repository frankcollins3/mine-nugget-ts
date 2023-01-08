import { createContext, useContext, ReactNode, useState } from "react";
import APIcall from 'utility/APIcall'
import Random from 'utility/Randomizer'
import Regex from 'utility/MasterRegex'

type gameContextType = {
    gameOn: string;
    playing: () => void;
    notplaying: () => void;

    parents: string;
    meetTheParents: (parentparam:string|null) => void;
    clearparents: () => void;

    parent1: string;
    parent1state: () => void;
    clearparent1: () => void;
    
    parent2: string;
    parent2state: () => void;
    clearparent2: () => void;

    winStreak: number;
    winstreakincrement: () => void;

    wrongGuess: number;
    guesswrongincrement: () => void;

    trophy: boolean;
    addTrophy: () => void;
    clearTrophy: () => void;


    lose: () => void;

    dontuse: string[] | string;
    fillbucket: (strain) => void;
    emptybucket: () => void;

    // * no need for guess .... because parents is the right guess already
};

//     gameOn: gameOn, setGameOn: setGameOn, parents: parents, setParents: setParents,
    //     parent1: parent1, setParent1: setParent1, parent2: parent2, setParent2: setParent2,
    //     winStreak: winStreak, setWinStreak: setWinStreak, wrongGuess: wrongGuess, setWrongGuess: setWrongGuess

const gameDefaults: gameContextType = {
    gameOn: 'not playing',
    playing: () => {},
    notplaying: () => {},

    parents: '',
    meetTheParents: (parentparam) => {},
    clearparents: () => {},

    parent1: '',
    parent1state: () => {},
    clearparent1: () => {},
    
    parent2: '',
    parent2state: () => {},
    clearparent2: () => {},

    winStreak: 0,
    winstreakincrement: () => {},
    
    wrongGuess: 0,
    guesswrongincrement: () => {},    

    trophy: false,
    addTrophy: () => {},
    clearTrophy: () => {},

    lose: () => {},

    dontuse: [],
    fillbucket: () => {},
    emptybucket: () => {}
};

const GameContext = createContext<gameContextType>(gameDefaults);

export function useGame() {
    return useContext(GameContext);
}

type Props = {
    children: ReactNode;
};

export function GameProvider({ children }: Props) {
    const [user, setUser] = useState<string>('no user');
    const [gameOn, setGameOn] = useState<string>('not playing');
    const [parents, setParents] = useState<string>('')
    const [parent1, setParent1] = useState<string>('')
    const [parent2, setParent2] = useState<string>('')
    const [winStreak, setWinStreak] = useState<number>(0)
    const [wrongGuess, setWrongGuess] = useState<number>(0)
    const [dontuse, setDontuse] = useState<string[]>([])
    const [trophy, setTrophy] = useState<boolean>(false)
    // const [dontuse, setDontuse] = useState<string[]>([])
    
    const playing = () => {
        setGameOn('playing')
    }

    const notplaying = () => {
        setGameOn('not playing')
    }

    const meetTheParents = async (parentparam:string|null|any) => {        
        if (parentparam === 'strain') {
            console.log("if block reached")
            let strains:(object|string) = await APIcall('all', null, null)
            let randomstrain:any = await Random(strains)            
            let parents = randomstrain.parents
            setParents(parents)    
        } else {            
            setParents(parentparam)
        }
    }

    const clearparents = () => setParents('')

    const parent1state = async () => {
        let splitstring:string = await Regex(parents, 'stringsplit')
        setParent1(splitstring[0])        
    }
    const clearparent1 = () => setParent1('')
    
    const parent2state = async () => {
        console.log("we are firing parent2state function")        
        let splitstring:string = await Regex(parents, 'stringsplit')
        setParent2(splitstring[1])
    }
    const clearparent2 = () => setParent2('')

    const winstreakincrement = async () => {
        console.log("in the winstreak argument")
        setWinStreak(winStreak + 1)
    }
    // const winstreakclear = async () => setWinStreak(0)
    const guesswrongincrement = async () => setWrongGuess(wrongGuess + 1)

    const addTrophy = async () => setTrophy(true)
    const clearTrophy = async () => setTrophy(false)

    const lose = async () => {
        setWinStreak(0)
        setWrongGuess(0)
    }

    const fillbucket = async (strain:any) => {setDontuse([...dontuse, strain])}
    // const fillbucket = async (strain:any) => {setDontuse(['wow cool'])}
    const emptybucket = async () => setDontuse([])

    
        

    const value = {
        gameOn, 
        playing,
        notplaying,

        parents,
        meetTheParents,
        clearparents,

        parent1,
        parent1state,
        clearparent1,
        parent2, 
        parent2state,
        clearparent2,
        setParent1,
        setParent2,
        
        winStreak,
        winstreakincrement,

        wrongGuess,
        guesswrongincrement,

        trophy,
        addTrophy,
        clearTrophy,

        lose,

        dontuse,
        fillbucket,
        emptybucket,
    };

    return (
        <>
            <GameContext.Provider value={value}>
                {children}
            </GameContext.Provider>
        </>
    );
}
