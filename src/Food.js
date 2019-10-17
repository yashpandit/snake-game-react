import React from 'react';

export default (props) => {

    const pos = {
        left: `${props.foodPosition[0]}%`,
        top: `${props.foodPosition[1]}%`
    }

    return <div className = "food" style = {pos}></div>;
    
}