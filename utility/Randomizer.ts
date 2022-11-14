import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";

const Random = async (arr:any) => {
    console.log('we are in the random function');
    // instead of using (arr:object) and getting a "cant use arr.length on typeof object" i validated multiple contents in existence in arr parameter with .length > 2
    if (arr.length > 2) {
        console.log(arr)
        console.log(arr.length);
        let randomValue = arr[Math.floor(Math.random() * arr.length)]
        return randomValue
    }

    
}

export default Random