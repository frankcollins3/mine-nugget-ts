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
                }
            })                
            let datalength = myfilteredData.length            
          
            // if (textState === null || undefined) {
                if (length < 3) {
                    await setTextState(myfilteredData[0])
                } else {
                    // await setTextState(myfilteredData[1])
                    for (i; i < length; i++) {
                        if (myfilteredData[i] === textState) {
                            console.log('textState')
                            console.log(textState)
                        }
                    }
                }
            console.log('textState')
            console.log(textState)

        } catch (err) { console.log(err) // redirect to error page.}
    }
    
}

}  

