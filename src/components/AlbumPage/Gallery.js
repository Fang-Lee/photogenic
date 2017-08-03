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
            console.log(this.state.photoset);
            console.log(this.state.photos);
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