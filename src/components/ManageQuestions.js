import React, {Component} from 'react'
import '../styles/ManageQuestions.css'

import TabContent from './TabContent'
class ManageQuestions extends Component {

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
            return <TabContent key={category.id} category={category} questions={this.props.questions.filter(question => question.category_id === category.id)}/>
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
                    <form>
                        <label htmlFor="name">New Category Name:</label>
                        <input type='text' id="name" name="name"></input>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default ManageQuestions