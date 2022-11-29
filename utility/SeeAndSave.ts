export default async function SeeAndSave(element, textState:string, setTextState:any ) {
    // element to change, the string-data-textState that will be the display text, setTextState which will setState for textState()
    console.log('element')
    console.log(element)

    console.log('textState')
    console.log(textState)

    setTextState('hey how are you')
}
