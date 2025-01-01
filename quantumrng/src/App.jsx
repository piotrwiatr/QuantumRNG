import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './routes/Home';
import { GeneratorContextProvider } from './context/GeneratorContext';


const App = () => {
  return (
    <GeneratorContextProvider>
      <div className="container">
        <Router>
          <Routes>
            <Route exact path ="/" element={<Home/>}/>
          </Routes>
        </Router>
      </div>
    </GeneratorContextProvider>
  );
};

export default App;
