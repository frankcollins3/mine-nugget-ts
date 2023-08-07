import React, { createContext, useContext, ReactNode, useState } from "react";

const date = new Date()
const year = date.getFullYear()
const today = date.getDate()

type RegexContextType = {
    RstringAfterPeriod: RegExp;
    RreturnLettersAthruZ: RegExp;
    RreturnNumbers: RegExp;
    RhasCaps: RegExp;
    RhasNums: RegExp;
    RhasSpecialChar: RegExp;
  }
  
  type RegexDefaults = {
    RstringAfterPeriod: RegExp;
    RreturnLettersAthruZ: RegExp;
    RreturnAlphaChar: RegExp;
    RreturnNumbers: RegExp;
    RhasCaps: RegExp;
    RhasNums: RegExp
    RhasSpecialChar: RegExp;
  }
  
  const regexDefaults: RegexDefaults = {
    RstringAfterPeriod: /^.*\.(.*)$/,
    RreturnLettersAthruZ: /[a\-z]/g,
    RreturnAlphaChar: /[A-Za-z]+/g,
    RreturnNumbers: /[0\-9]/g,
    RhasCaps: /[A-Z]/g,
    RhasNums: /[0-9]/g,
    RhasSpecialChar: /[!@#$%^&*()?<>,.=+-]/g,
  };

      const RegexContext = createContext<RegexContextType>(regexDefaults)
      
    export function useRegex() {
        return useContext(RegexContext)
    }

    interface Props {
        children: ReactNode
    };

    export function RegexProvider( { children } : Props ) {
        const [RstringAfterPeriod, setStringAfterPeriod] = useState<RegExp>(/^.*\.(.*)$/)            // replace      
        const [RreturnLettersAthruZ, setReturnLetterseAthruZ] = useState<RegExp>(/[a\-z]/g)          // replace
        const [RreturnAlphaChar, setRReturnAlphaChar] = useState<RegExp>(/[A-Za-z]/g)                       // replace
        const [RreturnNumbers, setReturnNumbers] = useState<RegExp>(/[0\-9]/g)                       // replace
        const [RhasCaps, setHasCaps] = useState<RegExp>(/[A-Z]/g)                                    // replace
        const [RhasNums, setHasNums] = useState<RegExp>(/[0-9]/g)                                    // replace
        const [RhasSpecialChar, setHasSpecialChar] = useState<RegExp>(/[!@#$%^&*()?<>,.=+-]/g)                                    // replace

                            
        const value = {
            RstringAfterPeriod,
            RreturnLettersAthruZ,
            RreturnNumbers,
            RreturnAlphaChar,
            RhasCaps,
            RhasNums,
            RhasSpecialChar
        };

        return (
            <RegexContext.Provider value={value}>
                {children}
            </RegexContext.Provider>
        )
    }
