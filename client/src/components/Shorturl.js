import React from 'react';
import { 
  Message,
  Transition
} from 'semantic-ui-react';
import Share from './Share';

class Shorturl extends React.Component {

	render(){
		return (
		  <Transition visible={this.props.visible} animation='slide down' duration={100}>
        <Message onDismiss={this.props.handleDismiss} size='small'>
          <span className='spaced'>
            Your secure short url is ready: <a href={'https://' + this.props.shortUrl}>{this.props.shortUrl}</a>
          </span>
          <span>       
            <Share url={'https://' + this.props.shortUrl} size={20} />
          </span>
        </Message>
      </Transition>
		);
	}

}

export default Shorturl;