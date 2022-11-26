import $ from 'jquery'
export default async function AttrTool (target:object, attribute:string, value:string) {
    console.log(target)
    console.log(attribute)
    console.log(value)
    $(target).attr(attribute, value)
}
