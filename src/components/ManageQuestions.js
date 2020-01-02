import React, {Component} from 'react'
import '../styles/ManageQuestions.css'

import TabContent from './TabContent'
import AddCategoryForm from './AddCategoryForm'
class ManageQuestions extends Component {

    state = {
        editCategoryForm: false,
        showQuestionForm: false,
    }

    setEditCategoryForm = (value) => {
        this.setState({ editCategoryForm: value})
    }

    setShowQuestionFormState = (value) => {
        this.setState({showQuestionForm: value})
    }

    categoryMapTabs = () => {
        return this.props.categories.map(category => {
            return <button 
                        key={category.id} 
                        className="tablinks" 
                        onClick={event => this.viewQuestions(event, category.id)}
                    >{category.name}</button>
        })
    }

    categoryMapTabContent = () => {
        return this.props.categories.map(category => {
            return <TabContent 
                    key={category.id} 
                    editCategoryForm={this.state.editCategoryForm}
                    showQuestionForm={this.state.showQuestionForm}
                    category={category} 
                    questions={this.props.questions.filter(question => question.category_id === category.id)}
                    setShowQuestionFormState={this.setShowQuestionFormState}
                    setEditCategoryForm={this.setEditCategoryForm}
                    removeCategory={this.props.removeCategory}
                    editCategory={this.props.editCategory}
                />
        })
    }

    viewQuestions = (event, categoryId) => {
        let i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(categoryId).style.display = "block";
        event.currentTarget.className += " active";

        this.setShowQuestionFormState(false)
        this.setEditCategoryForm(false)
    }

    render(){
        return (
            <div>
                <div className="tab">
                    {this.categoryMapTabs()}
                    <button 
                        className="tablinks" 
                        onClick={event => this.viewQuestions(event, 'addCategory')}
                    >Add Category</button>
                </div>
    
                {this.categoryMapTabContent()}
    
                <div id='addCategory' className="tabcontent">
                    <AddCategoryForm key="categoryForm" addCategory={this.props.addCategory}/>
                </div>
            </div>
        )
    }
}

export default ManageQuestions