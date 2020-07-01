import React from 'react';

export default function (props) {
    const { visible } = props;

    
    return visible ? (
        <div className="loading">
            <div className="background"></div>
            <div className="message">Loading...</div>
        </div>
    ): null;
}