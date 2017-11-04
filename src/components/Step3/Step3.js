import React from 'react'
import styles from './page.css'

import MDEntry from '../MDEntry'
import banner from './step3-banner.jpeg'

export class Step3 extends React.Component {
  render() {
    return (
      <section>
        <header
          className={styles.header}
          style={{ backgroundImage: `url(${banner})` }}
        />

        <section className={styles.body}>
          <MDEntry content={this.constructor.name}/>
        </section>
      </section>
    )
  }
}

export default Step3
