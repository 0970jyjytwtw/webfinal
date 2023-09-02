import React from 'react'
import CloudImage from "../images/cloud.png";
const Sky = () => {
    const Skystyle = {
        fill: '#6495ED',
    };


    return (
        <>
            <rect  
            style={Skystyle}
            x={0}
            y={0}
            width={window.innerWidth}
            height={window.innerHeight}
            />
            <image  
                xlinkHref={CloudImage}
                width={window.innerWidth / 5}
                x={ window.innerWidth / 25}
                y={ window.innerHeight / 20} />
            <image  
                xlinkHref={CloudImage}
                width={window.innerWidth / 12}
                x={ window.innerWidth  / 25 * 5}
                y={ window.innerHeight / 30} />
            
            <image  
                xlinkHref={CloudImage}
                width={window.innerWidth / 4}
                x={ window.innerWidth  / 25 * 14}
                y={ window.innerHeight / 30} />
            
            <image  
                xlinkHref={CloudImage}
                width={window.innerWidth / 8}
                x={ window.innerWidth  / 25 * 10}
                y={ 0} />
            
            <image  
                xlinkHref={CloudImage}
                width={window.innerWidth / 8}
                x={ window.innerWidth  / 25 * 23}
                y={ 0} />
        </>
    );
};
export default Sky;