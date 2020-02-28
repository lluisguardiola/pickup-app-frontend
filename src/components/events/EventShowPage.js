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
						<Grid.Column width={12}>
							<h1>Title: {event.title}</h1>
							<h2>Playing: {game.name}</h2>
							<h3>Hosted by: {host.name}</h3>
							<p>Description: {event.description}</p>
							<p>Address: {event.address}</p>
							<p>Time: {event.time}</p>
							<p>Date: {event.date}</p>
						</Grid.Column>
						<Grid.Column width={4}>
							<h4>{attendees.length} people are attending this event:</h4>
							<ul>
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