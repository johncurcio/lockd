import React from 'react';
import {  
  Icon
} from 'semantic-ui-react';

class Footer extends React.Component {

  render(){
    return (
      <div className="ui inverted vertical footer segment form-page">
        <div className="ui container">
          Built with <Icon color='pink' name='heart' /> by <a href="https://curcio.dev">curcio.dev</a>
        </div>
      </div>
    );
  }

}

export default Footer;