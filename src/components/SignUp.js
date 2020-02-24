import React from 'react'
import {Grid, Form} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {loginUser} from '../actions/auth'

class SignUp extends React.Component {
	constructor(){
		super()
		this.state = {
			username: '',
			password: '',
			confirmpassword: '',
			name: '',
			age: '',
			city: ''
		}
	}

	handleOnChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleOnSubmit = event => {
		event.preventDefault()
		
		if (this.state.password !== this.state.confirmpassword) {
			alert('Passwords do not match, please try again.')
			this.resetForm()
			return
		}

	    const reqObj = {
	        method: 'POST',
	        headers: {
	            'Content-Type': 'application/json',
	            'Accept': 'application/json'
	        },
	        body: JSON.stringify(this.state)
	    }

	    fetch('http://localhost:4000/users', reqObj)
			.then(resp => resp.json())
			.then(user => {
				if (!user.error) {
					this.props.loginUser(user)
					this.props.history.push('/dashboard')
				} else {
					alert(user.error)
					this.resetForm()
				}
			})

	    this.setState({
	        username: '',
	        password: ''
	    })
	}

	resetForm = () => {
		this.setState({
			username: '',
			password: '',
			confirmpassword: '',
			name: '',
			age: '',
			city: ''
		})
	}
	
	render () {
		const gridColumnStyles = {
			display: "flex",
			alignItems: "center",
			justifyContent: "center"
		}

		return (
			<div className='signup'>
				<Grid style={{marginTop: "1rem"}} columns={3} centered>
					<Grid.Row>
						<Grid.Column computer={4} mobile={1} tablet={2} />
						<Grid.Column textAlign="center" computer={8} mobile={14} tablet={12} style={gridColumnStyles}> 
							<Form onSubmit={this.handleOnSubmit}>
								<Form.Input 
									// label='username' 
									name='username' 
									type='text' 
									placeholder='Username'
									icon='user' 
									value={this.state.username} 
									onChange={this.handleOnChange}/>
								<Form.Input 
									// label='password'
									name='password'  
									type='password' 
									placeholder='Password' 
									icon='key'
									value={this.state.password} 
									onChange={this.handleOnChange}/>
								<Form.Input 
									// label='confirm password'
									name='confirmpassword'  
									type='password' 
									placeholder='Confirm Password' 
									icon='key'
									value={this.state.confirmpassword} 
									onChange={this.handleOnChange}/>
								<Form.Input 
									name='name'  
									type='text' 
									placeholder='Full Name' 
									// icon=''
									value={this.state.name} 
									onChange={this.handleOnChange}/>
								<Form.Input 
									name='age'  
									type='text' 
									placeholder='Age' 
									// icon=''
									value={this.state.age} 
									onChange={this.handleOnChange}/>
								<Form.Input 
									name='city'  
									type='text' 
									placeholder='City' 
									// icon=''
									value={this.state.city} 
									onChange={this.handleOnChange}/>
								<Form.Button color='blue' type='submit' fluid size="large">Create Account</Form.Button>                              
							</Form>
						</Grid.Column>
						<Grid.Column computer={4} mobile={1} tablet={2} />
					</Grid.Row>
				</Grid>
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => {
    return {
        loginUser: user => dispatch(loginUser(user))
    }
}

export default connect(null, mapDispatchToProps)(SignUp)