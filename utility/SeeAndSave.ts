import Strain from "pages/strain"
import { propTypes } from "react-bootstrap/esm/Image";
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
                
                if (textState.length < 2) {
                    console.log('were over here in the 3')
                    await setTextState(myfilteredData[0])
                } 
                else if (textState.length > 2) {
                // else if (textState.length > 6) {
                    for (let i = 0; i < myfilteredData.length; i++) {                        
                        console.log(myfilteredData[i])
                        if (myfilteredData[i] === textState) {
                            let indexVar:string = myfilteredData[i + 1]                        
                            await setTextState('')
                            await setTextState(myfilteredData[i + 1])
                            // if(i > apilength) setTextState('y')
                        }   else if (textState === 'thc')  setTextState('')
                    }
                    
                        // await setTextState(myfilteredData[i + 1])
                    // }
                    console.log('were in here now')
                }
                
                    
            

        } catch (err) { console.log(err) // redirect to error page.}
    }
    
} else {
    console.log("that stuff isn't in the API")
    

    
    let elsefilter= api.filter(data => {        
        if (data !== api[3]) {
            return data
            // returning no the parents
        }
    })  
    console.log('elsefilter')
    console.log(elsefilter)

    if (textState.length < 2) {
        console.log("text state is less than 2")
        setTextState('yes')            
    // if (elsefilter[i] === displayText) {
        // setTextState(elsefilter[i])
    }
    else if (textState.length >2 ) {
    for (i; i < elsefilter.length; i++) {
    // console.log(elsefilter[i])
    // console.log(textState.length)
            setTextState('yes again')
        }

    }

    // console.log('elsefilter')
    // console.log(elsefilter)

}

}  

