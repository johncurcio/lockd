import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { 
  Container
} from 'semantic-ui-react';
import Shortener from './components/Shortener';
import Footer from './components/Footer';
import Header from './components/Header';
import Auth from './components/Auth';
import './App.css';

function App() {

  return (
    <div className="App">
      <Container>
        <Header content='LOCKD' subheader='Slightly Secure Shortener' icon='lock' color = 'pink'/>
        <BrowserRouter>
          <Switch>
            <Route path="/:code/auth" component={Auth} />
            <Route path="/" component={Shortener} />
          </Switch>
        </BrowserRouter>
      </Container>
      <Footer />
    </div>
  );
  
}

export default App;
