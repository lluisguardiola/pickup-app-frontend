import React from 'react'
import {Grid, Form, Segment} from 'semantic-ui-react'

class SearchBar extends React.Component {
	state = {
		location: ''
	}

	handleOnChange = event => {
		this.setState({
			location: event.target.value
		})
	}

	handleOnSubmit = () => {

	}

    render(){
        return (
            <div className="search-bar">
                <Grid>
                    <Grid.Row centered>
						<Segment>
                        Search for PickUp Games in
						<Form onSubmit={this.handleOnSubmit}>
							<Form.Input 
								name='location' 
								type='text' 
								placeholder='location'
								icon='search' 
								iconPosition='left'
								value={this.state.location} 
								onChange={this.handleOnChange}/>
						</Form>	
						</Segment>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default SearchBar