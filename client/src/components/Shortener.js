import React from 'react';
import { 
  Grid,
  Input
} from 'semantic-ui-react';
import Shorturl from './Shorturl';
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

  handleInputChange = evt => {
    this.setState({ originalUrl: evt.target.value });
  };

  handleDismiss = () => {
    this.setState({ shortUrl: "" });
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
            <a>advanced options...</a>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column style={{ maxWidth: 750, textAlign: 'left' }}>
            <Shorturl visible={this.state.shortUrl !== ""} handleDismiss={this.handleDismiss} shortUrl={this.state.shortUrl} />
          </Grid.Column>
        </Grid.Row>
      
      </Grid>
    );
  }

}

export default Shortener;