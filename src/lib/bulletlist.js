var BulletList = function() {
    return {
        data: [],

        get_by_id: function(id, data) {
            let items = data.filter(d => d.id == id)
            return items?items[0]:null
        },

        get_by_prev_sibling_id: function(id, data) {
            let items = data.filter(d => d.prev_sibling == id)
            return items?items[0]:null
        },

        order_children: function(children) {
            if (children.length < 2) {
                return children
            }
            let prev_sibling_id = null
            let ordered_children = []
            do {
                let next_child = children.filter(child => child.prev_sibling == prev_sibling_id)
                if (next_child.length) {
                    next_child = next_child.pop()
                    prev_sibling_id = next_child.id
                    ordered_children.push(next_child)
                }
            } while (ordered_children.length != children.length);
            return ordered_children
        },

        children_of_item: function(id) {
            return this.data.filter(d => d.parent == id)
        },

        indent: function(id) {
            let item = this.get_by_id(id, this.data)
            if (item.prev_sibling == null) {
                return false
            }
            let prev_sibling = this.get_by_id(item.prev_sibling, this.data)
            let next_sibling = this.get_by_prev_sibling_id(id, this.data)
            let children = this.data.filter(d => d.parent == prev_sibling.id)
            let last_child_id = (children.length > 0)?this.order_children(children).pop().id:null

            item.parent = prev_sibling.id
            item.prev_sibling = last_child_id
            if (next_sibling) {
                next_sibling.prev_sibling = prev_sibling.id
            }
        },

        dedent: function(id) {
            let item = this.get_by_id(id, this.data)
            if (item.parent == null) {
                return false
            }
            let old_sibling = this.get_by_prev_sibling_id(id, this.data)
            if (old_sibling) {
                old_sibling.parent = item.id
                old_sibling.prev_sibling = null
            }
            let parent = this.get_by_id(item.parent, this.data)

            let next_sibling = this.get_by_prev_sibling_id(parent.id, this.data)
            if (next_sibling) {
                next_sibling.prev_sibling = item.id
            }
            item.prev_sibling = parent.id
            item.parent = parent.parent
        },

        get_subtree: function(parent_id, data) {
            let final_list = []
            let children_of_item = this.order_children(this.children_of_item(parent_id))
            for (const item of children_of_item) {
                final_list.push(item.value)
                let subtree = this.get_subtree(item.id, data)
                if (subtree.length > 0) {
                    final_list.push(subtree)
                }
            }
            return final_list
        },

        get_item_subtree: function(parent_id) {
            let final_list = []
            let children_of_item = this.order_children(this.children_of_item(parent_id))
            for (const item of children_of_item) {
                final_list.push(item)
                let subtree = this.get_item_subtree(item.id)
                if (subtree.length > 0) {
                    final_list.push(subtree)
                }
            }
            return final_list
        }
    }
}

export default BulletList


// Test
//
// let data = [
//     {'id': 1, 'value': 'a', 'parent': null, 'prev_sibling': null},
//     {'id': 2, 'value': 'b', 'parent': null, 'prev_sibling': 1},
//     {'id': 3, 'value': 'c', 'parent': null, 'prev_sibling': 2},
//     {'id': 4, 'value': 'd', 'parent': null, 'prev_sibling': 3},
//     {'id': 5, 'value': 'e', 'parent': null, 'prev_sibling': 4},
//     {'id': 6, 'value': 'f', 'parent': null, 'prev_sibling': 5},
//     {'id': 7, 'value': 'g', 'parent': null, 'prev_sibling': 6}
// ]
//
// let bl = new BulletList()
// bl.data = data
//
// console.log(bl.data)
// console.log(bl.get_subtree(null, bl.data))
// bl.indent(4, bl.data)
// console.log(bl.data)
// console.log(bl.get_subtree(null, bl.data))
// bl.indent(5, bl.data)
// console.log(bl.data)
// console.log(bl.get_subtree(null, bl.data))
// bl.indent(2, bl.data)
// console.log(bl.data)
// console.log(bl.get_subtree(null, bl.data))
// bl.indent(5, bl.data)
// console.log(bl.data)
// console.log(bl.get_subtree(null, bl.data))
// bl.dedent(5, bl.data)
// console.log(bl.data)
// console.log(bl.get_subtree(null, bl.data))
// bl.dedent(5, bl.data)
// console.log(bl.data)
// console.log(bl.get_subtree(null, bl.data))
// bl.dedent(4, bl.data)
// console.log(bl.data)
// console.log(bl.get_subtree(null, bl.data))
// bl.dedent(2, bl.data)
// console.log(bl.data)
// console.log(bl.get_subtree(null, bl.data))
