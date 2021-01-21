import React, { useEffect, useRef, useState }  from 'react';
import Sky from './Sky';
import Ground from './Ground';
import BucketImage from "../images/bucket.png";
import Bucket from "./Bucket";

import AppleImage from "../images/apple.png";
import BlackWatermelonImage from "../images/blackwatermelon.png";
import { Button, Input } from 'antd'
  
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

const GameFrame = (props) => {
    const viewBox = [0, 0, window.innerWidth, window.innerHeight];
    const style = {
        border: '1px solid black',
    };
    const groundYPos = window.innerHeight * 5 / 6
    const bucketSize = 100
    const bucketYPos = groundYPos - bucketSize / 2
    const fallingObjectSize = 50

    const [bucketXPos, setBucketXPos] = useState(window.innerWidth/2 - bucketSize / 2)

    const [ hasSetInterval, setHasSetInterval ] = useState(false) 
    const [fallingObjectList, setFallingObjectList] = useState([])
    const [nowTime, setNowTime] = useState(0)
    const [speed, setSpeed] = useState(4)
    const [score, setScore] = useState(0)
    const [ result, setResult ] = useState("pending") 
    const [ username, setUsername ] = useState("") 

    const clearfallingObjectList = ()=>{
        

        setFallingObjectList([])
        setNowTime( nowTime => nowTime+0.01 )
        //console.log(`FALL ${pastTime}`)
    }
    
    function updatefallingObjectList(){
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

    function addfallingObjectList(){
        const newfallingObjectList = ( nowObjectList ) =>{
            var newObjectProp;
            if( getRandomInt(2) == 0 )
                newObjectProp = { 
                    xlinkHref: AppleImage
                    ,xpos: getRandomArbitrary(0, window.innerWidth-100)
                    ,ypos: -10
                    ,score:  1
                }
            else
                newObjectProp = { 
                    xlinkHref: BlackWatermelonImage
                    ,xpos: getRandomArbitrary(0, window.innerWidth-100)
                    ,ypos: -10
                    ,score:  -1
                }   
            // retObject.push( newObject )
            console.log(`ADD ${nowTime}`)
            return  [...nowObjectList, newObjectProp ]
            
        }

        setFallingObjectList(oldArray => newfallingObjectList( oldArray ))
        setNowTime( nowTime => nowTime+0.01 )
        //console.log(`FALL ${pastTime/1000}`)
    }

    

    useEffect(()=>{
        if( result === "pending" )
        {
            var timeID1 = setInterval( addfallingObjectList, 200 )
            var timeID2 = setInterval( updatefallingObjectList, 10 )
        }
        return ()=>{
            clearInterval(timeID1);
            clearInterval(timeID2)
        }
    }, [ result])
    
    useEffect(()=>{
        const newfallingObjectList = ( nowObjectList ) =>{
            for (let index = nowObjectList.length - 1; index >= 0; index--) {
                if( nowObjectList[index].xpos < bucketXPos + bucketSize
                    && nowObjectList[index].xpos > bucketXPos - fallingObjectSize
                    && nowObjectList[index].ypos < bucketYPos + bucketSize/5
                    && nowObjectList[index].ypos > bucketYPos - fallingObjectSize )
                {
                    var nowscore = nowObjectList[index].score
                    if( nowObjectList[index].score < 0 )
                    {
                        setResult("lose")
                    }
                    else setScore( score => score+nowscore )
                    nowObjectList.splice(index, 1)
                    
                }
            }
            // retObject.push( newObject )
            //console.log(`ADD ${nowTime}`)
            return  nowObjectList           
        }
        
        setFallingObjectList(oldArray => newfallingObjectList( oldArray ))
    },[nowTime] )
        

    const handleMouseMove = (event) => {
        setBucketXPos(event.clientX - bucketSize / 2);
    }

    const scoreStyle={
        fontSize: 40
    }

    const endscoreStyle={
        fontSize: 100
    }
    const endrectStyle={
        fill: '#FFFFFF'
    }
    const endInputStyle={
        width: `${window.innerWidth}px`,
        height: "100px",
        "&::placeholder": {
            textOverflow: "ellipsis !important",
            color: "blue",
            fontSize: 100
        }
    }

    return (
        <>
            <svg
            id="web-final-canvas"
            preserveAspectRatio="xMaxYMax none" 
            style={style}
            viewBox={viewBox}
            onMouseMove={handleMouseMove}
            >
                <Sky />
                <Ground groundYPos={groundYPos} />
                <Bucket  
                xlinkHref={BucketImage}
                bucketSize={bucketSize}
                width={bucketSize}
                bucketXPos={bucketXPos}
                bucketYPos={ bucketYPos} />
                {fallingObjectList.map(ele=>
                        <image  
                        xlinkHref={ele.xlinkHref}
                        height={fallingObjectSize}
                        x={ele.xpos}
                        y={ ele.ypos}
                        />
                )}
                {result==="pending"?<text x="50" y="50" style={scoreStyle}>{`Score : ${score}`}</text>
                                    :
                (
                    <>
                <rect x="0" y="100" style={endrectStyle} width={window.innerWidth} height={100}/>
                <text x="50" y="180" style={endscoreStyle}>{`Game over, your score : ${score}`}</text>
                <foreignObject width={window.innerWidth} height={100} x="0" y="200">
                    <Input.Search placeholder="Your Name" value={username} onChange={(e) => setUsername(e.target.value)} style={endInputStyle} ></Input.Search>
                </foreignObject>
                    </>)}
            </svg>
        </>
    );
};
export default GameFrame;