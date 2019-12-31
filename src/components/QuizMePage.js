import React, {Component} from 'react'
import CategorySelection from './CategorySelection'
import Quiz from './Quiz.js'

const backendUrl = 'http://localhost:3000/'
class QuizMePage extends Component {
    state = {
        categories: [],
        questions: [],
        quizCategoryIndex: -1
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

    setQuizCategoryIndex = (category) => {
        const index = this.state.categories.indexOf(category)
        this.setState({ quizCategoryIndex: index})
    }

    pullQuestions = () => {
        return this.state.questions.filter(question => {
            const categoryId = this.state.categories[this.state.quizCategoryIndex].id
            return question.category_id === categoryId
        })
    }

    render(){
        return (
            <>
            {
                (this.state.quizCategoryIndex < 0)
                    ?<CategorySelection 
                        categories={this.state.categories} 
                        setQuizCategoryIndex={this.setQuizCategoryIndex}
                    />
                    :<Quiz 
                        category={this.state.categories[this.state.quizCategoryIndex].name} 
                        questions={this.pullQuestions()} 
                    />
            }
            </>
        )
    }
}

export default QuizMePage