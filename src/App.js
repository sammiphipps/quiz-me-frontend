import React, {Component} from 'react';
import './App.css';

import QuizMePage from './components/QuizMePage/QuizMePage.js'
import ManageQuestions from './components/ManageQuestions/ManageQuestions.js'

const backendUrl = 'http://localhost:3000/'
class App extends Component {
  state = {
    categories: [],
    questions: [],
    componentShowing: "Quiz",
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

  editCategory = (categoryObject) => {
    fetch(`${backendUrl}/categories/${categoryObject.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(categoryObject)
    }).then(() => {
      const newArray = this.state.categories.map(category => {
        if(category.id === categoryObject.id){
          Object.assign(category, categoryObject)
        }
        return category
      })
      this.setState({categories: newArray})
    })
  }

  addQuestion = (questionObject, correctAnswerObject, incorrectAnswerArray) => {
    fetch(`${backendUrl}/questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(questionObject)
    }).then(response => response.json())
      .then(newQuestion => {
        const newQuestionID = newQuestion.id
        correctAnswerObject["question_id"] = newQuestionID

        fetch(`${backendUrl}/correct_answers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(correctAnswerObject)
        })

        incorrectAnswerArray.forEach(incorrectAnswerObject => {
          incorrectAnswerObject["question_id"] = newQuestionID

          fetch(`${backendUrl}/incorrect_answers`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(incorrectAnswerObject)
          })
        })

        return newQuestion.id
      }).then(newQuestionID => {
        fetch(`${backendUrl}/questions/${newQuestionID}`)
          .then(newResponse => newResponse.json())
          .then(newQuestion => {
            const newQuestionArray = [...this.state.questions, newQuestion]
            this.setState({questions: newQuestionArray})
          })
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
                editCategory={this.editCategory}
                addQuestion={this.addQuestion}
              />
          }
        </main>
      </div>
    )
  }
}

export default App;
