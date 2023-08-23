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
    
    MemailExtension: RegExp;
    MletterAfterSlash: RegExp;
    MstringAfterHost3000: RegExp;
  }
  
  type RegexDefaults = {
    RstringAfterPeriod: RegExp;
    RreturnLettersAthruZ: RegExp;
    RreturnAlphaChar: RegExp;
    RreturnNumbers: RegExp;
    RhasCaps: RegExp;
    RhasNums: RegExp
    RhasSpecialChar: RegExp;
    MemailExtension: RegExp;
    MletterAfterSlash: RegExp;
    MstringAfterHost3000: RegExp;
  }
  
  const regexDefaults: RegexDefaults = {
    RstringAfterPeriod: /^.*\.(.*)$/,
    RreturnLettersAthruZ: /[a\-z]/g,
    RreturnAlphaChar: /[A-Za-z]+/g,

    // RreturnAlphaChar: /[A-Za-z]+/g,          /[^0-9]/g
    RreturnNumbers: /[0\-9]/g,
    RhasCaps: /[A-Z\s]/g,
    
    RhasNums: /\d+/g,
    RhasSpecialChar: /[!@#$%^&*()?<>,.=+-]/g,

    MemailExtension: /(\.\w+)$/,
    MletterAfterSlash: /\/(.)/,
    MstringAfterHost3000: /\/(\w+\/\w+\.\w+)/    
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
        const [RhasCaps, setHasCaps] = useState<RegExp>(/[A-Z\s]/g)                                    // replace
        const [RhasNums, setHasNums] = useState<RegExp>(/\d+/g)                                    // replace
        const [RhasSpecialChar, setHasSpecialChar] = useState<RegExp>(/[!@#$%^&*()?<>,.=+-]/g)                                    // replace

        const [MemailExtension, setMemailExtension] = useState<RegExp>(/(\.\w+)$/)                                    
        const [MletterAfterSlash, setMLetterAfterSlash] = useState<RegExp>(/\/(.)/)                                    
        const [MstringAfterHost3000, setMStringfterHost3000] = useState<RegExp>(/\/(\w+\/\w+\.\w+)/)
                            
        const value = {
            RstringAfterPeriod,
            RreturnLettersAthruZ,
            RreturnNumbers,
            RreturnAlphaChar,
            RhasCaps,
            RhasNums,
            RhasSpecialChar,

            MemailExtension,
            MletterAfterSlash,
            MstringAfterHost3000
        };

        return (
            <RegexContext.Provider value={value}>
                {children}
            </RegexContext.Provider>
        )
    }
