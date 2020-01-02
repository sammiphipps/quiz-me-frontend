import React, {Component} from 'react'
import '../styles/TabContent.css'

import QuestionForm from './QuestionForm'
import CategoryContent from './CategoryContent'

class TabContent extends Component {
    state={
        indexQuestionEditing: -1
    }

    resetState = () => {
        this.setState({
            indexQuestionEditing: -1
        })
        this.props.setShowQuestionFormState(false)
    }

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
                        backToCategoryContent={this.resetState}
                    />
                    :<CategoryContent 
                        key={this.props.category.id} 
                        category={this.props.category} 
                        questions={this.props.questions}
                        showQuestionForm={this.showQuestionForm}
                        removeCategory={this.props.removeCategory}
                    />
            }
            </div>
        )
    }
}

export default TabContent