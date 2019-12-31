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

    const trueFalseRearrange = (answerArray) => {
        if(answerArray[0].message !== "True"){
            const newArray = []
            newArray[0] = answerArray[1]
            newArray[1] = answerArray[0] 
            return newArray
        } else {
            return answerArray
        }
    }

    const multipleChoiceRearrange = (answerArray) => {
        const indexUsed = []
        return answerArray.map((answer, currentIndex, array )=> {
            let randomIndex
            do{
                randomIndex = Math.floor(Math.random() * answerArray.length)
            } while( indexUsed.includes(randomIndex))
            indexUsed.push(randomIndex)
            return array[randomIndex]
        })
    }

    const rearrangeAnswers = () => {
        const answerArray = consolidateAnswers()
        if(question.answer_type === "boolean"){
            return trueFalseRearrange(answerArray)
        } else {
            return multipleChoiceRearrange(answerArray)
        }
    }

    const inputAssignValue = (answer, counter) => {
        return (answer.correct)
            ?<input type="radio" name={`question${question.id}-answer`} value="correct"/>
            :<input type="radio" name={`question${question.id}-answer`} value={`incorrect${counter}`}/>
    }

    const showAnswers = () => {
        let counter = 0
        const answerArray = rearrangeAnswers()
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