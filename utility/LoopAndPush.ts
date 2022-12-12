async function LoopAndPush (LoopArray:(object|string|number), PushArray:(object|string|number), ArrOrState, setState:(any|null)) {
        
        LoopArray.forEach( (loopitem:(string|object|number)) => {
            console.log('loopitem')
            console.log(loopitem)
            if (expression) {
                PushArray.push(loopitem)
            }
        })
}

export default LoopAndPush
