import React, {Component} from 'react';
import './App.css';

import QuizMePage from './components/QuizMePage'
import ManageQuestions from './components/ManageQuestions'

const backendUrl = 'http://localhost:3000/'
class App extends Component {
  state = {
    categories: [],
    questions: [],
    componentShowing: "Quiz"
  }

  componentDidMount(){
    fetch(`${backendUrl}/categories`)
        .then(response => response.json())
        .then(categories => {
            return categories.forEach(category => {
                const categoryData = {
                    id: category.id,
                    name: category.name
                }
                this.setState({categories: [...this.state.categories, categoryData]})
            })
        })
        .then(
            fetch(`${backendUrl}/questions`)
                .then(response => response.json())
                .then(questions => this.setState({ questions }))
        )
  }

  handleNavClick = (value) => {
    this.setState({ componentShowing: value})
  } 

  addCategory = (categoryObject) => {
    fetch(`${backendUrl}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(categoryObject)
    }).then(response => response.json())
      .then(newCategory => {
        const categoryData = {
          id: newCategory.id,
          name: newCategory.name
        }
        this.setState({categories: [...this.state.categories, categoryData]})
      })
  }

  removeCategory = (categoryId) => {
    fetch(`${backendUrl}/categories/${categoryId}`, { method: "DELETE" })
      .then(() => {
        const newCategoryArray = this.state.categories.filter(category => category.id !== categoryId)
        this.setState({categories: newCategoryArray})
      })
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
            (this.state.componentShowing === "Quiz")
              ?<QuizMePage 
                categories={this.state.categories} 
                questions={this.state.questions}
              />
              :<ManageQuestions 
                categories={this.state.categories} 
                questions={this.state.questions} 
                addCategory={this.addCategory}
                removeCategory={this.removeCategory}
              />
          }
        </main>
      </div>
    )
  }
}

export default App;
