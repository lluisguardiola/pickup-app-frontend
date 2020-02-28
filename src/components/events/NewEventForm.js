import React from 'react'
import {Grid, Form} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {addUserEvent} from '../../actions/events'


class NewEventForm extends React.Component {
	constructor(){
		super()
		this.state = {
			formData: {
				title: '',
				description: '',
				address: '',
				game_id: '',
				time: '',
				date: ''
			},
			searchData: null	
		}
	}
	
	componentDidMount = () => {

		if(!this.props.user) {
			window.alert('Please log in to create an event.')
			this.props.history.push('/login')
            return null
		}

		fetch(`http://localhost:4000/games`)
		.then(resp => resp.json())
		.then(games => {
			this.setState({
				searchData: games
			})
		})
	}

	renderGameOptions = () => {
		if (this.state.searchData === null) {
			return <option>LOADING...</option>
		}

		return this.state.searchData.map(option => <option key={option.name} value={option.id}>{option.name}</option>)
	}

	handleOnChange = event => {
		this.setState({
			formData: {
				...this.state.formData,
				[event.target.name]: event.target.value
			}
		})
	}

	handleOnSubmit = event => {
		event.preventDefault()
		
		const bodyObj = {
			...this.state.formData,
			user_id: this.props.user.id
		}

	    const reqObj = {
	        method: 'POST',
	        headers: {
	            'Content-Type': 'application/json',
	            'Accept': 'application/json'
	        },
	        body: JSON.stringify(bodyObj)
		}

	    fetch('http://localhost:4000/events', reqObj)
			.then(resp => resp.json())
			.then(event => {
				if (!event.error) {
					this.props.addUserEvent(event)
					this.props.history.push(`/events/${event.id}`)
				} else {
					alert(event.error)
					// this.resetForm()
				}
			})

	    // this.resetForm()
	}

	resetForm = () => {
		this.setState({
			formData: {
			title: '',
			description: '',
			address: '',
			game: '',
			time: '',
			date: ''
		}})
	}
	
	render () {
		return (
			<div className='signup'>
				<Grid style={{marginTop: "1rem"}} columns={3} centered>
					<Grid.Row>
						<Grid.Column computer={2} mobile={1} />
						<Grid.Column textAlign="center" computer={12} mobile={14}> 
							<Form onSubmit={this.handleOnSubmit}>
								<Form.Input 
									name='title' 
									type='text' 
									placeholder='title'
									required
									value={this.state.title} 
									onChange={this.handleOnChange}/>
								<Form.TextArea 
									name='description'  
									type='text' 
									placeholder='description' 
									required
									value={this.state.description} 
									onChange={this.handleOnChange}/>
								<Form.Input 
									name='address'  
									type='text' 
									placeholder='address' 
									required
									value={this.state.address} 
									onChange={this.handleOnChange}/>
								<Form.Input 
									name='game_id'  
									type='text' 
									placeholder='game'
									list="games"
									required
									value={this.state.game_id} 
									onChange={this.handleOnChange}/>
									<datalist id="games">
										{this.renderGameOptions()}
									</datalist>
								<Form.Input 
									name='time'  
									type='text' 
									placeholder='time, format HH:MM' 
									required
									value={this.state.time} 
									onChange={this.handleOnChange}/>
								<Form.Input 
									name='date'  
									type='text' 
									placeholder='date, format: MM/DD/YYYY'
									required
									value={this.state.date} 
									onChange={this.handleOnChange}/>
								<Form.Button color='blue' type='submit' fluid size="large">Create Event</Form.Button>                              
							</Form>
						</Grid.Column>
						<Grid.Column computer={2} mobile={1} />
					</Grid.Row>
				</Grid>
			</div>
		)
	}
}

const mapStateToProps = state => {
    return {
		user: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addUserEvent: userEvent => dispatch(addUserEvent(userEvent))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewEventForm))