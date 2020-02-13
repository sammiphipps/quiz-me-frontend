import React, {Component} from 'react'
import Question from './Question'
import "../../styles/Quiz.css"

 class Quiz extends Component {
    state = {
        gradeClicked: false,
        currentQuestionOrder: [],
        score: 0
    }

    componentDidMount() {
        const newOrder = this.shuffleArray(this.props.questions)
        this.setState({currentQuestionOrder: newOrder})
    }

    shuffleArray = (array) => {
        const indexUsed = []
        return array.map((value, currentIndex, array) => {
            let randomIndex
            do {
                randomIndex = Math.floor(Math.random() * array.length)
            } while (indexUsed.includes(randomIndex))
            indexUsed.push(randomIndex)
            return array[randomIndex]
        })
    }

    questionMap = () => {
        return this.state.currentQuestionOrder.map(question => {
            return <Question key={question.id} question={question} shuffleArray={this.shuffleArray} />
        })
    }

    gradeQuiz = event => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const sumCorrectAmount = this.props.questions.reduce((correctSum, question) => {
            const answerSelected = formData.get(`question${question.id}-answer`)
            if(answerSelected === "correct"){
                correctSum = correctSum + 1
            }
            return correctSum
        }, 0)
        this.setState({
            gradeClicked: true,
            score: sumCorrectAmount
        })

        window.scrollTo(0,0)
    }

    determineScoreColor = () => {
        const percentage = (this.state.score / this.props.questions.length) * 100
        if(percentage >= 75){
            return "green"
        } else {
            return "red"
        }
    }

    render(){
        return (
            <>
                {
                    (this.state.gradeClicked)
                        ?<div className="score">
                            <p>Score: 
                                <span 
                                    style={{color: this.determineScoreColor()}}
                                >{this.state.score} / {this.props.questions.length}</span>
                            </p>
                        </div>
                        :null
                }
                <form id="quizForm" onSubmit={this.gradeQuiz}>
                    <h2>{this.props.category} Quiz</h2>
                    <ol>
                        {this.questionMap()}
                    </ol>
                    <button type="submit">Grade Quiz</button>
                </form>
            </>
        )
    }
} 

export default Quiz