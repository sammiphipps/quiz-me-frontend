import React, {Component} from 'react'
import CategorySelection from './CategorySelection'
import Quiz from './Quiz.js'

class QuizMePage extends Component {
    state = {
        quizCategoryIndex: -1
    }

    setQuizCategoryIndex = (category) => {
        const index = this.props.categories.indexOf(category)
        this.setState({ quizCategoryIndex: index})
    }

    pullQuestions = () => {
        return this.props.questions.filter(question => {
            const categoryId = this.props.categories[this.state.quizCategoryIndex].id
            return question.category_id === categoryId
        })
    }

    render(){
        return (
            <>
            {
                (this.state.quizCategoryIndex < 0)
                    ?<CategorySelection 
                        categories={this.props.categories} 
                        setQuizCategoryIndex={this.setQuizCategoryIndex}
                    />
                    :<Quiz 
                        category={this.props.categories[this.state.quizCategoryIndex].name} 
                        questions={this.pullQuestions()} 
                    />
            }
            </>
        )
    }
}

export default QuizMePage