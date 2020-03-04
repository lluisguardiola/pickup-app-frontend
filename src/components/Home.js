import React from 'react'
import {Grid, Header, Button, Message} from "semantic-ui-react"
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import HomeEvents from './events/HomeEvents'
// import SearchBar from './SearchBar'

class Home extends React.Component {

	render(){
		return (
			<Grid>
				<Grid.Row centered>
					<Grid.Column textAlign="center">
						<Header as='h1'>PickUp App Home</Header>
						<Grid.Row>
							<Message>some info or slogan or whatever goes here in the meantime heres some text</Message>
						</Grid.Row>
						<br/>
						{this.props.auth ? 
							null 
							: 
							<Link to='/signup'>
								<Button color='blue'>Join</Button>
							</Link>
						}
					</Grid.Column>
				</Grid.Row>
				<Grid.Row centered>
					{/* <SearchBar /> */}
				</Grid.Row>
				<Grid.Row>
					<HomeEvents/>
				</Grid.Row>
			</Grid>
		)
	}
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(withRouter(Home))