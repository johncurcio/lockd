import React from 'react';
import { 
  Grid
} from 'semantic-ui-react';
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  RedditShareButton,
  RedditIcon,
  EmailShareButton,
  EmailIcon
} from 'react-share';
import './Share.css';

class Share extends React.Component {

  render(){
    return (
      <span>
        <span className="network">
          <TwitterShareButton url={this.props.url} className="shareButton">
            <TwitterIcon size={this.props.size || 16} />
          </TwitterShareButton>
        </span>

        <span className="network">
          <FacebookShareButton url={this.props.url} className="shareButton">
            <FacebookIcon size={this.props.size || 16} />
          </FacebookShareButton>
        </span>

        <span className="network">
          <EmailShareButton url={this.props.url} className="shareButton">
            <EmailIcon size={this.props.size || 16} />
          </EmailShareButton>
        </span>

        <span className="network">
          <RedditShareButton url={this.props.url} className="shareButton">
            <RedditIcon size={this.props.size || 16} />
          </RedditShareButton>
        </span>
        
        <span className="network">
          <LinkedinShareButton url={this.props.url} className="shareButton">
            <LinkedinIcon size={this.props.size || 16} />
          </LinkedinShareButton>
        </span>
      </span>
    );
  }

}

export default Share;