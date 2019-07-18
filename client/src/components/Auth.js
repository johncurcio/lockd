import React from 'react';
import { 
  Input,
  Grid,
  Message,
  Transition
} from 'semantic-ui-react';
import axios from 'axios';

class Auth extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      lock: "",
      url: "",
      error: ""
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submit = this.submit.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
  }

  handleDismiss = () => {
    this.setState({ error: "" });
  }

  handleInputChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  submit(){
    let request = { 
      lock: this.state.lock, // should be hashed!
      urlCode: this.props.match.params.code 
    };
    
    axios.post('/api/auth', request)
         .then( res => {
            window.location.assign(res.data.url); 
            this.setState({ error: res.data.error });
          })
         .catch( error => {
            this.setState({ error: "Incorrect code!" });
            console.log("Unauthorized!");
         });
  }

  render(){
    return (
      <Grid textAlign='center' verticalAlign='middle' style={{ paddingTop: '20vh' }}>
        <Grid.Row>
          <Grid.Column style={{ maxWidth: 250 }}>  
            <Input defaultValue={this.state.lock} 
                  name="lock"
                  type='password' 
                  size='mini' 
                  onChange={this.handleInputChange}
                  placeholder='Enter access code' 
                  action={{ color: 'pink', content: 'unlock', onClick: () => this.submit() }}
                  />
            <Transition visible={this.state.error !== ""} animation='slide down' duration={100}> 
              <Message error 
                    onDismiss={this.handleDismiss} 
                    content={this.state.error} 
                    size='small' />
            </Transition>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

}

export default Auth;
