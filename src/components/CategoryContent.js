import React, {Component} from 'react'
import "../styles/CategoryForm.css"

class CategoryContent extends Component{

    editQuestion = (question) => {
        const questionIndex = this.props.questions.indexOf(question)
        this.props.showQuestionForm(questionIndex)
    }

    questionMap = () => {
        return this.props.questions.map(question => {
            return <li key={question.id} onClick={event => this.editQuestion(question)}>{question.message}</li>
        })
    }

    render(){
        return (
                <>
                    <h3>Questions Associated with {this.props.category.name}</h3>
                    <ul>
                        {this.questionMap()}
                    </ul>
                    <div className="categoryFormButtons">
                        <button>Add Question to Category</button>
                        <button>Edit Category Name</button>
                        <button>Remove Category</button>
                    </div>
                </>
        )
    }
}

export default CategoryContent