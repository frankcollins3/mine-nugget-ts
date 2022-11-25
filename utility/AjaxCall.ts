import $ from 'jquery'

export default async function AjaxCall(url:string, data:(string|null), error:(any|null)) {
    $.ajax({
        method: 'get',
        url: url,
        // data: {
        //     data
        // }
    }).then( (data) => {
        console.log('data')
        console.log(data)                
})
}