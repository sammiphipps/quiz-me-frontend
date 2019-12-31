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

    const showAnswers = () => {
        const answerArray = consolidateAnswers();
        return answerArray.map(answer => {
            return <div>
                <input type="radio" name="answer" id={`question${question.id}-answer${answer.id}`} value={answer.id}/>
                <label htmlFor={`question${question.id}-answer${answer.id}`}>{answer.message}</label>
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