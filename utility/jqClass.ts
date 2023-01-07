import $ from 'jquery'

export default async function Class (elem:object, addremove:string, value:string) {
    if (addremove === 'add') {
        $(elem).addClass(value)
    }
    if (addremove === 'remove') {
        $(elem).removeClass(value)
    }
}