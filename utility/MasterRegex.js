]export default async function Regex(url, action) {      // already forgot its not TS file: !(url:string)
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
            
            numberexp () {
                // if (typeof url === 'string') {
                    let onlynumbers = url.replace(/[/\a-z]/g, '')
                    return onlynumbers
                // }
            }
            alphabetexp() {
                console.log('url')
                console.log(url)
                let onlyletters = url.replace(/^[a-zA-Z]/g, '')
                return onlyletters
            }
        }
        if (action !== null || action !== undefined && typeof action === 'string') {
            if (action === 'numreturn') {
                
                let getNumbers = await new Exp(url).numreturn                
                return getNumbers
            }
            if (action === 'alphareturn') {
                let getLetters = await new Exp(url).athruzreturn
                console.log('getLetters')
                console.log(getLetters)
                return getLetters
            }
        }
    }
}

