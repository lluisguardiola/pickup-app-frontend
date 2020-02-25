import React from 'react'
import {Grid} from "semantic-ui-react"
import {withRouter} from 'react-router-dom'

class EventShowPage extends React.Component {
	state = {
		event: null
	}
	
	componentDidMount = () => {
		fetch(`http://localhost:4000/events/${this.props.match.params.id}`)
		.then(resp => resp.json())
		.then(event => {
			this.setState({
				event: event
			})
		})
    }
	
	render () {
		const {event} = this.state

		
		if (!event) {
			return <h1>LOADING ...</h1>
		} else {
			const {game, host, attendees} = event
			return (
				<Grid>
					<Grid.Row>
						<Grid.Column>
							<h1>Title: {event.title}</h1>
							<h2>Hosted by: {host.name}</h2>
							<h3>Playing: {game.name}</h3>
							<p>Description: {event.description}</p>
							<p>Address: {event.address}</p>
							<p>Time: {event.time}</p>
							<p>Date: {event.date}</p>
							<h4>{attendees.length + 1} people are attending this game:</h4>
							<ul>
								<li>{host.name}</li>
								{attendees.map(person => {
									return <li key={person.id}>{person.name}</li>
								})}
							</ul>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			)
		}
    }
}

export default withRouter(EventShowPage)