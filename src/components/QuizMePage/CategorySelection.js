import React from 'react'
import {Link} from "react-router-dom"
import "../../styles/CategorySelection.css"

// const CategorySelection = ({categories, setQuizCategoryIndex}) => {

//     const showCategories = () => {
//         return categories.map(category => {
//             return <div className="category-card" key={category.id}><p onClick={event => setQuizCategoryIndex(category)}>{category.name}</p></div>
//         })
//     }

//     return (
//         <div className="categorySelection">
//             <p>What category would you like to be quized on?</p>
//             <div className="categories">
//                 {showCategories()}
//             </div>
//         </div>
//     )
// }

const CategorySelection = ({categories}) => {
    const showCategories = () => {
        return categories.map(category => {
            
        return <div className="category-card" key={category.id}>
            <p>
                <Link to={`/quiz/${category.id}`}>{category.name}</Link>
            </p>
        </div>
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