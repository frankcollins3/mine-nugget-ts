export default async function (req, res) {
    // export default async function (req:(string|object|number), res:(string|object|number)) {
        let body:string = req.body
        console.log('body')
        console.log(body)
        console.log(typeof body)
        let mykeys = Object.keys(body)
        // can make the userId and strainId that get sent here a string and use a regex to pull chars before numb
        console.log('mykeys')
        console.log(mykeys)
        // let newbody = body.slice(5, 20)
        // console.log('newbody')
        // console.log(newbody)
    
        // if (typeof req === object) {            
            let testjson:string = 'testjson'        
            res.json( {myjson: testjson})
        }    
    
    