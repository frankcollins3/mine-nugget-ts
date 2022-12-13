async function LoopAndPush (LoopArray:(object|string|number), ArrOrState:(string|object|number), comparison1, comparison2,  setState:(any|null)) {
        let Array = ArrOrState;
        
        LoopArray.forEach( (loopitem:(string|object|number)) => {            
            if (comparison1 == comparison2) {                
                ArrOrState.push(loopitem)                
            } else {
                return                
            }
            return ArrOrState // kind of surprised but kind of not that you cant just return function param
        })
}

export default LoopAndPush
