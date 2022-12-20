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
                console.log('url')
                console.log(url)
                let onlyletters = url.replace(/[^\s/a-zA-Z]+/g, '')  
                                            
                console.log('onlyletters')          
                console.log(onlyletters)          
                return onlyletters
            }
            whitespace() {
                let predry = url.replace(/\s/g, '');                
                // let predry = url.replace(/^\s+|\s+$|\s+(?=\s)/g, "")
                console.log(url.length)
                console.log(predry.length)
                return predry
            }
            splitstring() {
                console.log("in the string split method of the regex")
                let splitit= url.split(', ')
                console.log('splitit')
                console.log(splitit)
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
                console.log('cleanWhites')
                console.log(cleanWhites)
            }
            if (action === 'stringsplit') {
                console.log("were in the if block right here")
                let getString:string = new Exp(url).stringsplit

                return getString || { hey: 'nice one' }
            }
        }
    }
}

