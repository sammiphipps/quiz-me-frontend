import React, {Component} from 'react'
import "../../styles/Question.css"

class Question extends Component {

    state = {
        answerOrder: []
    }

    componentDidMount() {
        const answerArray = this.rearrangeAnswers()
        this.setState({ answerOrder: answerArray})
    }

    consolidateAnswers = () => {
        let answerArray = []
        const correctAnswerObject = {
            id: this.props.question.correct_answer.id,
            message: this.props.question.correct_answer.message,
            correct: true
        }
        answerArray = [...answerArray, correctAnswerObject]
        this.props.question.incorrect_answers.forEach(incorrect_answer => {
            const incorrectAnswerObject = {
                id: incorrect_answer.id,
                message: incorrect_answer.message,
                correct: false
            }
            answerArray = [...answerArray, incorrectAnswerObject]
        })
        return answerArray
    }

    trueFalseRearrange = (answerArray) => {
        if(answerArray[0].message !== "True"){
            const newArray = []
            newArray[0] = answerArray[1]
            newArray[1] = answerArray[0] 
            return newArray
        } else {
            return answerArray
        }
    }

    multipleChoiceRearrange = (answerArray) => {
        return this.props.shuffleArray(answerArray)
    }

    rearrangeAnswers = () => {
        const answerArray = this.consolidateAnswers()
        if(this.props.question.answer_type === "boolean"){
            return this.trueFalseRearrange(answerArray)
        } else {
            return this.multipleChoiceRearrange(answerArray)
        }
    }

    inputAssignValue = (answer, counter) => {
        return (answer.correct)
            ?<input type="radio" name={`question${this.props.question.id}-answer`} value="correct"/>
            :<input type="radio" name={`question${this.props.question.id}-answer`} value={`incorrect${counter}`}/>
    }

    showAnswers = () => {
        let counter = 0
        return this.state.answerOrder.map(answer => {
            if(answer.correct === false){
                counter = counter + 1
            }
            return <div key={`question${this.props.question.id}-answer${answer.id}`}>
                {this.inputAssignValue(answer, counter)}
                <label>{answer.message}</label>
            </div>
        })
    }

    render(){
        return (
            <li>
                {this.props.question.message}
                <div className="answers">
                    {this.showAnswers()}
                </div>
            </li>
        )
    }
}

export default Question