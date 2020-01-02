import React, {Component} from 'react'
import "../styles/CategoryContent.css"

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

    editCategoryClick = event => {
        this.props.setEditCategoryForm(true)
    }

    removeCategoryClick = event => {
        this.props.removeCategory(this.props.category.id)
    }

    render(){
        return (
                <>
                    <h3>Questions Associated with {this.props.category.name}</h3>
                    {
                        (this.props.questions.length === 0)
                            ?<p>There are no questions currently associated with this category.</p>
                            :<ul>{this.questionMap()}</ul>
                    }
                    <div className="categoryFormButtons">
                        <button>Add Question to Category</button>
                        <button onClick={this.editCategoryClick}>Edit Category Name</button>
                        <button onClick={this.removeCategoryClick}>Remove Category</button>
                    </div>
                </>
        )
    }
}

export default CategoryContent