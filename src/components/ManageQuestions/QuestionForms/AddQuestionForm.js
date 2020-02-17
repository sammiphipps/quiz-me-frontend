import React, {Component} from 'react'
import "../../../styles/QuestionForm.css"

class AddQuestionForm extends Component {

    state={
        category_id: 0,
        question: "",
        answer_type: "",
        correct_answer: "",
        incorrect_answer1: "",
        incorrect_answer2: "",
        incorrect_answer3: ""
    }

    componentDidMount() {
        if(this.props.currentCategory){
            this.setState({ category_id: this.props.categories[this.props.currentCategory].id})
        }
    }

    handleChange = event => {
        const newObject = {}
        if(event.target.name === "category_id"){
            newObject[event.target.id] = parseInt(event.target.value)
        } else {
            newObject[event.target.id] = event.target.value
        }
        this.setState(newObject)
    }

    handleSubmit = event => {
        event.preventDefault()
        const incorrectAnswers = []
        const formData = new FormData(event.target)
        const answer_type = formData.get('answer_type')
        const newQuestionObject = {
            category_id: formData.get('category_id'),
            message: formData.get('question'),
            answer_type: answer_type
        }
        const correctAnswerObject = {
            message: formData.get('correct_answer')
        }
        const incorrectAnswerObject1 = {
            message: formData.get('incorrect_answer1')
        }
        incorrectAnswers.push(incorrectAnswerObject1)
        if(answer_type !== "boolean"){
            const incorrectAnswerObject2 = {
                message: formData.get('incorrect_answer2')
            }
            const incorrectAnswerObject3 = {
                message: formData.get('incorrect_answer3')
            }
            incorrectAnswers.push(incorrectAnswerObject2, incorrectAnswerObject3)
        }

        this.props.addQuestion({question: newQuestionObject, correct_answer: correctAnswerObject, incorrect_answers: incorrectAnswers})
    }

    loadCategoryDropdown = () => {
        return this.props.categories.map((category) => {
            return <option key={category.id} value={category.id}>{category.name}</option>
        })
    }
    render(){
        return(
            <form className="questionForm" onSubmit={this.handleSubmit}>
                <h3>{this.props.title}</h3>
                <fieldset>
                    <label htmlFor="category_id">Category:</label>
                    <select 
                        name="category_id" 
                        id="category_id" 
                        value={this.state.category_id} 
                        onChange={this.handleChange}
                        required
                    >
                        {this.loadCategoryDropdown()}
                    </select>
                </fieldset>
                <fieldset>
                    <label htmlFor="question">Question:</label>
                    <input 
                        type="text"
                        name="question"
                        id="question"
                        value={this.state.question}
                        onChange={this.handleChange}
                        required
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="answer_type">Type of Answer:</label>
                    <select 
                        name="answer_type"
                        id="answer_type"
                        value={this.state.answer_type}
                        onChange={this.handleChange}
                        required
                    >
                        <option value="" disabled>Select a Type</option>
                        <option value="boolean">True or False</option>
                        <option value="multiple">Multiple Choice</option>
                    </select>
                </fieldset>
                <fieldset>
                    <label htmlFor="correct_answer">Correct Answer:</label>
                    <input
                        type="text"
                        name="correct_answer"
                        id="correct_answer"
                        value={this.state.correct_answer}
                        onChange={this.handleChange}
                        required
                    />
                </fieldset>
                {
                    (this.state.answer_type === "boolean")
                        ?<fieldset>
                            <label htmlFor="incorrect_answer1">Incorrect Answer:</label>
                            <input 
                                type="text"
                                name="incorrect_answer1"
                                id="incorrect_answer1"
                                value={this.state.incorrect_answer1}
                                onChange={this.handleChange}
                                required
                            ></input>
                        </fieldset>
                        :<>
                            <fieldset>
                                <label htmlFor="incorrect_answer1">Incorrect Answer 1:</label>
                                <input
                                    type="text"
                                    name="incorrect_answer1"
                                    id="incorrect_answer1"
                                    value={this.state.incorrect_answer1}
                                    onChange={this.handleChange}
                                    required
                                />
                            </fieldset>
                            <fieldset>
                                <label htmlFor="incorrect_answer2">Incorrect Answer 2:</label>
                                <input
                                    type="text"
                                    name="incorrect_answer2"
                                    id="incorrect_answer2"
                                    value={this.state.incorrect_answer2}
                                    onChange={this.handleChange}
                                    required
                                />
                            </fieldset>
                            <fieldset>
                                <label htmlFor="incorrect_answer3">Incorrect Answer 3:</label>
                                <input
                                    type="text"
                                    name="incorrect_answer3"
                                    id="incorrect_answer3"
                                    value={this.state.incorrect_answer3}
                                    onChange={this.handleChange}
                                    required
                                />
                            </fieldset>
                        </>
                }
                <button type="submit">Submit Question</button>
            </form>
        )
    }
}

export default AddQuestionForm