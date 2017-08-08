import React, { Component } from 'react';
import Gallery from './Gallery';
import Axios from 'axios';
import './AlbumPage.css';

class AlbumPage extends Component {
	constructor(props){
		super(props);
		this.cancelToken = Axios.CancelToken.source();
		this.state = {
			userID: this.props.match.params.userID,
			albumID: this.props.match.params.albumID,
			photoset: false,
			photos: [],
			photoSizes: false,
			photoURLs: false,
			message: 'Loading...'
    }   
  }
	componentDidMount(){
		Axios.get(`https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=5773753a6ea2c1f66d3b52ca41d3be26&photoset_id=${this.state.albumID}&user_id=${this.state.userID}&format=json&nojsoncallback=1`, {
			cancelToken: this.cancelToken.token
		}).then((result) => {
			this.setState({
				photoset: result.data,
				photos: result.data.photoset.photo
			});
			this.state.photos.forEach((photo) => {
				Axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=5773753a6ea2c1f66d3b52ca41d3be26&photo_id=${photo.id}&format=json&nojsoncallback=1`, {
				  cancelToken: this.cancelToken.token
				}).then((result) => {
					var originalSize = result.data.sizes.size;
          var picHeight = originalSize[originalSize.length-1].height;
          var picWidth = originalSize[originalSize.length-1].width;
          var picAspectRatio = picWidth / picHeight;
					var picURL = originalSize[originalSize.length-1].source; 
				  this.setState({
				    photoSizes: [...this.state.photoSizes, picAspectRatio],
						photoURLs: [...this.state.photoURLs, picURL]
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
		console.log('this is photos', this.state.photos)
		if(this.state.photos.length === this.state.photoSizes.length) {
			return(
				<div className="album">
					<h1>Album Page</h1>
					<h1>User ID: {this.state.userID}</h1>
					<h1>Album ID: {this.state.albumID}</h1>
	        <Gallery 
	        	userID={this.state.userID} 
	        	albumID={this.state.albumID} 
	        	photos={this.state.photoURLs}
	        	geometry={this.state.photoSizes} />
				</div>
			);
		} else {
			return <h1>{this.state.message}</h1>
		}
		
	}
}

export default AlbumPage;