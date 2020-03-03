import React from 'react'
import {Grid, Button, Icon} from "semantic-ui-react"
import {withRouter, Link} from 'react-router-dom'
import { connect } from 'react-redux'
import ReactMapGL, { Marker } from 'react-map-gl'

const MAPBOX_TOKEN = "pk.eyJ1IjoibGx1aSIsImEiOiJjazdjNDZ2Zm0wMGhxM2dtbnhla3MyY202In0.5OV7Y46VPigQ_LDRZyEo9Q"

class EventShowPage extends React.Component {
	state = {
		event: null,
		mapStyle: '',
		viewport: {
			width: "100vw",
			height: "100vh",
			latitude: 41.881832,
			longitude: -87.623177,
			zoom: 15
		}
	}
	
	componentDidMount = () => {
		fetch(`http://localhost:4000/events/${this.props.match.params.id}`)
		.then(resp => resp.json())
		.then(event => {
			this.setState({
				event: event
			})

			this.renderMarkers()
		})
	}

	onViewportChange = viewport => this.setState({viewport})

	renderMarkers = () => {
		fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.state.event.address}.json?country=US&types=address&access_token=${MAPBOX_TOKEN}`)
			.then(resp => resp.json())
			.then(mapboxData => {
				console.log(mapboxData)
				this.setState(prevState => {	
					return {
						...prevState,
						viewport: {
							...prevState.viewport,
							longitude: mapboxData.features[0].geometry.coordinates[0],
							latitude: mapboxData.features[0].geometry.coordinates[1]
						}
					
				}})
			})
	}
 	
	// handleAttendButton = () => {
	// 	// event.preventDefault()

	// 	fetch(`http://localhost:4000/`)
	// 	.then(resp => resp.json())
	// 	.then(data => {
	// 		console.log(data)
	// 	})
	// }
	
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
							{
								this.props.user
									?
								<Button onClick={this.handleAttendButton}>Join Event</Button> //terniary inside button checking if user is in attendee list or not.
									:
								<Link to='/login'>
									Log in to register to this event
								</Link>
							}
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						{
							!this.props.user || this.props.user.id !== host.id
								?
							null
								:
							<div>
								<Link to={{
									pathname: `/events/${event.id}/edit`,
									state: {
										event: event
									}
								}}>
									<Button>Edit</Button>
								</Link>
								<Button>Delete</Button>
							</div>
						}
					</Grid.Row>
					<Grid.Row>
							{
								!event 
									?
								null
									:
								<ReactMapGL 
									{...this.state.viewport}
									mapboxApiAccessToken={MAPBOX_TOKEN} 
									mapStyle="mapbox://styles/mapbox/streets-v11"
									onViewportChange={this.onViewportChange}
								>
									<Marker 
										latitude={this.state.viewport.latitude}
										longitude={this.state.viewport.longitude}
									>
										<Icon 
											color='red' 
											name='map marker alternate'
											size='big'
										/>
									</Marker>
								</ReactMapGL>
							}
							
					</Grid.Row>
				</Grid>
			)
		}
    }
}

const mapStateToProps = state => {
    return {
		user: state.auth,
		userEvents: state.events.userEvents
    }
}

export default connect(mapStateToProps)(withRouter(EventShowPage))