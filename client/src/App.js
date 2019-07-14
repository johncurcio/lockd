import React from 'react';
import { 
  Container
} from 'semantic-ui-react';
import Shortener from './components/Shortener';
import Footer from './components/Footer';
import Header from './components/Header';
import './App.css';

function App() {

  return (
    <div className="App">
      <Container>
        <Header content='LOCKD' subheader='Slightly Secure Shortener' icon='lock' color = 'pink'/>
        <Shortener />
      </Container>
      <Footer />
    </div>
  );
  
}

export default App;
