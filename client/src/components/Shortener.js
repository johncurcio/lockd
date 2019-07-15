import React from 'react';
import { 
  Grid,
  Input,
  Segment,
  Transition,
  Message,
  Popup
} from 'semantic-ui-react';
import Shorturl from './Shorturl';
import axios from 'axios';

class Shortener extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = { 
      originalUrl: "",
      shortUrl: "",
      alias: "",
      lock: "",
      error: "",
      visible: false
    };

    this.toggle = this.toggle.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
  }

  handleClick = () => {
    let request = this.state; // is this lazyness?

    axios.post('/api/shorten', request)
         .then( res => {
            console.log(res);
            this.setState({ shortUrl: res.data.url, error: res.data.error });
          })
         .catch( error => {
            console.log("Could not short url!");
         });
  };

  handleInputChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleDismiss = () => {
    this.setState({ shortUrl: "" });
  }

  toggle(){
    this.setState({ visible: !this.state.visible });    
  }

  render(){
    let lockd = 'https://lockd.dev/';

    return (
      <Grid textAlign='center' verticalAlign='middle' style={{ paddingTop: '25vh' }}>
        <Grid.Row>
          <Grid.Column style={{ maxWidth: 750 }}>
            <Input
                defaultValue={this.state.originalUrl}
                onChange={this.handleInputChange} 
                fluid
                size='huge'
                name="originalUrl"
                action={{ color: 'pink', content: 'make it short', onClick: () => this.handleClick() }} 
                placeholder='Paste URL to shorten' />


            <Transition visible={true} animation='slide down' duration={200}>
              <Segment vertical>
                <Segment.Inline>
                  <Grid textAlign='left' columns={2} divided>
                    <Grid.Row> 
                      <Grid.Column>
                        <Popup position='bottom left' content='Add a custom alias' trigger={
                          <Input defaultValue={this.state.alias} 
                                fluid 
                                name="alias"
                                label={lockd} 
                                size='mini' 
                                onChange={this.handleInputChange}
                                placeholder='alias (optional)' />
                        } />
                      </Grid.Column>
                      <Grid.Column>
                        <Popup position='bottom left' content='Add a lock number to protect your url' trigger={
                          <Input defaultValue={this.state.lock} 
                                fluid 
                                name="lock"
                                type='password' 
                                size='mini' 
                                icon='lock' 
                                onChange={this.handleInputChange}
                                placeholder='Set up a lock number (optional)' />
                        } />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment.Inline>
              </Segment>
            </Transition>

          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column style={{ maxWidth: 750, textAlign: 'left' }}>
            <Shorturl 
              visible={this.state.shortUrl !== ""} 
              handleDismiss={this.handleDismiss} 
              shortUrl={this.state.shortUrl} />
          </Grid.Column>
        </Grid.Row>
      
      </Grid>
    );
  }

}

export default Shortener;