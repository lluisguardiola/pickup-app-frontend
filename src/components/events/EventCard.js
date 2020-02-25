import React from 'react'
import {Card, Image} from 'semantic-ui-react'

class EventCard extends React.Component {

    render () {
		
        return (
				<Card>
					<Image src='https://react.semantic-ui.com/images/movies/totoro-horizontal.jpg' />
					<Card.Content>
						<Card.Header>{this.props.event.title}</Card.Header>
						<Card.Description>{this.props.event.description}</Card.Description>
					</Card.Content>
      			</Card>
        )
    }
}

export default EventCard