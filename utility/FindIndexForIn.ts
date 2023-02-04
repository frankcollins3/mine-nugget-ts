export default async function FindIndex(str:any, wheresMyIndex:string) {
    console.log('typeof str')
    console.log(typeof str)

if (typeof str === 'string') {
    let newstr:any = str;
    for (const char in newstr) {
        let stringChar:string = newstr[char]
        if (stringChar === wheresMyIndex) return char
    }
}

if (typeof str === 'object') {
    let IndexMap = new Map()
    await IndexMap.set('username', 'nice')
    await IndexMap.set('password', '')
    await IndexMap.set('email', '')
    await IndexMap.set('age', '')

    let test = str[0]

    const mapValueLoopSetter = () => {
        str.forEach( (elem) => {
            for (const property in elem) {
                console.log(`${property}`)
                console.log(`${elem[property]}`)
                const loopProperty = `${property}`
                const elemproperty = `${elem[property]}`
                
                let lowercasechar = property.slice(0, property.lastIndexOf('I')).toLowerCase()
                console.log('lowercasechar')
                console.log(lowercasechar)
                if (lowercasechar === 'username') {
                    IndexMap.set(lowercasechar, elemproperty)
                }
                if (lowercasechar === 'password') {
                    IndexMap.set(lowercasechar, elemproperty)
                }
                if (lowercasechar === 'email') {
                    IndexMap.set(lowercasechar, elemproperty)
                }
                if (lowercasechar === 'age') {
                    IndexMap.set(lowercasechar, elemproperty)
                }
            }
        })
    }

    const returnMap = () => {
        // return IndexMap
        // let mapget = IndexMap.get()
        let userObject = {
            username: IndexMap.get('username'),
            password: IndexMap.get('password'),
            email: IndexMap.get('email'),
            age: IndexMap.get('age'),
        }
        return userObject
    }

    const bothFunctions = async () => {
        await mapValueLoopSetter()
        return returnMap()
    }
    return bothFunctions()
        
    // for (const char in test) {
    //     let CHAR:string = test[char]
    //     if (CHAR === wheresMyIndex) {
    //         console.log('wheresMyIndex')
    //         console.log(wheresMyIndex)
    //         console.log('test')
    //         console.log(test)
    //         let testregex = test.slice(0, char)
    //         let lowercasetext = testregex.toLowerCase()
            
    //         console.log(IndexMap.get(lowercasetext))
    //         console.log('testregex')
    //         console.log(testregex)
    //     }
    // 
}
}
            




        
    

    
    







