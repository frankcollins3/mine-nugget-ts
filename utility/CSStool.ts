import $ from 'jquery'
async function CSS (target:object, selector:string, value:string) {
    console.log("we are in the css tool pure function!")
    console.log(target)
    console.log(selector)
    console.log(value)
    await $(target).css(selector, value)
}
export default CSS