import React, {Component} from 'react'

class QuestionForm extends Component {

    state={
        category_id: 0,
        question: "",
        answer_type: "",
        correct_answer: "",
        incorrect_answer1: "",
        incorrect_answer2: "",
        incorrect_answer3: ""
    }

    componentDidMount(){
        
    }

    render(){
        return(
            <form>
                <h3>{this.props.title}</h3>
                <fieldset>
                    <label htmlFor="category">Category:</label>
                    <select></select>
                </fieldset>
            </form>
        )
    }
}

export default QuestionForm