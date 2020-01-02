import React, {Component} from 'react'
import '../styles/CategoryForm.css'

class EditCategoryForm extends Component {
    state = {
        name: ''
    }

    componentDidMount(){
        if(this.props.category){
            this.setState({name: this.props.category.name})
        }
    }

    handleChange = event => {
        this.setState({name: event.target.value})
    }

    handleSubmit = event => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const newCategoryObject = {
            id: this.props.category.id,
            name: formData.get('name')
        }
        this.props.editCategory(newCategoryObject)
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <fieldset>
                    <label htmlFor={`editName${this.props.category.id}`}>Category Name:</label>
                    <input 
                        type='text' 
                        id={`editName${this.props.category.id}`}
                        name="name" 
                        value={this.state.name} 
                        onChange={this.handleChange}
                    ></input>
                </fieldset>
                <button type="submit">Submit</button>
            </form>
        )
    }
}

export default EditCategoryForm