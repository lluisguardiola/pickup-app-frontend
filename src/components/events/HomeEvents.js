import React from 'react'
import {Grid, Card, Loader} from "semantic-ui-react"
// import { Link } from 'react-router-dom'
import EventCard from './EventCard'
import {connect} from 'react-redux'
import {fetchEvents} from '../../actions/events'

class HomeEvents extends React.Component {
	
	componentDidMount = () => {
        if (this.props.events) {
            return null
        }

		fetch('http://localhost:4000/events')
		.then(resp => resp.json())
		.then(events => {
			this.props.fetchEvents(events)
		})	
    }
    
    splitArray = (array, part) => {
        const newArr = []
        for (let i = 0; i < array.length; i += part) {
            newArr.push(array.slice(i, i + part))
        }
        return newArr;
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

        const matrix = this.splitArray(events, 3)

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

    render () {
        return (
            <Grid className="HomeEvents" centered>
                {this.props.events 
                    ?
                <Grid.Row>
                    <h2>Latest PickUp Games</h2>
                    <br/>
                    {this.renderEventCards()} 
                </Grid.Row>
                    : 
                <Loader active />
                }
            </Grid>
        )
    }
}

const mapStateToProps = state => {
    return {
        events: state.events.homeEvents
    }
}

const mapDispatchToProps = dispatch => {
	return {
		fetchEvents: events => dispatch(fetchEvents(events))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeEvents)