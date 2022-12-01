import Strain from "pages/strain"
let i = 0; 
export default async function SeeAndSave(api, apilength, textState:string, setTextState:any ) {
    
    if (api.includes('strain') && api.includes('dominant') && api.includes ('taste')) {
        try {
            let myfilteredData = api.filter(data => {        
                if (data !== 'parents') {
                    return data                    
                }
            })                
            let datalength = myfilteredData.length             
                if (textState.length < 2) {
                    await setTextState(myfilteredData[0])
                } 
                else if (textState.length > 2) {
                    for (let i = 0; i < myfilteredData.length; i++) {                        
                        if (myfilteredData[i] === textState) {
                            let newindex:string = myfilteredData[i] + 1                        
                            await setTextState('')
                            await setTextState(newindex)                            
                        }   else if (textState === 'thc')  setTextState('')
                    }                                       
                }

        } catch (err) { console.log(err) // res.redirect(error)
    }
    
} else {
    console.log("our api does not include that stuff")
}

}  

