import React from 'react';
import './App.css';

import QuizMePage from './components/QuizMePage'
function App() {
  return (
    <div className="App">
      <header>
        <h1>QuizMe</h1>
        <nav>
          <ul>
            <li>Take Quiz</li>
            <li>Manage Questions</li>
          </ul>
        </nav>
      </header>
      <main>
        <QuizMePage />
      </main>
    </div>
  );
}

export default App;
