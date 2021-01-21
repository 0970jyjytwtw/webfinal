import React from 'react'
import BucketImage from "../images/bucket.png";
const Bucket = (props) => {


    return (
        <>
            <image  
                xlinkHref={BucketImage}
                height={props.bucketSize}
                x={props.bucketXPos}
                y={ props.bucketYPos}/>
        </>
    );
};
export default Bucket;