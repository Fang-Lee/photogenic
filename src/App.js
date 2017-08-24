import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import AlbumPage from './components/AlbumPage/AlbumPage';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-105227083-1');
function logPageView() {
	console.log('google analytics');
  ReactGA.set({ page: window.location.pathname + window.location.search });
  ReactGA.pageview(window.location.pathname + window.location.search);
}

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div>
					<Switch>
						<Route path="/:userID/:albumID" component={AlbumPage} onUpdate={logPageView} />
						<Route path="/" component={HomePage} onUpdate={logPageView}/>
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;