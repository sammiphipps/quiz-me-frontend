import React, {Component} from 'react'
import '../styles/TabContent.css'

import AddQuestionForm from './AddQuestionForm'
import CategoryContent from './CategoryContent'
import EditCategoryForm from './EditCategoryForm'

class TabContent extends Component {
    state={
        indexQuestionEditing: -1
    }

    showQuestionForm = (questionIndex) => {
        this.setState({
            indexQuestionEditing: questionIndex
        })
        this.props.setShowQuestionForm(true)
    }

    render(){
        return(
            <div id={this.props.categories[this.props.categoryShowing].id} className="tabcontent">
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
                            setShowQuestionFormState={this.props.setShowQuestionForm}
                            setEditCategoryForm={this.props.setEditCategoryForm}
                            removeCategory={this.props.removeCategory}
                        />
            }
            </div>
        )
    }
}

export default TabContent