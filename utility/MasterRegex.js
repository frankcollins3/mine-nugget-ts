export default async function Regex(url, action) {      // already forgot its not TS file: !(url:string)
    if (url !== null || url !== undefined && typeof url === 'string') {
        class Exp {
            constructor(url) {
                this.url = url
            }
            
            get numreturn () {
                return this.numberexp()
            }

            get athruzreturn () {
                return this.alphabetexp()
            }
            get whiteout() {
                return this.whitespace()
            }
            get stringsplit() {
                return this.splitstring()
            }
            get nospecialchar() {
                return this.nospecials()
            }

            get lastchar() {
                return this.returnlastchar()
            }
            
            numberexp () {
                // if (typeof url === 'string') {
                    let onlynumbers = url.replace(/[/\a-zA-Z]/g, '')
                    return onlynumbers
                // }
            }
            alphabetexp() {
                let onlyletters = url.replace(/[^\s/a-zA-Z]+/g, '')                                                              
                return onlyletters
            }
            whitespace() {
                let predry = url.replace(/\s/g, '');                
                // let predry = url.replace(/^\s+|\s+$|\s+(?=\s)/g, "")                
                return predry
            }
            splitstring() {
                let splitit = url.split(', ')                
                return [ splitit[0], splitit[1] ]                
                // let splitit:string = url.split(', ')
            }
            nospecials() {
                let nospec = url.replace(/[\/!@#$%^&*]/g, '')
                return nospec
            }
            returnlastchar() {
                let urlLength = url.length // let urlLength:number = url.length
                let lastchar = url.slice(0, urlLength - 1)
                return lastchar
            }
        }
        if (action !== null || action !== undefined && typeof action === 'string') {
            if (action === 'numreturn') {                
                let getNumbers = await new Exp(url).numreturn                
                return getNumbers
            }
            if (action === 'alphareturn') {
                let getLetters = await new Exp(url).athruzreturn
                return getLetters
            }
            if (action === 'whiteout') {
                let cleanWhites = await new Exp(url).whiteout
                return cleanWhites
                
            }
            if (action === 'stringsplit') {
                let getString = new Exp(url).stringsplit
                return getString
            }
            if (action === 'specialchar') {
                let noSpecial = new Exp(url).nospecials
                return noSpecial
            }
            if (action === 'lastchar') {
                let lastCharacter = new Exp(url).lastchar
                return lastCharacter
            } 
            if (action !== 'numreturn' || action !== 'alphareturn' || action !== 'whiteout' || action !== 'stringsplit' || action !== 'specialchar' || action !== 'lastchar') {
                let characterJoin = action.join()
                let expression = /[\/`${characterjoin}`]/g;
                let charRegex = url.replace(expression)
                return charRegex                
            }
        }
    }
}

