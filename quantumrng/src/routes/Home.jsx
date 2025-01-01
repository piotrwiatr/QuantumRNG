import React from 'react';
import RandomNumberForm from '../components/RandomNumberForm';
import quantumImage from '../static/quantum.jpg';

const Home = () => {
  return (
    <div class="container">
      <header>
        <h1 className="logo"><a href="https://piotrwiatr.com">PW</a></h1>
        <p><a href="https://piotrwiatr.com">piotrwiatr.com</a></p>
      </header>
      <section className="body">
        <div className="generator">
          <h2>Random Number Generator Using Quantum Computing</h2>
          <RandomNumberForm />
        </div>
        <div className="image">
          <img src={quantumImage} height={200} alt="quantum mechanical equations" />
        </div>
      </section>
    </div>
  );
};

export default Home;