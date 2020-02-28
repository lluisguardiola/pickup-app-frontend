import React from 'react'
import {Grid, Form} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class EditEventForm extends React.Component {
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
			window.alert('Please log in to edit an event.')
			this.props.history.push('/login')
            return null
		}

		const {event} = this.props.location.state

		fetch(`http://localhost:4000/games`)
		.then(resp => resp.json())
		.then(games => {
			this.setState({
				formData: {
					title: event.title,
					description: event.description,
					address: event.address,
					game_id: event.game.id,
					time: event.time,
					date: event.date
				},
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

	    const reqObj = {
	        method: 'PATCH',
	        headers: {
	            'Content-Type': 'application/json',
	            'Accept': 'application/json'
	        },
	        body: JSON.stringify(this.state.formData)
		}

	    fetch(`http://localhost:4000/events/${this.props.match.params.id}`, reqObj)
			.then(resp => resp.json())
			.then(event => {
				if (!event.error) {
					this.props.history.push(`/events/${event.id}`)
				} else {
					alert(event.error)
					this.resetForm()
				}
			})

	    this.resetForm()
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
						<Grid.Column textAlign="left" computer={12} mobile={14}> 
							<Form onSubmit={this.handleOnSubmit}>
								<Form.Input 
									label='title'
									name='title' 
									type='text' 
									placeholder='title'
									required
									value={this.state.formData.title || ''} 
									onChange={this.handleOnChange}/>
								<Form.TextArea 
									label='description'
									name='description'  
									type='text' 
									placeholder='description' 
									required
									value={this.state.formData.description || ''} 
									onChange={this.handleOnChange}/>
								<Form.Input 
									label='address'
									name='address'  
									type='text' 
									placeholder='address' 
									required
									value={this.state.formData.address || ''} 
									onChange={this.handleOnChange}/>
								<Form.Input 
									label='game'
									name='game_id'  
									type='text' 
									placeholder='game'
									list="games"
									required
									value={this.state.formData.game_id || ''} 
									onChange={this.handleOnChange}/>
									<datalist id="games">
										{this.renderGameOptions()}
									</datalist>
								<Form.Input 
									label='time'
									name='time'  
									type='text' 
									placeholder='time, format HH:MM' 
									required
									value={this.state.formData.time || ''} 
									onChange={this.handleOnChange}/>
								<Form.Input 
									label='date'
									name='date'  
									type='text' 
									placeholder='date, format: MM/DD/YYYY'
									required
									value={this.state.formData.date || ''} 
									onChange={this.handleOnChange}/>
								<Form.Button color='blue' type='submit' fluid size="large">Submit Changes</Form.Button>                              
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

export default connect(mapStateToProps, null)(withRouter(EditEventForm))
