import React from 'react';

export default (props) => {
    return (
        <div>
            {props.snakePosition.map((dots, idx) => {
                const style = {
                    left: `${dots[0]}%`,
                    top: `${dots[1]}%`
                }
                return (
                    <div className="snake" key={idx} style={style}></div>
                )
            })}
        </div>
    )
}