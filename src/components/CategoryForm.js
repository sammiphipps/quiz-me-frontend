import React, {Component} from 'react'
import '../styles/CategoryForm.css'

class CategoryForm extends Component {
    state = {
        name: ''
    }

    handleChange = event => {
        this.setState({name: event.target.value})
    }

    handleSubmit = event => {
        event.preventDefault()
        const formData = new FormData(event.target)
        this.props.addCategory({name: formData.get('name')})
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <fieldset>
                    <label htmlFor="name">New Category Name:</label>
                    <input 
                        type='text' 
                        id="name" 
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

export default CategoryForm