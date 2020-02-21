import React from 'react'
import {Grid, Button, Header} from "semantic-ui-react"
import { withRouter, Link } from 'react-router-dom';
// import { connect } from 'react-redux'



class Navbar extends React.Component {
	

	handleLoginOnClick = () => {
		// if (!this.props.auth) {
		// 	return
		// }

		this.props.history.push('/login')
	}

	handleDashboardOnClick = () => {
		// if (!this.props.auth) {
		// 	return
		// }
		
		this.props.history.push('/dashboard')
	}

	render() {
		return (
			<Grid style={{marginTop: "1rem"}} columns={2}>
				<Grid.Row columns={2}>
					<Grid.Column onClick={this.handleOnClick}>
						<a href='/'>
							<Header as='h1' floated='left'>PickUp App</Header>
						</a>
					</Grid.Column>
					<Grid.Column >
						<Link to="/login">
							<Button color='blue' floated='right' onClick={this.handleLoginOnClick}>{/* {this.props.auth ? 'Logout' : 'Log In'} */}Log In</Button>
						</Link>
						<Link to="/dashboard">
							<Button color='blue' floated='right' onClick={this.handleDashboardOnClick}>Dashboard</Button>
						</Link>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
}

export default withRouter(Navbar)