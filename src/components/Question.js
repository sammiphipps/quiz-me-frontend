import React from 'react'
import "../styles/Question.css"

const Question = ({question}) => {

    const consolidateAnswers = () => {
        let answerArray = []
        const correctAnswerObject = {
            id: question.correct_answer.id,
            message: question.correct_answer.message,
            correct: true
        }
        answerArray = [...answerArray, correctAnswerObject]
        question.incorrect_answers.forEach(incorrect_answer => {
           const incorrectAnswerObject = {
               id: incorrect_answer.id,
               message: incorrect_answer.message,
               correct: false
           }
           answerArray = [...answerArray, incorrectAnswerObject] 
        })
        return answerArray
    }

    const inputAssignValue = (answer, counter) => {
        return (answer.correct)
            ?<input type="radio" name={`question${question.id}-answer`} value="correct"/>
            :<input type="radio" name={`question${question.id}-answer`} value={`incorrect${counter}`}/>
    }

    const showAnswers = () => {
        let counter = 0
        const answerArray = consolidateAnswers();
        return answerArray.map(answer => {
            if(answer.correct === false){
                counter = counter + 1
            }
            return <div key={`question${question.id}-answer${answer.id}`}>
                {inputAssignValue(answer, counter)}
                <label>{answer.message}</label>
            </div>
        })
    }

    return (
        <li>
            {question.message}
            <div className="answers">
                {showAnswers()}
            </div>
        </li>
    )
}

export default Question