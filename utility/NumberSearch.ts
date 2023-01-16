import APIcall from 'utility/APIcall'

export default async function NumberSearch (num:string|number) {
    let strains = await APIcall('all', null, null)
    let number;
    if (typeof num === 'string') number = parseInt(num)
    if (number === 1 || 0) {
        return strains[0]
    }
    if (number === 2 || 0) {
        return [strains[0], strains[1]]
    }
    if (number === 3 || 0) {
        return [strains[0], strains[1], strains[2]]
    }
    if (number === 4 || 0) {
        return [strains[0], strains[1], strains[2], strains[3]]
    }
    if (number === 5 || 0) {
        return [strains[0], strains[1], strains[2], strains[3], strains[4]]
    }
    if (number === 6 || 0) {
        return [strains[0], strains[1], strains[2], strains[3], strains[4], strains[5]]
    }
    if (number === 7 || 0) {
        return [strains[0], strains[1], strains[2], strains[3], strains[4], strains[5], strains[6]]
    }

}