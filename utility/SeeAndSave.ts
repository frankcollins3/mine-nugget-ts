import Strain from "pages/strain"
import { propTypes } from "react-bootstrap/esm/Image";
let i = 0; 
export default async function SeeAndSave(api, apilength, textState:string, setTextState:any ) {

    console.log('api and length')
    console.log(api)
    console.log(api.length)
    // element to change, the string-data-textState that will be the display text, setTextState which will setState for textState()    
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
                            let indexVar:string = myfilteredData[i + 1]                        
                            await setTextState('')
                            await setTextState(myfilteredData[i + 1])
                        }   else if (textState === 'thc')  setTextState('')
                    }                    
                }
        } catch (err) { console.log(err) // redirect to error page.}
    }    
} else {
    let elsefilter= api.filter(data => {        
        if (data !== api[3]) {
            return data            
        }
    })  
    if (textState.length < 2) {        
        setTextState(elsefilter[0])                
    }
    else if (textState.length > 2) {
        for (let i = 0; i < elsefilter.length; i++) {                        
            if (elsefilter[i] === textState) {
                console.log('textState in the met condition')
                console.log(textState)
                    console.log(elsefilter[i])
                // let indexVar:string = elsefilter[i + 1]                        
                // await setTextState('')
                if (i < 7) {
                    await setTextState(elsefilter[i + 1])
                } else { setTextState('')}

            }  
            //  else if ()  setTextState('')
        }                    
    }
  }
}  
