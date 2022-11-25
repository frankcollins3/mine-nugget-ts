import $ from 'jquery'

export default async function AjaxCall(url:string, data:(string|null), error:(any|null)) {
    // $.ajax({
        // method: 'get',
        // url: url,
        // data: 'json'
        // data: {
        //     'json'
        // }
//     }).then( (data) => {        
//         return data
// })
    let ajaxCall = await $.ajax({
        method: 'get',
        url: url,
        data: 'json'
    })
    return ajaxCall
}
