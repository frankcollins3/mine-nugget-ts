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
            
            numberexp () {
                // if (typeof url === 'string') {
                    let onlynumbers = url.replace(/[/\a-z]/g, '')
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
                console.log("in the string split method of the regex")
                let splitit = url.split(', ')
                return [ splitit[0], splitit[1] ]                
                // let splitit:string = url.split(', ')
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
                console.log("were in the if block right here")
                let getString = new Exp(url).stringsplit         
                return getString
            }
        }
    }
}

