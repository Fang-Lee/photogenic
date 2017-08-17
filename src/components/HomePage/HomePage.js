import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./HomePage.css";
import Axios from 'axios';
import logo from '../../images/pg_logo.jpg';

class HomePage extends Component {
  constructor(props) {
  	super(props);
    this.cancelToken = Axios.CancelToken.source();
  	this.state = {
  		albumURL: "",
      userID: "",
      albumID: "",
  	};
  }
  onURLSubmit = (e) => {
    e.preventDefault()
    if(this.state.albumURL.indexOf('/photos/') === -1 || this.state.albumURL.indexOf('/albums/') === -1){
      alert('enter valid url')
    }
    else {
      var userInfo = this.state.albumURL.split('/photos/')[1].split('/albums/')
      var albumID = userInfo[1]
      Axios.get(`https://api.flickr.com/services/rest/?method=flickr.urls.lookupUser&api_key=5773753a6ea2c1f66d3b52ca41d3be26&url=${this.state.albumURL}&format=json&nojsoncallback=1`, {
        cancelToken: this.cancelToken.token
      }).then((result) => {
        this.setState({
          userID: result.data.user.id,
          albumID: albumID
        }, () => {
          this.props.history.push(`/${this.state.userID}/${this.state.albumID}`)
        })
      })
    }
  }
  handleChange = (e) => {
  	this.setState({
      [e.target.name]: e.target.value
    }, () => {
      console.log(this.state.albumURL);
    })
  }
	render() {
		return(
			<div className="homepage">
				<div className="row">
          <div className="center"><img className="center" src={logo} alt={'logo'}/></div>
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
                  name="albumURL"
									type="text"
                  value={this.state.albumURL}
                  onChange={this.handleChange}
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
        <div className="row">
          <div className="center"><Link to="/144384142@N02/72157685076080983">DEMO</Link></div>
        </div>
			</div>
		)
	}
}

export default HomePage;