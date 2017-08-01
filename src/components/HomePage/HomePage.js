import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import "./HomePage.css";

class HomePage extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		albumURL: "",
  		userID: "1",
  		albumID: "2",
  	};
  }
  onURLSubmit = (e) => {
    e.preventDefault();
    console.log('enter pressed');
    console.log('this is the album url', this.state.albumURL)
    this.props.history.push(`/${this.state.userID}/${this.state.albumID}`)
  }
  handleAlbumURLChange = (e) => {
  	this.setState({albumURL: e.target.value})
  	console.log(this.state.albumURL);
  }
  
	render() {
		return(
			<div className="homepage">
				<div className="row">
					<h1 className="center">PHOTOGENIC</h1>
				</div>
				<div className="row">
					<p className="center">A space for photographers to display their photos in a simple yet aesthetically pleasing way.</p>
				</div>
				<div className="row">
					<form 
            className="col s12"
            onSubmit={this.onURLSubmit}>
						<div className="row">
							<div className="input-field col s6 offset-s3">
								<input 
									id="album_url"
									type="text"
                  value={this.state.albumURL}
                  onChange={this.handleAlbumURLChange}
								/>
                <button
                  type="submit"
                  className="homepage-submit"
                  hidden="hidden">
                  Submit</button>
								<label htmlFor="album_url" className="active">Flickr Album URL</label>
							</div>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

export default HomePage;