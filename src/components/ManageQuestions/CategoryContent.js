import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import "../../styles/CategoryContent.css"

class CategoryContent extends Component{

    questionMap = () => {
        return this.props.questions.map(question => {
            return <li id={question.id} key={question.id}><Link to={`/questions/${question.id}`}>{question.message}</Link></li>
        })
    }

    addQuestionClick = event => {
        this.props.setShowQuestionForm(true)
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
                        <button onClick={this.addQuestionClick}>Add Question to Category</button>
                        <button onClick={this.editCategoryClick}>Edit Category Name</button>
                        <button onClick={this.removeCategoryClick}>Remove Category</button>
                    </div>
                </>
        )
    }
}

export default CategoryContent