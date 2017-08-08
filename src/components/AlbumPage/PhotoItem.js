import React, { Component } from 'react';
import './PhotoItem.css';

class PhotoItem extends Component {
	constructor(props){
        super(props);
        
    }
    render() {
        console.log(this.props.userID)
		return(
        <img className="photoItem" src={`http://farm${this.props.farm}.staticflickr.com/${this.props.server}/${this.props.id}_${this.props.secret}.jpg`}/> 
        );
	}
}

export default PhotoItem;