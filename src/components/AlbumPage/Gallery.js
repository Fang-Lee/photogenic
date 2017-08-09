import React, { Component } from 'react';
import Axios from 'axios';
import PhotoItem from './PhotoItem';
import './Gallery.css';
import { MediaBox } from 'react-materialize';
import Lightbox from 'react-images';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      containerWidth: 0,
      geometry: {boxes: []},
      lightboxIsOpen: true
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
  closeLightbox = () => {
    this.setState({
      lightboxIsOpen: false
    })
  }
  renderLightboxImages = () => {
    let lightboxSrcs = [];
    this.props.photos.forEach((photo) => {
      lightboxSrcs.push({src: photo});
    })
    console.log(lightboxSrcs);
    return lightboxSrcs;
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
          className="box"
          style={style}></div>
      );
    });
    console.log('boxes', boxes);
    let lightboxSrcs = this.renderLightboxImages();
    return(
      <div 
        className="wrapper"
        style={{height: this.state.geometry.containerHeight + 'px',
                width: this.state.geometry.containerWidth + 'px'}}
        >
        {boxes}
        <Lightbox
          images={lightboxSrcs}
          isOpen={this.state.lightboxIsOpen}
          onClickPrev={this.gotoPrevLightboxImage}
          onClickNext={this.gotoNextLightboxImage}
          onClose={this.closeLightbox} 
          showThumbnails={true} />
      </div>
    )
	}
}

export default Gallery;