import React, {Component} from 'react';
import './App.css';

import QuizMePage from './components/QuizMePage'
import ManageQuestions from './components/ManageQuestions'

class App extends Component {
  state = {
    componentShowing: "Quiz"
  }

  handleNavClick = (value) => {
    this.setState({ componentShowing: value})
  } 

  render(){
    return (
      <div className="App">
        <header>
          <h1>QuizMe</h1>
          <nav>
            <ul>
              <li onClick={event => this.handleNavClick("Quiz")}>Take Quiz</li>
              <li onClick={event => this.handleNavClick("Manage Questions")}>Manage Questions</li>
            </ul>
          </nav>
        </header>
        <main>
          {
            (this.state.componentShowing == "Quiz")
              ?<QuizMePage />
              :<ManageQuestions />
          }
        </main>
      </div>
    )
  }
}

export default App;
