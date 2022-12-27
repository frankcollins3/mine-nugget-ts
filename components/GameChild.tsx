import $ from 'jquery'

async function Family (familymember) {
// async function Family (familymember:string) {
    class Fam {
        constructor(familymember) {
            this.familymember = familymember
        }

        get parents() {
            return this.objectparents
        }
            // * getters 
        objectparents() {
            let parents = $(familymember).parents()
            return parents
        }
    }
        

    if (typeof familymember === 'object') {
        if (familymember === 'parents') {
            let parent = await new Fam(familymember).parents
            console.log('parent')
            console.log(parent)
            return parent
        }
    }
}
