import React from 'react'
import {Grid, Header, Button, Segment} from "semantic-ui-react"
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import HomeEvents from './events/HomeEvents'
import Logo from '../images/pickapplogo.png'
// import SearchBar from './SearchBar'

class Home extends React.Component {

	render(){
		return (
			<Grid>
				<Grid.Row centered>
					<Grid.Column textAlign="center">
						<img src={Logo} />
						<Grid.Row>
							<div className="segment-div" style={{width: '600px'}}>
								<Segment>Join a local pickup game, try something new, do more of what you love.</Segment>
							</div>
						</Grid.Row>
						<br/>
						{this.props.auth ? 
							null 
							: 
							<Link to='/signup'>
								<Button color='yellow'>Join</Button>
							</Link>
						}
					</Grid.Column>
				</Grid.Row>
				<Grid.Row centered>
					{/* <SearchBar /> */}
				</Grid.Row>
				<Grid.Row centered>
					<h2>Latest PickUp Games</h2>
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