import React, { Component } from 'react';
import Axios from 'axios';
import PhotoItem from './PhotoItem';
import './Gallery.css';

class Gallery extends Component {
	constructor(props){
        super(props);
        this.cancelToken = Axios.CancelToken.source();
        this.state = {
            photoset: false,
            photos: [],
            photoSizes: [],
            message: 'Loading...'
        }
        
        
    }
    
    componentDidMount(){
        Axios.get(`https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=5773753a6ea2c1f66d3b52ca41d3be26&photoset_id=${this.props.albumID}&user_id=${this.props.userID}&format=json&nojsoncallback=1`, {
            cancelToken: this.cancelToken.token
        }).then((result) => {
          this.setState({
            photoset: result.data,
            photos: result.data.photoset.photo
          })
          this.state.photos.forEach((photo) => {
            Axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=5773753a6ea2c1f66d3b52ca41d3be26&photo_id=${photo.id}&format=json&nojsoncallback=1`, {
              cancelToken: this.cancelToken.token
            }).then((result) => {
              this.setState({
                photoSizes: [...this.state.photoSizes, result.data.sizes.size]
              })
            }).catch((err) => {
              if(Axios.isCancel(err)) {
                console.log('Request Canceled on getting photo sizes.');
              } else {
                this.setState({
                  message: 'Photo Sizes not found'
                })
              }
            })
          })
        }).catch((err) => {
           if(Axios.isCancel(err)){
               console.log('Request Canceled');
           } else {
               this.setState({
                   message: 'Album not found'
               })
           }
       })
    }
    
    componentWillUnmount(){
        this.cancelToken.cancel("Operation cancelled by the user"); 
    }
    render() {
        if(this.state.photoset){
            var photolist = this.state.photos.map((photo, index) => {
                return <PhotoItem key={index} farm={photo.farm} id={photo.id} secret={photo.secret} title={photo.title} server={photo.server}/> 
            })
            return(
                <div className="gallery">
                    {photolist}
                </div>
            );
        } else {
            return(
                <h1>{this.state.message}</h1>
            )
        } 
	}
}

export default Gallery;