import React, {Component} from 'react'
import '../styles/TabContent.css'

import QuestionForm from './QuestionForm'
import CategoryContent from './CategoryContent'
import EditCategoryForm from './EditCategoryForm'

class TabContent extends Component {
    state={
        indexQuestionEditing: -1
    }

    // resetState = () => {
    //     this.setState({
    //         indexQuestionEditing: -1
    //     })
    //     this.props.setShowQuestionFormState(false)
    // }

    showQuestionForm = (questionIndex) => {
        this.setState({
            indexQuestionEditing: questionIndex
        })
        this.props.setShowQuestionFormState(true)
    }

    render(){
        return(
            <div id={this.props.category.id} className="tabcontent">
            {
                (this.props.showQuestionForm)
                    ?<QuestionForm 
                        question={this.props.questions[this.state.indexQuestionEditing]} 
                        // backToCategoryContent={this.resetState}
                    />
                    :(this.props.editCategoryForm)
                        ?<EditCategoryForm 
                            category={this.props.category}
                            editCategory={this.props.editCategory}
                        />
                        :<CategoryContent 
                            key={this.props.category.id} 
                            category={this.props.category} 
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