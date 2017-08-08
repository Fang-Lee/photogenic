import React, { Component } from 'react';
import Axios from 'axios';
import PhotoItem from './PhotoItem';
import './Gallery.css';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      containerWidth: 0,
      geometry: {boxes: []}
    }
  }
  resizeGeometry() {
    console.log('running resizeGeometry')
    let width = window.innerWidth;
    this.setState({
      containerWidth: width,
      geometry: require('justified-layout')(this.props.geometry)
    })
  }
  componentDidMount() {
    this.resizeGeometry();
    window.addEventListener('resize', this.resizeGeometry.bind(this));
  }
  render() {
    console.log(this.state.geometry);
    let boxes = this.state.geometry.boxes.map((box, index) => {
      let style = {
        left: box.left,
        top: box.top,
        width: box.width,
        height: box.height
      };
      return(
        <div 
          key={index} 
          className="box"
          style={style}></div>
      );
    });
    return(
      <div 
        className="wrapper"
        style={{height: this.state.geometry.containerHeight + 'px',
                width: this.state.geometry.containerWidth + 'px'}}
        >
        {boxes}
      </div>
    )
	}
}

export default Gallery;