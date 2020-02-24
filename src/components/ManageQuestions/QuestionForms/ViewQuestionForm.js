import React from 'react'

const ViewQuestionForm = ({question, category}) => {

    const displayIncorrectAnswer = () => {
        return question.incorrect_answers.map(incorrect_answer => {
            return <li>{incorrect_answer.message}</li>
        })
    }

    return (
        <div className="viewQuestionForm">
            <h3>View Question Information</h3>
            <div className="questionInformation">
                <p>Category: {category}</p> 
                <p>Question: {question.message}</p>
                <p>Type of Answer: {question.answer_type}</p>
                <p>Correct Answer: {question.correct_answer.message}</p>
                <p> Incorrect Answers</p>
                <ul>
                    {displayIncorrectAnswer()}
                </ul>
            </div>
        </div>
    )
}

//note to self put in a redirect to App.js if props are undefined
export default ViewQuestionForm