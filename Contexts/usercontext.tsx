import { createContext, useContext, ReactNode, useState } from "react";
import APIcall from 'utility/APIcall'
import Random from 'utility/Randomizer'
import Regex from 'utility/MasterRegex'

type userContextType = {
    username: string;
    password: string;
    email: string;
    age: number;
    strains: string|number[];
};

const userDefaults: userContextType = {  
    username: 'test',
    password: 'password',
    email: 'me@memail.com',
    age: 30,
    strains: []
};

const UserContext = createContext<userContextType>(userDefaults);

export function useGame() {
    return useContext(UserContext);
}

type Props = {
    children: ReactNode;
};

export function GameProvider({ children }: Props) {
    const [username, setUsername] = useState<string>('test');
    const [password, setPassword] = useState<string>('mypassword');
    const [email, setEmail] = useState<string>('me@memail.com');
    const [age, setAge] = useState<number>(30);
    const [strains, setStrains] = useState<string|number[]>([]);


    const value = {
        username,
        password, 
        email,
        age,
        strains,
    };

    return (
        <>
            <UserContext.Provider value={value}>
                {children}
            </UserContext.Provider>
        </>
    );
}



