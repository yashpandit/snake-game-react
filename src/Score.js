import React from 'react';

export default (props) => {
    return (
        <div>
            <div className = "score">Score : {props.score}</div>
            <div className = "score">High Score : {props.highScore}</div>
        </div>
    );
}