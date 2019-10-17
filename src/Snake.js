import React from 'react';

export default (props) => {
    return (
        <div>
            {props.snakePosition.map((position, idx) => {
                const pos = {
                    left: `${position[0]}%`,
                    top: `${position[1]}%`
                }
                return <div className = "snake" key = {idx} style = {pos}></div>;
            })}
        </div>
    )
}