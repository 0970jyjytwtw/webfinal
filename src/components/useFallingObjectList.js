import React, { useEffect, useRef, useState }  from 'react';
import styled, { keyframes } from 'styled-components';
import AppleImage from "../images/apple.png";



function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
const useFallingObjectList = () => {

    const [fallingObjectList, setFallingObjectList] = useState([])
    const [nowTime, setNowTime] = useState(0)
    const [speed, setSpeed] = useState(4)
    const [score, setScore] = useState(0)

    const clearfallingObjectList = ()=>{
        
        setFallingObjectList([])
        setNowTime( nowTime => nowTime+0.01 )
        //console.log(`FALL ${pastTime}`)
    }

    const updatefallingObjectList = ()=>{
        const newfallingObjectList = ( nowObjectList ) =>{
            for (let index = nowObjectList.length - 1; index >= 0; index--) {
                nowObjectList[index].ypos += speed;   
                if( nowObjectList[index].ypos > window.innerHeight ) nowObjectList.splice(index, 1)
            }
            // retObject.push( newObject )
            //console.log(`ADD ${nowTime}`)
            return  nowObjectList
            
        }

        setFallingObjectList(oldArray => newfallingObjectList( oldArray ))
        setNowTime( nowTime => nowTime+0.01 )
        //console.log(`FALL ${nowTime}`)
    }

    const addfallingObjectList = ()=>{
        const newfallingObjectList = ( nowObjectList ) =>{
            var newObjectProp = { 
                xlinkHref: 0
                ,xpos: getRandomArbitrary(0, window.innerWidth-100)
                ,ypos: -10
                ,score:  3
            }
            // retObject.push( newObject )
            console.log(`ADD ${nowTime}`)
            return  [...nowObjectList, newObjectProp ]
            
        }

        setFallingObjectList(oldArray => newfallingObjectList( oldArray ))
        setNowTime( nowTime => nowTime+0.01 )
        //console.log(`FALL ${pastTime/1000}`)
    }



    return { fallingObjectList, addfallingObjectList, updatefallingObjectList, clearfallingObjectList }
    
}

export default useFallingObjectList