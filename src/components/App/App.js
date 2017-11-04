import React, { Component } from 'react';

import styles from './App.css';

import MDEntry from '../MDEntry'
import Header from '../SampleHeader'

/**
 * Sample Application that uses the ApolloProvider to inject GraphQL results
 * into sub components that make queries. The sample MDEntry component, looks
 * up content via a GraphQL query.
 *
 * The content is backed by a `.md` or Markdown file on the server.
 *
 * @class App
 * @extends {Component}
 */
class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <Header/>

        <MDEntry content="intro"/>
      </div>
    );
  }

}

export default App;
