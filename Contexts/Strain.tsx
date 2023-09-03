import React, { createContext, useContext, ReactNode } from "react";

// Define a context with default values
const StrainsContext = createContext<StrainsContextType | undefined>(undefined);

// Define the type for a single strain
type Strain = {
  strain: string;
  strainid: string;
  dominant: string;
  funfact: string;
  parents: string;
  taste: string;
  smell: string;
  gold: string;
  nugget: string;
  thc: string;
  cbd: string;
};

// Define the type for the strains array
type StrainsContextType = {
  strains: Strain[];
};

// Define a custom hook to access the strains context
export function useStrains() {
  const context = useContext(StrainsContext);
  if (context === undefined) {
    throw new Error("useStrains must be used within a StrainsProvider");
  }
  return context;
}

// Create a provider component to wrap your app with
type Props = {
  children: ReactNode;
};

export function StrainsProvider({ children }: Props) {
  // Define your strain data here
  const initialStrains: Strain[] = [
    { 
        "strain": "wedding cake",
        "strainid": "1",
        "dominant": "indica",
        "funfact": "leafly 2019 strain of year",
        "parents": "triangle kush, animal mints",
        "taste": "creamy, vanilla",
        "smell": "vanilla, frosting",
        "gold": "insomnia, appetite",
        "nugget": "short, dense",
        "thc": "25%",
        "cbd": "0.1%"
    },
    { 
        "strain": "GorillaGlue#4",
        "strainid": "2",
        "dominant": "sativa",
        "funfact": "sticks to fingers & scissors",
        "parents": "sour dubb, chocolate diesel",
        "taste": "fuel & diesel",
        "smell": "fuel, skunk, sour",
        "gold": "euphoria, relaxation",
        "nugget": "trichomes, spongy",
        "thc": "20%",
        "cbd": "0%"
    },
    { 
        "strain": "Do-Si-Dos",
        "strainid": "3",
        "dominant": "indica-hybrid",
        "funfact": "gender-fluid",
        "parents": "girl scout cookies, face off OG",
        "taste": "spicy, earthy",
        "smell": "pungent, sweet, earthy",
        "gold": "insomnia, pain",
        "nugget": "glittery, lime green",
        "thc": "20%, 30%",
        "cbd": "0%"
    },
    { 
        "strain": "mimosa",
        "strainid": "4",
        "dominant": "sativa-hybrid",
        "funfact":  "nutrient greedy",
        "parents":  "purple punch, clementine",
        "taste": "mimosa, orange",
        "smell": "orange, fruity",
        "gold": "uplifted, migraines",
        "nugget": "trichomes, semi-dense",
        "thc": "20%, 27%",
        "cbd": "0%"
    },
    { 
        "strain": "cherry pie",
        "strainid": "5",
        "dominant": "indica hybrid",
        "funfact":  "tastes like pie",
        "parents":  "indica GDP, sativa durban poison",
        "taste": "pie, fruity,",
        "smell": "hashy, fruity",
        "gold": "insomnia, focused",
        "nugget": "dense, orange",
        "thc": "20%",
        "cbd": "0%"
    },
    { 
        "strain": "white widow",
        "strainid": "6",
        "dominant": "balanced hybrid",
        "funfact":  "growers prefer original",
        "parents":  "south indian indica, brazilian sativa landrace",
        "taste": "disappointing to fruity fans",
        "smell": "tropical, fruity",
        "gold": "euphoria, conversation",
        "nugget": "white trichomes, frosty",
        "thc": "15%, 20%",
        "cbd": "0.1%"
    },
    { 
        "strain": "pineapple express",
        "strainid": "7",
        "dominant": "sativa",
        "funfact":  "name comes from meteorology",
        "parents":  "trainwreck, hawaiian",
        "taste": "sweet, sour, creamy",
        "smell": "tropical, pineapple",
        "gold": "anti-inflammatory, euphoria",
        "nugget": "small christmas trees",
        "thc": "15%, 26%",
        "cbd": "1%"
    }
    // Add other strain objects here...
  ];

  const value = {
    strains: initialStrains,
  };

  return (
    <StrainsContext.Provider value={value}>
      {children}
    </StrainsContext.Provider>
  );
}
