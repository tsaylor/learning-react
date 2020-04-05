import React from 'react';
import Bullet from './bullet';

function List(props) {
    return (
        <ul>{props.data.map(item => formatElement(item))}</ul>
    );
}

function formatElement(item) {
    if(Array.isArray(item)) {
        return <List data={item}/>
    } else {
        return <Bullet value={item}/>
    }
}

export default List;
