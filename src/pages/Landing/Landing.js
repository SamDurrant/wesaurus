import React from 'react'
import './Landing.css'
import LearningLeaf from '../../assets/learning_leaf.png'
import { Section, Button } from '../../utilities/utility-components'

function Landing() {
  return (
    <Section stretch column>
      <div>
        <img
          className="landing-banner"
          src={LearningLeaf}
          alt="woman seeing growth in learning"
        />
        <div className="heading-box">
          <h1>Wesaurus</h1>
          <p>Help others find meaning.</p>
          <p>A dictionary app where you define the words.</p>
        </div>
      </div>

      <div className="cta-box">
        <Button solid text="sign up" />
        <Button small text="have an account?" />
      </div>
    </Section>
  )
}

export default Landing
