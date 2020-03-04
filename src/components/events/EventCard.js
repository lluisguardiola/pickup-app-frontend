import React from 'react'
import {Card, Image, Divider} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'

class EventCard extends React.Component {

	handleClick = () => {
		this.props.history.push(`/events/${this.props.event.id}`)
	}

    render () {
        return (
			<Card onClick={this.handleClick}>
				<Image 
					src={this.props.event.game.img_src} 
					style={{
						width: "100vw",
						height: "225px"
					}}/>
				<Card.Content>
					<Card.Header>{this.props.event.title} <br/> <Divider />{this.props.event.game.name}</Card.Header>
					<Card.Description>{this.props.event.description}</Card.Description>
				</Card.Content>
			</Card>
        )
    }
}

export default withRouter(EventCard)