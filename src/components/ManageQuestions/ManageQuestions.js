import React, {Component} from 'react'
import '../../styles/ManageQuestions.css'

import TabContent from './TabContent'
import AddCategoryForm from './CategoryForms/AddCategoryForm'
class ManageQuestions extends Component {

    state = {
        addCategory: false,
        categoryShowing: 0,
        editCategoryForm: false,
        showQuestionForm: false,
    }

    componentDidCatch(){
        if(this.props.categories.length === 0 || this.props.questions.length === 0){
            window.location.href = "/"
        }
    }

    setAddCategory = (value) => {
        this.setState({ addCategory: value})
    }

    setCategoryShowing = (category) => {
        const indexOfCategory = this.props.categories.indexOf(category)
        this.setState({categoryShowing: indexOfCategory})
    }

    setEditCategoryForm = (value) => {
        this.setState({ editCategoryForm: value})
    }

    setShowQuestionForm = (value) => {
        this.setState({showQuestionForm: value})
    }

    categoryMapTabs = () => {
        return this.props.categories.map(category => {
            return <button 
                        key={category.id} 
                        className="tablinks" 
                        onClick={event => this.viewQuestions(category)}
                    >{category.name}</button>
        })
    }

    viewQuestions = (category) => {
        this.setCategoryShowing(category)
        this.setAddCategory(false)
        this.setShowQuestionForm(false)
        this.setEditCategoryForm(false)
    }

    handleRemoveCategory = (categoryID) => {
        this.props.removeCategory(categoryID)
        this.setState({categoryShowing: 0})
    }

    render(){
        return (
            <div>
                <div className="tab">
                    {this.categoryMapTabs()}
                    <button 
                        className="tablinks" 
                        onClick={event => this.setAddCategory(true)}
                    >Add Category</button>
                </div>
    
                {
                    (this.state.addCategory)
                        ?<div id='addCategory' className="tabcontent">
                            <AddCategoryForm key="categoryForm" addCategory={this.props.addCategory}/>
                        </div>
                        :<TabContent 
                            editCategoryForm={this.state.editCategoryForm}
                            showQuestionForm={this.state.showQuestionForm}
                            categories={this.props.categories}
                            categoryShowing={this.state.categoryShowing}
                            questions={this.props.questions.filter(question => question.category_id === this.props.categories[this.state.categoryShowing].id)}
                            setShowQuestionForm={this.setShowQuestionForm}
                            setEditCategoryForm={this.setEditCategoryForm}
                            removeCategory={this.handleRemoveCategory}
                            editCategory={this.props.editCategory}
                            addQuestion={this.props.addQuestion}
                        />
                }

            </div>
        )
    }
}

export default ManageQuestions