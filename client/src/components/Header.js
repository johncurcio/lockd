import React from 'react';
import { 
  Header as SemanticHeader, 
  Icon
} from 'semantic-ui-react';

class Header extends React.Component {

  render(){
    return (
      <SemanticHeader as='h1' color = {this.props.color}>
        <Icon name={this.props.icon} color = {this.props.color}/>
          <SemanticHeader.Content>
            <span className="biko">{ this.props.content }</span>
            <SemanticHeader.Subheader>{ this.props.subheader }</SemanticHeader.Subheader>
          </SemanticHeader.Content>
      </SemanticHeader>
    );
  }

}

export default Header;