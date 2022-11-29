export default async function SeeAndSave(element, textState:string, setTextState:any ) {
    // element to change, the string-data-textState that will be the display text, setTextState which will setState for textState()
    console.log('element')
    console.log(element)

    let strain:string = element[0].strain
    console.log('strain API functions')
    console.log(strain)

    console.log('textState')
    console.log(textState)

    setTextState(strain)
}
