import React from 'react'
import {Grid, Header} from "semantic-ui-react"
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class Dashboard extends React.Component {

	render(){
        if(!this.props.user) {
            this.props.history.push('/login')
            return null
		}
		
		return (
			<Grid style={{marginTop: "2rem"}}>
				<Grid.Row style={{marginTop: "1rem"}}>
					<Header as='h2'>Your Dashboard ––– Welcome, {this.props.user.name}</Header>
				</Grid.Row>
				<Grid.Row style={{marginTop: "1rem"}}>
					<Header as='h3'>Upcoming Events</Header>
				</Grid.Row>
				<Grid.Row style={{marginTop: "1rem"}}>
					<Header as='h3'>Friends' Upcoming Events</Header>
				</Grid.Row>
			</Grid>
		)
	}
}

const mapStateToProps = state => {
    return {
        user: state.auth
    }
}

export default connect(mapStateToProps)(withRouter(Dashboard))