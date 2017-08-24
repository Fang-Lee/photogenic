import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import AlbumPage from './components/AlbumPage/AlbumPage';
import ReactGA from 'react-ga';
import createHistory from 'history/createBrowserHistory';

ReactGA.initialize('UA-105227083-1');
const history = createHistory()
history.listen((location, action) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

class App extends Component {
	render() {
		return (
			<BrowserRouter history={history}>
					<Switch>
						<Route path="/:userID/:albumID" component={AlbumPage} />
						<Route path="/" component={HomePage} />
					</Switch>
			</BrowserRouter>
		);
	}
}

export default App;