import Strain from "pages/strain"

export default async function SeeAndSave(api, apilength, textState:string, setTextState:any ) {
    // element to change, the string-data-textState that will be the display text, setTextState which will setState for textState()
    console.log('api element and length')
    console.log('api')
    console.log(api)

    // for (const apidata of api) {
    //     console.log(apidata)
    //     console.log(api[apidata])
    // }

    let myfilteredData:object = api.filter(data => {
        console.log('data')
        console.log(data)
        if (data !== 'parents') {
            return data
        }
    })    
    console.log('myfilteredData')
    console.log(myfilteredData)

// cbd
// "0.1%"
// dominant
// "balanced hybrid"
// funfact
// "passed genes to white rhino & white russian, growers prefer original"
// gold
// "euphoria, conversation, energy"
// nugget
// "white trichomes, frosty"
// parents
// "south indian indica, brazilian sativa landrace"
// smell
// "tropical, fruity"
// strain
// "white widow"
// taste
// "not very tasty, earthy, piney, smooth, disappointing to fruity fans"
// "15%, 20%"
            // filter(callbackFn, thisArg)

    // let strain:string = api[0].strain
    // console.log('apilength')
    // console.log(apilength)

    // if (apilength === api.length) {
    //     console.log('apilength is equal to each other')
    //     console.log(apilength)
    //     console.log(`api length ${api.length}`)
    // }

    setTextState('hey')

    

    

}
