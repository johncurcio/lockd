import React from 'react';
import { 
  Input,
  Grid
} from 'semantic-ui-react';
import axios from 'axios';

class Auth extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      lock: "",
      url: ""
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submit = this.submit.bind(this);
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
          })
         .catch( error => {
            console.log("Unauthorized!");
         });
  }

  render(){
    return (
      <Grid textAlign='center' verticalAlign='middle' style={{ paddingTop: '20vh' }}>
        <Grid.Row>
          <Grid.Column style={{ maxWidth: 750 }}>
            
          <Input defaultValue={this.state.lock} 
                name="lock"
                type='password' 
                size='mini' 
                onChange={this.handleInputChange}
                placeholder='Enter access code' 
                action={{ color: 'pink', content: 'unlock', onClick: () => this.submit() }}
                />

          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

}

export default Auth;
