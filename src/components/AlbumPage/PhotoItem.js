import React, { Component } from 'react';
import './PhotoItem.css';

class PhotoItem extends Component {
	constructor(props){
        super(props);
        
    }
    render() {
      console.log(`photo #${this.props.id} has width: ${this.props.width} and height ${this.props.height}`)
		  return(
            <div>
                <img className="photoItem" src={`http://farm${this.props.farm}.staticflickr.com/${this.props.server}/${this.props.id}_${this.props.secret}.jpg`} 
                    height={this.props.height} 
                    width={this.props.width}
                /> 
            </div>
        );
	}
}

export default PhotoItem;