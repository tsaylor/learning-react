import React from 'react';

class Bullet extends React.Component {

    constructor(props) {
        super(props);
        this.state = {editMode: false};
        this.toggleEditable = this.toggleEditable.bind(this);
    }

    toggleEditable(e) {
        this.setState({editMode: !this.state.editMode})
    }

    componentDidUpdate() {
        let elem = document.getElementById("activeBullet");
        if (elem) {elem.focus();}
    }

    onKeyDown(e) {
        console.log(e.key);
        switch (e.key) {
            case 'Tab':
                e.preventDefault();
                break;
            case 'Enter':
                // create new bullet
                break;
            case 'Shift':
                // is shifted
                break;
            default:
                break;
        }
    }

    onKeyUp(e) {
        switch (e.key) {
            case 'Shift':
                // is unshifted
                break;
        }
    }

    render() {
        console.log(this.props);
        if (this.state.editMode) {
            return (
                <li><input
                    id="activeBullet"
                    type="text"
                    defaultValue={this.props.value}
                    onBlur={this.toggleEditable}
                    onKeyDown={this.onKeyDown}
                    onKeyUp={this.onKeyUp}
                    onChange={this.mutate}
                /></li>
            )
        } else {
            return (
                <li onClick={this.toggleEditable}>{this.props.value}</li>
            );
        }
    }
}
export default Bullet;
