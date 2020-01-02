import React, {Component} from 'react'
import '../styles/TabContent.css'

import QuestionForm from './QuestionForm'
import CategoryContent from './CategoryContent'

class TabContent extends Component {
    state={
        showQuestionForm: false,
        indexQuestionEditing: -1
    }

    resetState = () => {
        this.setState({
            showQuestionForm: false,
            indexQuestionEditing: -1
        })
    }

    showQuestionForm = (questionIndex) => {
        this.setState({
            showQuestionForm: true,
            indexQuestionEditing: questionIndex
        })
    }

    render(){
        return(
            <div id={this.props.category.id} className="tabcontent">
            {
                (this.state.showQuestionForm)
                    ?<QuestionForm 
                        question={this.props.questions[this.state.indexQuestionEditing]} 
                        backToCategoryContent={this.resetState}
                    />
                    :<CategoryContent 
                        key={this.props.category.id} 
                        category={this.props.category} 
                        questions={this.props.questions}
                        showQuestionForm={this.showQuestionForm}
                    />
            }
            </div>
        )
    }
}

export default TabContent