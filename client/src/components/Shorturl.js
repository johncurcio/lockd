import React from 'react';
import { 
  Message,
  Transition,
  Icon
} from 'semantic-ui-react';
import Share from './Share';

class Shorturl extends React.Component {

  removeHttp(url){
    return url.replace(/^https?:\/\//i, "");
  }

  render(){
    return (
      <Transition visible={this.props.visible} animation='slide down' duration={100}>
        <Message color='olive' onDismiss={this.props.handleDismiss} size='small'>
          <span className='spaced'>
            <Icon name='lock'/> 
            Your secure short url is ready: <a href={this.props.shortUrl}>{this.removeHttp(this.props.shortUrl)}</a>
          </span>
          <span>       
            <Share url={this.props.shortUrl} size={20} />
          </span>
        </Message>
      </Transition>
    );
  }

}

export default Shorturl;