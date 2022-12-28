import $ from 'jquery'
export default async function Family(object, method) {      // already forgot its not TS file: !(url:string)
                        
            class Fam {
                constructor(object, method) {
                    this.object = object,
                    this.method = method
                }

                get getparents() {
                    return this.parents()
                } 
                
                parents() {
                    let parents = $(object).parents()            
                    return parents
                }  
                
                get getsiblings() {
                    return this.siblings()     
                }

                get children() {
                    return this.children()
                }

                siblings() {
                    let siblings = $(object).siblings()
                    return siblings
                }

                children() {
                    let children = $(object).children()
                    return children
                }

                }
                

                // if (typeof method === 'string' && typeof object === 'object') {                    
                    if (method === 'parents') {             
                        let momdad = await new Fam(object, method).getparents
                        return momdad                        
                    }
                    if (method === 'siblings') {
                        let sibling = await new Fam(object, method).getsiblings
                        return sibling
                    }
                    if (method === 'children') {
                        let children = await new Fam(object, method).getchildren
                    }

    }

