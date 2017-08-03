import React, { Component } from 'react';
import Gallery from './Gallery';
import Axios from 'axios';
import './AlbumPage.css';

class AlbumPage extends Component {
	render() {
		let userID = this.props.match.params.userID;
		let albumID = this.props.match.params.albumID;
		return(
			<div className="album">
				<h1>Album Page</h1>
				<h1>User ID: {userID}</h1>
				<h1>Album ID: {albumID}</h1>
                <Gallery userID={userID} albumID={albumID} />
			</div>
		);
	}
}

export default AlbumPage;