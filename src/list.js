import React from 'react';
import Bullet from './bullet';

function List(props) {
    let items = props.data.get_item_subtree(props.parent_id)
    let display_elements = []
    let last_bullet_id = props.parent_id
    for (const item of items) {
        if(Array.isArray(item)) {
            if (last_bullet_id !== props.parent_id) {
                display_elements.push(<List data={props.data} parent_id={last_bullet_id}/>)
            }
        } else {
            display_elements.push(<Bullet data={props.data} item={item}/>)
            last_bullet_id = item.id
        }
    }
    return (
        <ul>{display_elements}</ul>
    );
}

// function formatElement(item) {
//     if(Array.isArray(item)) {
//         return <List data={props.data} parent_id={last_bullet_id}/>
//     } else {
//         return <Bullet item={item}/>
//     }
// }

export default List;
