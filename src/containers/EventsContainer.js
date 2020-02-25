import React from 'react'
import {Grid} from "semantic-ui-react"
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
import EventPreview from '../components/events/EventPreview'


class EventsContainer extends React.Component {
    constructor(){
        super()
        this.state = {
            event: null
        }
    }

    renderEventPreviews = () => {
        if (this.state.event === null || this.state.event.length === 0 || !this.state.event) {
            return (
                <div>
                    <h4>
                        No events found.
                        <br/> 
                        <Link to='/signup'>Click here</Link> to create an account and add an event
                    </h4>
                </div>
            )
        }

        return this.state.events.map(eventObj => {
            return (
                <div data-event-id={eventObj.id} key={eventObj.id}>
                    <EventPreview event={eventObj}/>
                </div>
            )
        })
    }


    render () {
        return (
            <div className="EventsContainer">
                <Grid.Column>
                    <div className="EventPreviews">
                        {this.renderEventPreviews()}
                    </div>
                </Grid.Column>
                <Grid.Column>
                    {/* {this.renderShowEvent()} */}
                </Grid.Column>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth
    }
}

export default connect(mapStateToProps)(EventsContainer)