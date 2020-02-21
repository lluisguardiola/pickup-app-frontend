import React from 'react'
import {Grid, Form} from 'semantic-ui-react'
// import {connect} from 'react-redux'

class SignUp extends React.Component {
	constructor(){
		super()
		this.state = {
			username: 'llui',
			password: 'hello',
			confirmpassword: 'hello'
		}
	}

	handleOnChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	// handleOnSubmit = (e) => {
	//     e.preventDefault()

	//     const reqObj = {
	//         method: 'POST',
	//         headers: {
	//             'Content-Type': 'application/json',
	//             'Accept': 'application/json'
	//         },
	//         body: JSON.stringify(this.state)
	//     }

	//     fetch('http://localhost:4000/auth', reqObj)
	//     .then(resp => resp.json())
	//     .then(user => {
	//         // store user data in redux store
	//         // redirect to dashboard
	//         if (!user.error) {
	//             this.props.loginUser(user)
	//             this.props.history.push('/')
	//         } else {
	//             alert(user.error)
	//             this.props.history.push('/login')
	//         }
	//     })

	//     this.setState({
	//         username: '',
	//         password: ''
	//     })
	// }

	// handleSignUpClick = () => {
		
	// }
	
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
							<Form >
								<Form.Input 
									// label='username' 
									name='username' 
									type='text' 
									placeholder='username'
									icon='user' 
									value={this.state.username} 
									onChange={this.handleOnChange}/>
								<Form.Input 
									// label='password'
									name='password'  
									type='password' 
									placeholder='password' 
									icon='key'
									value={this.state.password} 
									onChange={this.handleOnChange}/>
								<Form.Input 
									// label='confirm password'
									name='confirmpassword'  
									type='password' 
									placeholder='confirm password' 
									icon='key'
									value={this.state.confirmpassword} 
									onChange={this.handleOnChange}/>
								<Form.Button color='blue' type='submit' fluid size="large">Log In</Form.Button>                              
							</Form>
						</Grid.Column>
						<Grid.Column computer={4} mobile={1} tablet={2} />
					</Grid.Row>
				</Grid>
			</div>
		)
	}
}

// const mapDispatchToProps = dispatch => {
//     return {
//         loginUser: user => dispatch(loginUser(user))
//     }
// }

// export default connect(null, mapDispatchToProps)(Login)
export default SignUp