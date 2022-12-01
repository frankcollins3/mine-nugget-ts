import Strain from "pages/strain"
let i = 0; 
export default async function SeeAndSave(api, apilength, textState:string, setTextState:any ) {
    // element to change, the string-data-textState that will be the display text, setTextState which will setState for textState()
        console.log('api')
        console.log(api)

    if (api.includes('strain') && api.includes('dominant') && api.includes ('taste')) {
    // if (api.includes('strain' || 'parents' || 'cbd' || 'thc')) {
        try {
            console.log('atleast were trying')
            let myfilteredData = api.filter(data => {        
                if (data !== 'parents') {
                    return data
                    console.log('myfilteredData')
                    console.log(myfilteredData)
                }
            })    
            let datalength:number = myfilteredData.length
            for (i; i < datalength; i++) {
                
            }
            //    if (textState === )
               setTextState('thottie')

        } catch (err) { console.log(err) // redirect to error page.}
    }
    
}

}  
    // * <StrainDisplayValue Left Side Object.key bucket from call2 AllSTrainContainer
    // * <StrainDisplay the old container is the object.values bucket 
    // * remake textState 


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


    

    

