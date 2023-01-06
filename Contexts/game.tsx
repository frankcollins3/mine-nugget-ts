import { createContext, useContext, ReactNode, useState } from "react";
import APIcall from 'utility/APIcall'
import Random from 'utility/Randomizer'
import Regex from 'utility/MasterRegex'

type gameContextType = {
    gameOn: string;
    playing: () => void;
    notplaying: () => void;

    parents: string;
    meetTheParents: () => void;

    parent1: string;
    parent1state: () => void;

    parent2: string;
    parent2state: () => void;
};

//     gameOn: gameOn, setGameOn: setGameOn, parents: parents, setParents: setParents,
    //     parent1: parent1, setParent1: setParent1, parent2: parent2, setParent2: setParent2,
    //     winStreak: winStreak, setWinStreak: setWinStreak, wrongGuess: wrongGuess, setWrongGuess: setWrongGuess

const gameDefaults: gameContextType = {
    gameOn: 'not playing',
    playing: () => {},
    notplaying: () => {},

    parents: '',
    meetTheParents: () => {},

    parent1: '',
    parent1state: () => {},

    parent2: '',
    parent2state: () => {}


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

    const playing = () => {
        setGameOn('playing')
    }

    const notplaying = () => {
        setGameOn('not playing')
    }

    const meetTheParents = async () => {
        // setParents("oh nice")
        let strains:(object|string) = await APIcall('all', null, null)
        let randomstrain:any = await Random(strains)
        // let randomstrain:(object|string) = await Random(strains)
        let parents = randomstrain.parents
        setParents(parents)    
    }

    const parent1state = async () => {
        let splitstring:string = await Regex(parents, 'stringsplit')
        setParent1(splitstring[0])
        
    }
    
    const parent2state = async () => {
        console.log("we are firing parent2state function")        
        let splitstring:string = await Regex(parents, 'stringsplit')
        setParent2(splitstring[1])
        
    }

    const value = {
        gameOn, 
        playing,
        notplaying,

        parents,
        meetTheParents,

        parent1,
        parent1state,
        parent2, 
        parent2state
    };

    return (
        <>
            <GameContext.Provider value={value}>
                {children}
            </GameContext.Provider>
        </>
    );
}
