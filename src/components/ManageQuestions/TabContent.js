import React, {Component} from 'react'
import '../../styles/TabContent.css'

import AddQuestionForm from './QuestionForms/AddQuestionForm'
import CategoryContent from './CategoryContent'
import EditCategoryForm from './CategoryForms/EditCategoryForm'

class TabContent extends Component {
    // state={
    //     indexQuestionEditing: -1
    // }

    showQuestionForm = () => {
        // this.setState({
        //     indexQuestionEditing: parseInt(questionIndex)
        // })
        this.props.setShowQuestionForm(true)
    }

    // questionDisplayForViewQuestionForm = () => {
    //     return Object.assign({}, this.props.questions.filter(question => {
    //         return question.id === this.state.indexQuestionEditing
    //     })[0])
    // }

    // categoryDisplayforViewQuestionForm = () => {
    //     return this.props.categories.filter(category => {
    //         return category.id === this.props.questions.filter(question => {
    //             return question.id === this.state.indexQuestionEditing
    //         })[0].category_id
    //     })[0].name
    // }

    render(){
        return(
            <div className="tabcontent">
            {
                (this.props.showQuestionForm)
                    ?<AddQuestionForm 
                        title="Add Question Form"
                        categories={this.props.categories}
                        currentCategory={this.props.categoryShowing}
                        addQuestion={this.props.addQuestion}
                    />
                    :(this.props.editCategoryForm)
                        ?<EditCategoryForm 
                            category={this.props.categories[this.props.categoryShowing]}
                            editCategory={this.props.editCategory}
                        />
                        :<CategoryContent 
                            key={this.props.categories[this.props.categoryShowing].id} 
                            category={this.props.categories[this.props.categoryShowing]} 
                            questions={this.props.questions}
                            showQuestionForm={this.showQuestionForm}
                            setEditCategoryForm={this.props.setEditCategoryForm}
                            removeCategory={this.props.removeCategory}
                        />
            }
            </div>
        )
    }
}

export default TabContent