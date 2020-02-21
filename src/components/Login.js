import React from 'react'
import {Grid, Form, Input} from 'semantic-ui-react'
// import {connect} from 'react-redux'
// import { Link } from 'react-router-dom';


class Login extends React.Component {
	constructor(){
		super()
		this.state = {
			username: 'llui',
			password: 'hello'
		}
	}

	handleOnChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleOnSubmit = event => {
		event.preventDefault()

		const reqObj = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify(this.state)
		}

		fetch('http://localhost:4000/auth', reqObj)
		.then(resp => resp.json())
		.then(user => {
			// store user data in redux store
			// redirect to dashboard
			if (!user.error) {
				this.props.loginUser(user)
				this.props.history.push('/')
			} else {
				alert(user.error)
				this.props.history.push('/login')
			}
		})

		this.setState({
			username: '',
			password: ''
		})
	}

	// handleSignUpClick = () => {
		// this.props.history.push('/signup')
	// }
	
	render () {

		return (
			<div className='login'>
				<Grid style={{marginTop: "1rem"}} centered columns={3} >
					<Grid.Row centered columns={3} >
						<Grid.Column computer={4} mobile={1} tablet={2} />
						<Grid.Column textAlign="center" computer={8} mobile={14} tablet={12}> 
							<Form size="large" onSubmit={this.handleOnSubmit}>
								<Form.Field 
									// label='username' 
									control={Input}
									required
									name='username' 
									type='text' 
									placeholder='username'
									icon='user' 
									value={this.state.username} 
									onChange={this.handleOnChange}/>
								<Form.Field 
									// label='password'
									control={Input}
									required
									name='password'  
									type='password' 
									placeholder='password' 
									icon='key'
									value={this.state.password} 
									onChange={this.handleOnChange}/>
								<Form.Button color='blue' type='submit' fluid size="large">Log In</Form.Button>                              
							</Form>
						</Grid.Column>
						<Grid.Column computer={4} mobile={1} tablet={2} />
					</Grid.Row>
					<Grid.Row centered columns={3} >
						<Grid.Column computer={4} mobile={1} tablet={2}/>
						<Grid.Column textAlign="center" computer={8} mobile={14} tablet={12}>
							Don't have an account? &nbsp;
							{/* <Link to="/signup"> */}
							<a href="/signup">Sign Up</a>
							{/* </Link> */}
						</Grid.Column>
						<Grid.Column computer={4} mobile={1} tablet={2}/>
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
export default Login