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
    // setParent1: () => void;
    
    parent2: string;
    parent2state: () => void;
    clearparent2: () => void;
    // setParent2: () => void;

    winStreak: number;
    winstreakincrement: () => void;
    clearwinstreak: () => void;
    
    wrongGuess: number;
    guesswrongincrement: () => void;
    clearguesswrong: () => void;

    trophy: boolean;
    addTrophy: () => void;
    clearTrophy: () => void;


    lose: () => void;

    dontuse: string[] | string;
    fillbucket: (strains) => void;
    emptybucket: () => void;

    EitherParents: (parentid:string, statetext:string) => void;

    // * end of game state above. Below is the data.strain.search() page    
    searchHover: boolean;
    searchOn: () => void;
    searchOff: () => void;
    // hoverOnSearch: () => void;
    findMineTheme: string;
    toggleTheme: () => void;
    searchChar: string;
    searchCharFunc: (term) => void;

    searchBucket: any;
    fillSearchBucket: (strains) => void;
    selectedSearch: string;
    searchSelector: (search:string) => void; 
    searchType: string;
    searchTypeClick: (type:string) => void; // retrieved from jQ event object by clicking the button with 'all' or 'mine'kam
    // * end of  above. Below is the data.strain.search() page

    // ? user related global state
    username: string;
    password: string;
    email: string;
    age: number;
    strains: string|number[]

    // ? user related global state
    
    
};

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
    // setParent1: () => {},
    
    parent2: '',
    parent2state: () => {},
    clearparent2: () => {},
    // setParent2: () => {},

    winStreak: 0,
    winstreakincrement: () => {},
    clearwinstreak: () => {},
    
    wrongGuess: 0,
    guesswrongincrement: () => {},    
    clearguesswrong: () => {},

    trophy: false,
    addTrophy: () => {},
    clearTrophy: () => {},

    lose: () => {},

    dontuse: [],
    fillbucket: ([]) => {},
    emptybucket: () => {},

    EitherParents: (parentid:string, statetext:string) => {},
// * end of game state up top
    searchHover: false,
    
    searchOn: () => {},
    searchOff: () => {},

    findMineTheme: 'cone',
    toggleTheme: () => {},
    searchChar: 'none',
    searchCharFunc: (term) => {},

    searchBucket: [],
    fillSearchBucket: (strains) => {},
    selectedSearch: '',
    searchSelector: (search:string) => {},
    searchType: '',
    searchTypeClick: () => {},

// * end of FindMine state up top

    // ?
    username: 'test',
    password: 'password',
    email: 'me@memail.com',
    age: 30,
    strains: [],
    // ?
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

    const [searchHover, setSearchHover] = useState<boolean>(false)
    const [findMineTheme, setFindMineTheme] = useState<string>('cone')
    const [searchChar, setSearchChar] = useState<string>('none')

    const [searchBucket, setSearchBucket] = useState([])
    const [selectedSearch, setSelectedSearch] = useState<string>('')
    const [searchType, setSearchType] = useState<string>('')
    
    // ? userstate
    const [username, setUsername] = useState<string>('test')
    const [password, setPassword] = useState<string>('password')
    const [email, setEmail] = useState<string>('me@memail.com')
    const [age, setAge] = useState<number>(30)
    const [strains, setStrains] = useState<string|number[]>([])

    // ?
    
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
    const clearwinstreak = async () => setWinStreak(0)
    
    const guesswrongincrement = async () => setWrongGuess(wrongGuess + 1)
    const clearguesswrong = async () => setWrongGuess(0)

    const addTrophy = async () => setTrophy(true)
    const clearTrophy = async () => setTrophy(false)

    const lose = async () => {
        setWinStreak(0)
        setWrongGuess(0)
    }

    const fillbucket = async (strain:any) => {setDontuse([...dontuse, strain])}
    // const fillbucket = async (strain:any) => {setDontuse(['wow cool'])}
    const emptybucket = async () => setDontuse([])

    const EitherParents = async (parentid:string, statetext:string) => {
        console.log('here goes the EitherParents function')
    // const EitherParents = async (parent:string|number, state:string) => {
    //  was going to parse number with regex no need just wont accept a number
        if (typeof parentid === 'string') {            
            console.log("hey were in the string part of the statement")
            if (parentid === '1') setParent1(statetext)
            if (parentid === '2') setParent2(statetext)
            if (parentid === 'both') {
                setParent1(statetext)
                setParent2(statetext)
            }
        }
        return
    }    

        const searchOn = () => setSearchHover(true)
        const searchOff = () => setSearchHover(false)


        const toggleTheme = () => {
            console.log('were firing the toggleTheme function from context /game.tsx ')
            if (findMineTheme === 'cone') setFindMineTheme('barrier')
            if (findMineTheme === 'barrier') setFindMineTheme('cone')
        }

        const searchCharFunc = (term:string) => setSearchChar(term)

        const fillSearchBucket = (strains:any) => {
            const empty = () => setSearchBucket([])
            empty()
            const refill = () => setSearchBucket(strains)
            refill()
        }

        const searchSelector = (search:string) => {
            setSelectedSearch('') // checking if this is            
            setSelectedSearch(search)
        }

        const searchTypeClick = (type:string) => {
            setSearchType(type);
        }
        

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
        clearwinstreak,

        wrongGuess,
        guesswrongincrement,
        clearguesswrong,

        trophy,
        addTrophy,
        clearTrophy,

        lose,

        dontuse,
        fillbucket,
        emptybucket,
        EitherParents,

        // * end of game state above. Below is the data.strain.search() page
        searchHover,
        // hoverOnSearch,
        searchOn,
        searchOff,

        findMineTheme,
        toggleTheme,
        searchChar,
        searchCharFunc,

        searchBucket,
        fillSearchBucket,
        selectedSearch,
        searchSelector,
        searchType,
        searchTypeClick,

        username,
        password,
        email,
        age,
        strains
        // * end of FINDMINE search page state above. Below is the data.strain.search() page
    };

    return (
        <>
            <GameContext.Provider value={value}>
                {children}
            </GameContext.Provider>
        </>
    );
}



