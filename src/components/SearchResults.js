import React from 'react'
import {Grid} from 'semantic-ui-react'

class SearchResults extends React.Component {

    render(){
        return (
            <div className="search-results">
                <Grid>
                    <Grid.Row>
                        search filter goes here
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            Events previews
                        </Grid.Column>
                        <Grid.Column>
                            Event card
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default SearchResults