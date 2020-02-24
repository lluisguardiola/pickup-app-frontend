import React from 'react'
import {Grid, Button, Header} from "semantic-ui-react"
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import {logoutUser} from '../actions/auth'


class Navbar extends React.Component {

	handleLoginOnClick = () => {
		if (this.props.auth) {
			return
		}
		this.props.history.push('/login')
	}

	handleLogout = () => {
		this.props.logoutUser()
		this.props.history.push('/login')
	}

	handleDashboardOnClick = () => {
		if (!this.props.auth) {
			return
		}
		this.props.history.push('/dashboard')
	}

	render() {
		return (
			<Grid style={{marginTop: "1rem"}} columns={2}>
				<Grid.Row columns={2}>
					<Grid.Column onClick={this.handleOnClick}>
						<Link to='/'>
							<Header as='h1' floated='left'>PickUp App</Header>
						</Link>
					</Grid.Column>
					<Grid.Column >
						<Link to='/login'>
							<Button color='blue' floated='right' onClick={this.handleLogout}>{this.props.auth ? 'Logout' : 'Log In'}</Button>
						</Link>
						{
							this.props.auth 
							? 
							<Button color='blue' floated='right' onClick={this.handleDashboardOnClick}>Dashboard</Button>
							:
							null
						}
					</Grid.Column>
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

const mapDispatchToProps = dispatch => {
	return {
		logoutUser: () => {dispatch(logoutUser())}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar))