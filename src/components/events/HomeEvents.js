import React from 'react'
import {Grid} from "semantic-ui-react"
// import { Link } from 'react-router-dom'
import EventCard from './EventCard'
import {connect} from 'react-redux'
import {fetchEvents} from '../../actions/events'

class HomeEvents extends React.Component {
	
	componentDidMount = () => {
		fetch('http://localhost:4000/events')
		.then(resp => resp.json())
		.then(events => {
			this.props.fetchEvents(events)
		})	
	} 

    renderEventCards = () => {
        const {events} = this.props

        if (events === null || events.length === 0 || !events) {
            return (
                <div>
                    <h4>No events found.</h4>
                </div>
            )
        }

        return events.map(eventObj => {
            return <EventCard key={eventObj.id} event={eventObj}/>
        })
    }

    render () {
        return (
            <div className="HomeEvents">
                <Grid.Column>
                    <h2>PickUp Games Near You</h2>
					{this.renderEventCards()}
                </Grid.Column>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        events: state.events
    }
}

const mapDispatchToProps = dispatch => {
	return {
		fetchEvents: events => dispatch(fetchEvents(events))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeEvents)