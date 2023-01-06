import { createContext, useContext, ReactNode, useState } from "react";
import APIcall from 'utility/APIcall'
import Random from 'utility/Randomizer'

type gameContextType = {
    gameOn: string;
    playing: () => void;
    notplaying: () => void;

    parents: string;
    meetTheParents: () => void;
};

//     gameOn: gameOn, setGameOn: setGameOn, parents: parents, setParents: setParents,
    //     parent1: parent1, setParent1: setParent1, parent2: parent2, setParent2: setParent2,
    //     winStreak: winStreak, setWinStreak: setWinStreak, wrongGuess: wrongGuess, setWrongGuess: setWrongGuess

const gameDefaults: gameContextType = {
    gameOn: 'not playing',
    playing: () => {},
    notplaying: () => {},

    parents: 'no parents yet',
    meetTheParents: () => {}
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
    const [parents, setParents] = useState<string>('no parents yet')

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
        
        console.log('randomstrain')
        console.log(randomstrain)
        
        console.log('parents')
        console.log(parents)
        
    }
    
    const value = {
        gameOn, 
        playing,
        notplaying,

        parents,
        meetTheParents
    };

    return (
        <>
            <GameContext.Provider value={value}>
                {children}
            </GameContext.Provider>
        </>
    );
}
