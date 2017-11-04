import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './components/App';
import Step1 from './components/Step1'
import Step2 from './components/Step2'
import Step3 from './components/Step3'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

let client = new ApolloClient();

ReactDOM.render((
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Route exact path="/" component={App}/>
        <Route path="/step1" component={Step1}/>
        <Route path="/step2" component={Step2}/>
        <Route path="/step3" component={Step3}/>
      </div>
    </Router>
  </ApolloProvider>
), document.getElementById('root'));

registerServiceWorker();
