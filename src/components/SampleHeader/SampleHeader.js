import React, { Component } from 'react'

import styles from './SampleHeader.css'
import logo from './logo.svg';

export class SampleHeader extends Component {
  render() {
    return (
      <header className={styles.AppHeader}>
        <img src={logo} className={styles.AppLogo} alt="logo" />
        <h1 className={styles.AppTitle}>Welcome to React &amp; GraphQL</h1>
      </header>
    )
  }
}

export default SampleHeader
