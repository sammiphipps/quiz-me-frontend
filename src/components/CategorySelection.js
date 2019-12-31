import React from 'react'
import "../styles/CategorySelection.css"

const CategorySelection = ({categories, setQuizCategoryIndex}) => {

    const showCategories = () => {
        return categories.map(category => {
            return <div className="category-card" key={category.id}><p onClick={event => setQuizCategoryIndex(category)}>{category.name}</p></div>
        })
    }

    return (
        <div className="categorySelection">
            <p>What category would you like to be quized on?</p>
            <div className="categories">
                {showCategories()}
            </div>
        </div>
    )
}

export default CategorySelection