import React, {Component} from 'react'
import '../../styles/TabContent.css'

import AddQuestionForm from './QuestionForms/AddQuestionForm'
import CategoryContent from './CategoryContent'
import EditCategoryForm from './CategoryForms/EditCategoryForm'

class TabContent extends Component {

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
                            setShowQuestionForm={this.props.setShowQuestionForm}
                            setEditCategoryForm={this.props.setEditCategoryForm}
                            removeCategory={this.props.removeCategory}
                        />
            }
            </div>
        )
    }
}

export default TabContent