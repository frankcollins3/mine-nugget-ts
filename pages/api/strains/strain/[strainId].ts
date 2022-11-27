import APIcall from 'utility/APIcall'
export default async function (req:any, res:any) {              // res:string doesn't work
    let reqStr:string = req.query.strainId    
    // let strains = await APIcall('specify', 'white widow', null)
    let strains = await APIcall('specify', reqStr, null)
    // console.log(strains)
    res.json(  reqStr  )
}