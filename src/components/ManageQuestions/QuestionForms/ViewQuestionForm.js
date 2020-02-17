import React, {Component} from 'react'

const ViewQuestionForm = ({question}) => {
    return (
        <div className="viewQuestionForm">
            <h3>View Question Information</h3>
            <div className="questionInformation">
                <p>Category:</p>
                <p>Question:</p>
                <p>Type of Answer:</p>
                <p>Correct Answer: </p>
                <p> Incorrect Answers</p>
                <ul>
                    <li>Incorrect Answer 1</li>
                    <li>Incorrect Answer 2</li>
                    <li>Incorrect Answer 3</li>
                </ul>
            </div>
        </div>
    )
}

export default ViewQuestionForm