import React, { useEffect, useRef, useState }  from 'react';

const useControlFallingObject = () => {
    
    const [fallingObject, setFallingObject] = useState([])
    const [speed, setSpeed] = useState(4)
    
    function updateFallingObject(){
        var newFallingObject = []
        fallingObject.forEach(element => {
            element.ypos += speed
            if( element.ypos > window.innerHeight )
                newFallingObject.push( element )
        });
        

        setFallingObject(newFallingObject)
        console.log(`FALL ${Date.now()/1000}`)
    }

    function AddFallingObject(){
        var newObject = { 
            xlinkHref: 0
            ,xpos: getRandomArbitrary(0, window.innerWidth-100)
            ,ypos: -10
            ,score:  3
        }
        setFallingObject(fallingObject.concat( newObject ))
        console.log(`ADD ${Date.now()/1000}`)
        console.log(fallingObject)
    }
    return { fallingObject, AddFallingObject, updateFallingObject }
}