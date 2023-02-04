import $ from 'jquery'

export default async function ElemEndpoint(elem:any, endpoint:any) {      // would do elem:(object) but that doesn't mean its object properties will be available for use.
    console.log($(elem))
    return elem.endpoint
}