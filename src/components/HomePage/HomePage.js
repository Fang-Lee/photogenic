import React, { Component } from 'react';
import "./HomePage.css";

class HomePage extends Component {
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
					<form className="col s12">
						<div className="row">
							<div className="input-field col s6 offset-s3">
								<input 
									id="album_url"
									type="text"
									className="validate"
								/>
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