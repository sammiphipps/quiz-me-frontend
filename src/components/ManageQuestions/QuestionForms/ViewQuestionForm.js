import React, {Component} from 'react'

class ViewQuestionForm extends Component {

    errorHandling = () => {
        window.location.href = "/"
    }

    displayIncorrectAnswer = () => {
        return this.props.question.incorrect_answers.map(incorrect_answer => {
            return <li key={incorrect_answer.id}>{incorrect_answer.message}</li>
        })
    }

    render(){
        return (
            (this.props.question === undefined || this.props.category === undefined)
                ?this.errorHandling()
                :<div className="viewQuestionForm">
                    <h3>View Question Information</h3>
                        <div className="questionInformation">
                        <p>Category: {this.props.category.name}</p> 
                        <p>Question: {this.props.question.message}</p>
                        <p>Type of Answer: {this.props.question.answer_type}</p>
                        <p>Correct Answer: {this.props.question.correct_answer.message}</p>
                        <p> Incorrect Answers</p>
                        <ul>
                            {this.displayIncorrectAnswer()}
                        </ul>
                    </div>
                </div>
        )
    }
}

//note to self put in a redirect to App.js if props are undefined
export default ViewQuestionForm