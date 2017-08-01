import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import AlbumPage from './components/AlbumPage/AlbumPage';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div>
					<Switch>
						<Route path="/:userID/:albumID" component={AlbumPage} />
						<Route path="/" component={HomePage} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;