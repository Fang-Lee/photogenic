import React, { Component } from 'react';
import Gallery from './Gallery';
import Axios from 'axios';
import './AlbumPage.css';
import { Row, Col, Preloader } from 'react-materialize'; 

class AlbumPage extends Component {
	constructor(props){
		super(props);
		this.cancelToken = Axios.CancelToken.source();
		this.state = {
			userID: this.props.match.params.userID,
			albumID: this.props.match.params.albumID,
			userInfo: false,
			photoset: false,
			photosetInfo: "",
			photos: [],
			photoSizes: false,
			photoGalleryURLs: false,
			photoLightboxURLs: false,
			message: 'Loading...'
    }   
  }
	componentDidMount(){
		// Fetches photoset information
		Axios.get(`https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=5773753a6ea2c1f66d3b52ca41d3be26&photoset_id=${this.state.albumID}&user_id=${this.state.userID}&format=json&nojsoncallback=1`, {
			cancelToken: this.cancelToken.token
		}).then((result) => {
			this.setState({
				photoset: result.data,
				photos: result.data.photoset.photo
			});
			this.state.photos.forEach((photo, index) => {
				// Fetches each photo size and static url links
				Axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=5773753a6ea2c1f66d3b52ca41d3be26&photo_id=${photo.id}&format=json&nojsoncallback=1`, {
				  cancelToken: this.cancelToken.token
				}).then((result) => {
					let photoSizeArray = result.data.sizes.size;
					let largePictureIndex;
					let mediumPictureIndex;
					photoSizeArray.forEach((size, index) => {
						if (size.label === "Large") {
							largePictureIndex = index;
						}
						if (size.label === "Medium") {
							mediumPictureIndex = index;
						}
					})
          let picHeight = photoSizeArray[largePictureIndex].height;
          let picWidth = photoSizeArray[largePictureIndex].width;
          let picAspectRatio = picWidth / picHeight;
					let largePicURL = photoSizeArray[largePictureIndex].source; 
					let mediumPicURL = photoSizeArray[mediumPictureIndex].source;
				  this.setState({
				    photoSizes: [...this.state.photoSizes, picAspectRatio],
						photoGalleryURLs: [...this.state.photoGalleryURLs, mediumPicURL],
						photoLightboxURLs: [...this.state.photoLightboxURLs, largePicURL]
				  })
				}).catch((err) => {
				  if(Axios.isCancel(err)) {
				    console.log('Request Canceled on getting photo sizes.');
				  } else {
				  	console.log(err);
				  	let removedPhotoArray = this.state.photos;
				  	removedPhotoArray.splice(index, 1);
				  	console.log(this.state);
				    this.setState({
				      message: 'Photo Size not found',
				      photos: removedPhotoArray
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
		// Fetch photoset info
		Axios.get(`https://api.flickr.com/services/rest/?method=flickr.photosets.getInfo&api_key=5773753a6ea2c1f66d3b52ca41d3be26&photoset_id=${this.state.albumID}&user_id=${this.state.userID}&format=json&nojsoncallback=1` , {
			cancelToken: this.cancelToken.token
		}).then((result) => {
			this.setState({
				photosetInfo: result.data.photoset
			})
		}).catch((err) => {
		  if(Axios.isCancel(err)) {
		    console.log('Request Canceled on getting photo sizes.');
		  } else {
		    this.setState({
		      message: 'Photo Info not found'
		    })
		  }
		})
		// Fetch user info
		Axios.get(`https://api.flickr.com/services/rest/?method=flickr.people.getInfo&api_key=5773753a6ea2c1f66d3b52ca41d3be26&user_id=${this.state.userID}&format=json&nojsoncallback=1`, {
			cancelToken: this.cancelToken.token
		}).then((result) => {
			this.setState({
				userInfo: result.data.person
			})
		}).catch((err) => {
		  if(Axios.isCancel(err)) {
		    console.log('Request Canceled on getting photo sizes.');
		  } else {
		    this.setState({
		      message: 'User Info not found'
		    })
		  }
		})
	}
	componentWillUnmount(){
	  this.cancelToken.cancel("Operation cancelled by the user"); 
	}
	render() {
		if(this.state.photos.length === this.state.photoSizes.length) {
			return(
				<div className="album">
	        <Gallery 
	        	userID={this.state.userID} 
	        	albumID={this.state.albumID}
	        	userInfo={this.state.userInfo}
	        	albumInfo={this.state.photosetInfo} 
	        	galleryPhotos={this.state.photoGalleryURLs}
	        	lightboxPhotos={this.state.photoLightboxURLs}
	        	geometry={this.state.photoSizes} />
				</div>
			);
		} else {
			return (
				<div className="loadingWheel">
					<Preloader flashing size='big' />
				</div>
			)
		}
		
	}
}

export default AlbumPage;