import React from 'react';

export default (props) => {

    const style = {
        left: `${props.foodPosition[0]}%`,
        top: `${props.foodPosition[1]}%`
    }

    return (
        <div className="food" style={style}>

        </div>
    );
    
}