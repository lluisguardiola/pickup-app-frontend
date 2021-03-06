import React from 'react'
import {Search} from 'semantic-ui-react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import "./App.css"
import Home from './components/Home'
import Navbar from './components/Navbar'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Dashboard from './components/Dashboard'
import EventShowPage from './components/events/EventShowPage'
import NewEventForm from './components/events/NewEventForm'
import EditEventForm from './components/events/EditEventForm'

function App() {
	return (
		<BrowserRouter>
			<div className="App">
					<Navbar />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/dashboard" component={Dashboard} />
					<Route path="/login" component={Login} />
					<Route path="/signup" component={SignUp} />
					<Route path="/search" component={Search} /> 
					<Route path="/events/new" component={NewEventForm} />
					<Route path="/events/:id/edit" component={EditEventForm} />
					<Route path="/events/:id" component={EventShowPage} />
				</Switch>
			</div>
		</BrowserRouter>
	)
}

export default App
