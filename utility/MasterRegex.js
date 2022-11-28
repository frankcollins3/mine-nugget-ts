export default async function Regex(url, action ) {      // already forgot its not TS file: !(url:string)
    if (url !== null || url !== undefined && typeof url === 'string') {
        class Exp {
            constructor(url) {
                this.url = url
            }
            
            get numreturn () {
                return this.numberexp()
            }
            
            numberexp () {
                if (typeof url === 'string') {
                    let onlynumbers = url.replace(/[/\a-z]/g, '')
                    return onlynumbers
                }
            }
        }
        

    }
}

