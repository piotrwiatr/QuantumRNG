# Quantum Random Number Generator Using React.js and Flask
---
## Purpose of this project
I created this simple random number generator to learn more about React.js and using flask as a simple backend. To make the project more interesting, I decided to integrate some qiskit code to utilize properties of quantum randomness
---
## Important Notes
There are some things that need to be fixed if one desires to generate truly random random numbers. Firstly, the method that I used to determine whether the generated number is within the range provided by the user actually decreases the overall randomness since any values close to the bounds will be ever so slightly less likely compared to those in the middle. 
Furthermore, applying a series of hadamard gates to a series of qubits does indeed put them into a uniform superposition of all possible states, due to problems with decoherence and non-markovian noise, the measured bits aren't as random as is theoretically possible with a quantum computer. Not that this should be a problem for such a simple app like this, but it is something to consider for applications that require genuine random number generation
---
## How to run locally
Firstly, ensure that you have both react (via npm) and python installed on your system. The principal python libraries that you require are:
- flask
- flask-cors
- qiskit
- qiskit-ibm-runtime
- qiskit-aer
- python-dotenv

Run the frontend using "npm start" in the parent directory and then use "npm start-api" to run the backend
