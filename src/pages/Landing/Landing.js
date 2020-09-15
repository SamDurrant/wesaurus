import React from 'react'
import './Landing.css'
import LearningLeaf from '../../assets/learning_leaf.svg'
import Dashes from '../../assets/dashes.svg'
import Solid from '../../assets/solid.svg'
import Waves from '../../assets/waves.svg'
import Button from '../../components/Button/Button'

function Landing() {
  return (
    <section className="section section-column">
      <header className="hero">
        <img
          className="hero-image"
          src={LearningLeaf}
          alt="woman seeing growth in learning"
        />
        <div className="hero-text">
          <h1>Wesaurus</h1>
          <p>Help others find meaning.</p>
          <p>A dictionary app where you define the words.</p>
        </div>
      </header>

      <section className="cta">
        <Button solid text="sign up" />
        <Button small text="have an account?" />
      </section>

      <section className="introduction">
        <div className="introduction-text">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta
            dolorum quasi, ipsum dolore quisquam excepturi eaque dicta
            blanditiis officia ab fugit libero minus magni beatae vel. Totam cum
            soluta dicta quod quaerat exercitationem qui possimus delectus vel.
            Earum rerum explicabo voluptatem dicta tempora!
          </p>
        </div>
        <div className="introduction-abstract">
          <div className="solid">
            <img src={Solid} alt="abstract solid grass clump" />
          </div>
          <div className="dashes">
            <img src={Dashes} alt="abstract dashes" />
          </div>
          <div className="waves">
            <img src={Waves} alt="abstract waves" />
          </div>
        </div>
      </section>
    </section>
  )
}

export default Landing
