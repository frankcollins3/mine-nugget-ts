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
                
                if (textState.length < 3) {
                    console.log('were over here in the 3')
                    await setTextState(myfilteredData[0])
                } 
                else if (textState === 'strain') {
                // else if (textState.length > 6) {
                    for (let i = 0; i < myfilteredData.length; i++) {
                        
                        console.log(myfilteredData[i])
                        if (myfilteredData[i] === textState) {
                    console.log('strict equality met on state and index')
                            console.log('textState')
                            console.log(textState)
                        }
                    }
                    console.log('were in here now')
                }
                // if (textState.length > 6) {
                // }
                // else {
                    
            

        } catch (err) { console.log(err) // redirect to error page.}
    }
    
}

}  

