import React from 'react';
import RandomNumberForm from '../components/RandomNumberForm';
import quantumImage from '../static/quantum.jpg';

const Home = () => {
  return (
    <div class="container">
      <header>
        <div class="nav-group">
          <a href="https://piotrwiatr.com" className="logo">PW</a>
        </div>
        <div class="nav-group">
          <a href="https://piotrwiatr.com">piotrwiatr.com</a>
        </div>
      </header>
      <section className="body">
        <div className="generator">
          <h2>Random Number Generator Using Quantum Computing</h2>
          <RandomNumberForm />
        </div>
        <div className="image">
          <img src={quantumImage} alt="quantum mechanical equations" />
        </div>
      </section>
    </div>
  );
};

export default Home;