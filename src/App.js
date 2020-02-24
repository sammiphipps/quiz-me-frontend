import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import './App.css';

// import QuizMePage from './components/QuizMePage/QuizMePage.js'
import CategorySelection from './components/QuizMePage/CategorySelection'
import Quiz from './components/QuizMePage/Quiz'
import ManageQuestions from './components/ManageQuestions/ManageQuestions.js'
import ViewQuestionForm from './components/ManageQuestions/QuestionForms/ViewQuestionForm';

const backendUrl = 'http://localhost:3000'
class App extends Component {
  state = {
    categories: [],
    questions: [],
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

  addQuestion = (newQuestionSubmition) => {
    fetch(`${backendUrl}/question-with-answers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newQuestionSubmition)
    }).then(response => response.json())
      .then(newQuestion => {
        this.setState({questions: [...this.state.questions, newQuestion]})
      })
  }

  filterQuizCategory = (category_id) => {
    return this.state.categories.filter(category => {
      return category.id === category_id
    })[0]
  }

  render(){
    return (
      <Router>
        <div className="App">
          <header>
            <h1>QuizMe</h1>
            <nav>
              <ul>
                <li>
                  <Link to="/">Take Quiz</Link>
                </li>
                <li>
                  <Link to="/questions">Manage Questions</Link>
                </li>
              </ul>
            </nav>
          </header>
          <main>
            <Switch>
              <Route 
                exact path="/" 
                // render={(props) => <QuizMePage {...props} categories={this.state.categories} questions={this.state.questions}/>}
                render={(props) => (<CategorySelection {...props} categories={this.state.categories}/>) }
              ></Route>
              <Route
                path="/quiz/:category_id"
                render={ (props) => (<Quiz {...props} 
                  category={this.filterQuizCategory(parseInt(props.match.params.category_id))}
                  questions={this.state.questions.filter(question => {
                    return question.category_id === parseInt(props.match.params.category_id)
                  })}
                />)}
              ></Route>
              <Route
                exact path="/questions"
                render={ (props) => (<ManageQuestions {...props}
                  categories={this.state.categories} 
                  questions={this.state.questions} 
                  addCategory={this.addCategory}
                  removeCategory={this.removeCategory}
                  editCategory={this.editCategory}
                  addQuestion={this.addQuestion}
                />)}
              >
              </Route>
              <Route
                path="/questions/:id"
                render={ (props) => (<ViewQuestionForm {...props}
                  question={Object.assign({}, this.state.questions.filter(question => {
                    return question.id === parseInt(props.match.params.id)
                  }))[0]}
                  category={this.state.categories.filter(category => {
                    return category.id === this.state.questions.filter( question => {
                      return question.id === props.match.params.id
                    })
                  })}
                ></ViewQuestionForm>)
                }
              ></Route>
            </Switch>
          </main>
        </div>
      </Router>
    )
  }
}

export default App;
