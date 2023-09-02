import React from 'react'
const Ground = (props) => {
    const Groundstyle = {
        fill: 'green',
        border: "solid"
    };

    return (
        <>
            <rect  
            style={Groundstyle}
            x={0}
            y={props.groundYPos}
            width={window.innerWidth}
            height={window.innerHeight}
            />
        </>
            
        
    );
};
export default Ground;