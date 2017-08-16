import React, { Component } from 'react';
import Axios from 'axios';
import PhotoItem from './PhotoItem';
import './Gallery.css';
import { MediaBox, SideNav, Button, SideNavItem } from 'react-materialize';
import Lightbox from 'react-images';
import logo from '../../images/pg_logo.jpg';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      containerWidth: 0,
      geometry: {boxes: []},
      lightboxIsOpen: false,
      currentLightboxImage: 0,
      lightboxSrcs: [],
    }
  }
  resizeGeometry() {
    console.log('running resizeGeometry')
    let width = window.innerWidth;
    this.setState({
      containerWidth: width,
      geometry: require('justified-layout')(this.props.geometry, {containerWidth: window.innerWidth*0.95, containerPadding:{left: window.innerWidth*0.05, right: 0, top: 10, bottom: 10}})
    })
  }
  componentDidMount() {
    this.resizeGeometry();
    this.renderLightboxImages();
    window.addEventListener('resize', this.resizeGeometry.bind(this));
  }
  closeLightbox = () => {
    this.setState({
      lightboxIsOpen: false
    })
  }
  renderLightboxImages = () => {
    let lightboxSrcs = [];
    this.props.lightboxPhotos.forEach((photo) => {
      lightboxSrcs.push({src: photo});
    })
    this.setState({
      lightboxSrcs: lightboxSrcs
    })
  }
  gotoPrevLightboxImage = () => {
    this.setState({
      currentLightboxImage: this.state.currentLightboxImage - 1
    })
  }
  gotoNextLightboxImage = () => {
    this.setState({
      currentLightboxImage: this.state.currentLightboxImage + 1
    })
  }
  openLightbox = (index) => {
    this.setState({
      lightboxIsOpen: true,
      currentLightboxImage: index
    })
  }
  clickThumbnail = (index) => {
    this.setState({
      currentLightboxImage: index
    })
  }
  render() {
    let boxes = this.state.geometry.boxes.map((box, index) => {
      let style = {
        left: box.left,
        top: box.top,
        width: box.width,
        height: box.height,
        backgroundImage: `url(${this.props.galleryPhotos[index]})`,
        backgroundSize: 'cover',
      };
      return(
        <div 
          key={index} 
          className="box hideme"
          style={style}
          onClick={this.openLightbox.bind(this, index)}></div>
      );
    });
    let date = new Date(parseInt(this.props.albumInfo.date_create) * 1000);
    let dateCreated = date.toDateString();
    console.log(dateCreated);
    return(
      <div>
        <img className="pg-logo" src={'../../images/pg_logo.jpg'} />
        <SideNav
          trigger={<i className="fa fa-bars fa-4x sideNavButton" aria-hidden="true"></i>}
          options={{ closeOnClick: true}}
        >
            <div className="side-nav-header">
              <img className="side-nav-logo" src={logo} />
              <h3 className="albumTitle">{this.props.albumInfo.title._content}</h3>
              <p><i>by {this.props.userInfo.realname ? this.props.userInfo.realname._content : this.props.userInfo.username._content}</i></p>
            </div>
            <div className="side-nav-footer">
              <p><a target="_blank" className="github-link" href="https://github.com/Fang-Lee/photogenic"><i className="fa fa-github fa-inverse fa-2x"></i></a> <i className="credits">Created by Allen Fang and Kai-Rey Lee</i></p>
            </div>
        </SideNav>
        <div className="gallery-header">
          {/*<h1>{this.props.albumInfo.title._content}</h1>
          <p><i>by {this.props.userInfo.realname._content ? this.props.userInfo.realname._content : this.props.userInfo.username._content}</i></p>*/}
          <img className="pg-logo" src={logo} />
        </div>
        <div 
          className="wrapper"
          style={{height: this.state.geometry.containerHeight + 'px',
                  width: this.state.geometry.containerWidth + 'px'}}
        >
          <div className="gallery">
            {boxes}
          </div>
          <Lightbox
            images={this.state.lightboxSrcs}
            currentImage={this.state.currentLightboxImage}
            isOpen={this.state.lightboxIsOpen}
            onClickPrev={this.gotoPrevLightboxImage}
            onClickNext={this.gotoNextLightboxImage}
            onClose={this.closeLightbox}
            backdropClosesModal={true}
            showThumbnails={true}
            onClickThumbnail={this.clickThumbnail} />
        </div>
      </div>
    )
	}
}

export default Gallery;