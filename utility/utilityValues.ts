import { objectKeysFunc, objectValuesFunc, nonGenericObjectKeysFunc, nonGenericObjectValsFunc } from "./interfaceHelperFuncs"
import crypto from "crypto"

export function findStrainFromAllStrains(strainToFind:any, allStrains:any) { return allStrains.find(s => s.strain === strainToFind) }

export function keysAndValuesFromStrain (strain:any) {
    const keys = objectKeysFunc(strain)
    const values = objectValuesFunc(strain)
    const keyValStrainObj = { strainKeys: keys, strainValues: values }
    return keyValStrainObj
}

export function nonGenericKeysAndValuesFromStrain (strain:any) {
    const keys = nonGenericObjectKeysFunc(strain)
    const values = nonGenericObjectValsFunc(strain)
    const keyValStrainObj = { strainKeys: keys, strainValues: values }
    return keyValStrainObj
}

export function nothing () {return}

// return random Value from non random Array specified by Param.s
export function randomValueFromArray (array:any) { return array[Math.floor(Math.random() * array.length)] }

// Fisher-Yates / Fisher-Price shuffle for babies.

export function shuffleArray(array:any) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function shuffleArrayOfObjects(array:any) {
  const shuffledIndices:any = Array.from(array.keys());

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledIndices[i], shuffledIndices[j]] = [shuffledIndices[j], shuffledIndices[i]];
  }

  const shuffledArray:any[] = [];
  for (const index of shuffledIndices) {
    shuffledArray.push(array[index]);
  }

  return shuffledArray;
}

// const randomStrain = strains[Math.floor(Math.random() * strains.length )]


export function jsonSTRINGIFY(json:any) { JSON.stringify(json) }
export function jsonPARSE(string:any) { JSON.parse(string) }

export const JWTsecretKeyMaker = () => { return crypto.randomBytes(33).toString('hex') }

// clientside
export function getCookie() {
    if (typeof window === 'undefined') return [];
    
    const cookies = document.cookie.split('; ');
    return cookies;
  }
export function clearCookie(name) {
    document.cookie = `${name}=; expires=Thu, 11 Nov 1864 00:00:00 UTC; path=/;`;
  }


export const remembermecookiePROMISE = new Promise( (cookies, milk) => {
  // get cookie and return which will include both the token and the id.
  const precookie = getCookie()           
  cookies(precookie)
  milk("spill")
})

export function iPROMISEcookies () {
  return remembermecookiePROMISE
  .then(async(c:any) => {
    let cookieIdString = c[1]
    const sliceID = cookieIdString.slice(3)
    return sliceID || "no id"
    // let cookieID = cookieIdString.replace(RreturnNumbers, '') // replace doesn't exist on string or object
  })
}

export function ReturnUrl (context:any) {    
  if (process.env.NODE_ENV === "production") {
      return `https://${context.req.rawHeaders[1]}`;
    } 
    else  {                 
      return "http://localhost:3000";      
    }
} 

export function ThrowErrIfNoData (data:any, dataName:string) {
  if (!data) {
    throw new Error(`There is no ${dataName} error`)
  } else {
    return
  }
}

export const videoSrcArray:string[] = [
  'vids/strain.mp4',
  'vids/allAppImages.mp4',
  'vids/familytreePairents.mp4',
  'vids/hiddenIconSelection.mp4',
  'vids/loginCapptcha.mp4',
  'vids/signupCapptcha.mp4',
  'vids/rememberMeFunctionality.mp4',
  'vids/socialFeed.mp4',
]

// document.cookie = `token=${userLogin.token}; max-age=${7 * 24 * 60 * 60}; path=/;`;
