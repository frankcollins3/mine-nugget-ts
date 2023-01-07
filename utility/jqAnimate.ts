import $ from 'jquery'

export default async function Animate (obj, property:string|string[], value:string, timer:string|number) {
    $(obj)
    .animate({
        opacity: typeof property === 'object' ?  // if object/array does array include opacity
                 property.includes('opacity') ? value : '' 
                 : property === 'opacity' ? value : '' 
                 // this above code: ternary falsy block. if its not an array .includes returns error
    }, timer)
}