import React from 'react'
import {Grid} from 'semantic-ui-react'

class EventCard extends React.Component {
    
    render () {
        return (
            <Grid data-event-id={this.props.event.id}>
                <h4>
                    {this.props.event.title}
                </h4>
            </Grid>
        )
    }
}

export default EventCard