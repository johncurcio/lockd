import React from 'react';
import { 
  Grid,
  Input,
  Message
} from 'semantic-ui-react';
import axios from 'axios';

class Shortener extends React.Component {
  
  state = { 
  	originalUrl: "",
  	shortUrl: ""
  };

	handleClick = () => {
    let originalUrl = this.state.originalUrl;

    axios.post('/api/shorten', { originalUrl })
    		 .then( res => {
    		 		console.log(res);
    		 		this.setState({ shortUrl: res.data });
    		 	})
    		 .catch( error => {
    		 		console.log("Could not short url!");
    		 });
  };

	handleInputChange = e => {
    this.setState({ originalUrl: e.target.value });
  };

  handleDismiss = () => {
    this.setState({ shortUrl: "" });
  }

  MessageF(){
  	if (this.state.shortUrl !== "") {
      return (
      	<Message onDismiss={this.handleDismiss} size='small'>
      		Your secure short url is ready: <a href = {'https://'+this.state.shortUrl}>{this.state.shortUrl}</a>
      	</Message>
      )
    }
  }

	render(){
		return (
		  <Grid textAlign='center' verticalAlign='middle'>
		  	<Grid.Row style={{ paddingTop: '25vh' }}>
			  	<Grid.Column style={{ maxWidth: 750 }}>
			      <Input
			      			defaultValue={this.state.originalUrl}
	         				onChange={this.handleInputChange} 
			      			fluid
			            size='huge'
			            action={{ color: 'pink', content: 'make it short', onClick: () => this.handleClick() }} 
			            placeholder='Paste URL to shorten' />
			    </Grid.Column>
		    </Grid.Row>
		    <Grid.Row>
		    	<Grid.Column style={{ maxWidth: 750 }}>
		    		{ this.MessageF() }
		    	</Grid.Column>
		    </Grid.Row>
		  </Grid>
		);
	}

}

export default Shortener;