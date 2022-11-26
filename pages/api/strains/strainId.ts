export default async function (req:any, res:any) {      // object|string not working but :any giving pass. 
    console.log("we are currently hitting the strainid dynamic route that will parse querystring return corresponding strainId object")
    let querystring:string = req.query
    console.log('querystring')
    console.log(querystring)

    res.json( { hey: 'this is my response' } )
}