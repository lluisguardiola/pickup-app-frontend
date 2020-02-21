import React from 'react'
import {Grid} from 'semantic-ui-react'

class EventPreview extends React.Component {
    
    render () {
        // const slicedContent = this.props.event.description.slice(0, 15) + "..."
        const slicedContent = this.props.event.description.slice(0, 15) + "..."

        return (
            <Grid data-event-id={this.props.event.id}>
                <h4>
                    {this.props.event.title}
                </h4>
                <p style={{color: "gray"}}>
                    {slicedContent}
                </p>
            </Grid>
        )
    }
}

export default EventPreview