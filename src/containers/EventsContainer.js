import React from 'react'
import EventPreview from '../components/events/EventPreview'
import {connect} from 'react-redux'

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
                        <a href='/signup'>Click here</a> to create an account and add an event
                    </h4>
                </div>
            )
        }

        return this.state.events.map(eventObj => {
            return (
                <div data-event-id={eventObj.id} key={eventObj.id}>
                    <EventPreview 
                        note={eventObj}
                    />
                </div>
            )
        })
    }


    render () {
        return (
            <div className="EventsContainer">
                <Grid>
                    <Grid.Column>
                        <div className="EventPreviews">
                            {this.renderEventPreviews()}
                        </div>
                    </Grid.Column>
                    <Grid.Column>
                        {/* {this.renderShowEvent()} */}
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

// const mapStateToProps = state => {
//     return {
//         user: state.auth
//     }
// }

export default EventsContainer