import $ from 'jquery'
export default async function Children (target:object) {
    if (target) {
        let children = $(target).children()
        return children
    }
}