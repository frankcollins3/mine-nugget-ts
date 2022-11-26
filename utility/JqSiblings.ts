import $ from 'jquery'
export default async function Siblings (target:object) {
    try {
        if (target) {
            let siblings = $(target).siblings()
            return siblings
        }
    }
    catch(err) {
        console.log(err)
        // redirect to error page. spinning pickaxe.
    }
}