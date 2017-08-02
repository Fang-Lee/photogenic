import React, { Component } from 'react';
import './PhotoItem.css';

class PhotoItem extends Component {
	constructor(props){
        super(props);
        
    }
    render() {
        console.log(this.props.userID)
		return(
            <h1> Photo </h1> 
		);
	}
}

export default PhotoItem;