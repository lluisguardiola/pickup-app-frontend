import React from 'react'
import {Card, Image} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'

class EventCard extends React.Component {

	handleClick = () => {
		this.props.history.push(`/events/${this.props.event.id}`)
	}

    render () {
        return (
			<Card onClick={this.handleClick}>
				<Image src='https://www.kpmindustries.com/wp-content/uploads/2018/08/Placeholder-Map-Image.png' />
				<Card.Content>
					<Card.Header>{this.props.event.title} <br/> – <br/> {this.props.event.game.name}</Card.Header>
					<Card.Description>{this.props.event.description}</Card.Description>
				</Card.Content>
			</Card>
        )
    }
}

export default withRouter(EventCard)