import React from 'react'
import Question from './Question'

const Quiz = ({questions, category}) => {

    const questionMap = () => {
        return questions.map(question => {
            return <Question key={question.id} question={question}/>
        })
    }

    return (
        <form id="quizForm">
            <h2>{category} Quiz</h2>
            <ol>
                {questionMap()}
            </ol>
            <input type="submit" value="Grade" />
        </form>
    )
}

export default Quiz