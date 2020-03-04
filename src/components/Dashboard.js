import React from 'react'
import {Grid, Header, Card, Loader} from "semantic-ui-react"
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {fetchUserEvents} from '../actions/events'
import EventCard from './events/EventCard'

class Dashboard extends React.Component {

	componentDidMount = () => {

        if(!this.props.user) {
            return null
		}

		fetch(`http://localhost:4000/users/${this.props.user.id}`)
		.then(resp => resp.json())
		.then(userEvents => {
			this.props.fetchUserEvents(userEvents)
		})
	}

	splitArray = (array, part) => {
        const newArr = []
        for (let i = 0; i < array.length; i += part) {
            newArr.push(array.slice(i, i + part))
        }
        return newArr;
    }

    renderEventCards = (events, type) => {
        if (!events) {
            return (
                <div>
                    <h4>No events found.</h4>
                </div>
            )
		}
		
		let filteredEvents

		if (type === "hosted"){
			filteredEvents = events.filter(event => event.user_id === this.props.user.id)
		} else if (type === "attended") {
			filteredEvents = events.filter(event => event.user_id !== this.props.user.id)
		}

        const matrix = this.splitArray(filteredEvents, 3)

        return matrix.map((row, index) => {
            return (
                <Card.Group key={index}>
                    {row.map(eventObj => {
                        return (
                            <EventCard
                                key={eventObj.id} 
                                event={eventObj} 
                            />
                        )
                    })}
                </Card.Group>
            )
		})
	}

	

	render(){
        if(!this.props.user) {
            this.props.history.push('/login')
            return null
		}
		
		return (
			<Grid style={{marginTop: "2rem"}}>
				<Header as='h2'>{this.props.user.name}'s Dashboard</Header>
				<Grid.Row style={{marginTop: "1rem"}}>
					<Link to="/events/new">
							Create an Event
					</Link>
				</Grid.Row>
				<Header as='h3'>Upcoming Events</Header>
				<Grid.Row style={{marginTop: "1rem"}} centered>
					
					{this.props.userEvents
						?
					this.renderEventCards(this.props.userEvents, "attended")
						:
					<Loader active />
					}
				</Grid.Row>
				<Header as='h3'>Your Hosted Events</Header>
				<Grid.Row style={{marginTop: "1rem"}} centered>
					{this.props.userEvents
						?
					this.renderEventCards(this.props.userEvents, "hosted")
						:
					<Loader active />
					}
				</Grid.Row>
			</Grid>
		)
	}
}

const mapStateToProps = state => {
    return {
		user: state.auth,
		userEvents: state.events.userEvents
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUserEvents: userEvents => dispatch(fetchUserEvents(userEvents))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard))