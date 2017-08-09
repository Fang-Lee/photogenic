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
		console.log(this.props.geometry)
    this.setState({
      containerWidth: width,
      geometry: require('justified-layout')(this.props.geometry, {containerWidth: window.innerWidth*0.95, containerPadding:{left: window.innerWidth*0.05, right: 0, top: 10, bottom: 10}})
    })
    console.log('geometry', this.state.geometry);
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
        height: box.height,
        backgroundImage: `url(${this.props.photos[index]})`,
        backgroundSize: 'cover',
      };
      return(
        <div 
          key={index} 
          className="box materialboxed"
          style={style}></div>
      );
    });
    console.log('boxes', boxes);
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