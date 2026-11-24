import { useState } from 'react';

function MyRecipesComponent({ label, image, category, area, ingredients, instructions }) {

    const [showRecipe, setShowRecipe] = useState(false);

    return (
        <div className="recipe-card">

            <img className="recipe-image" src={image} alt={label} />

            <h2>{label}</h2>

            <p>Category: {category}</p>
            <p>Cuisine: {area}</p>

            <button
                className="recipe-btn"
                onClick={() => setShowRecipe(!showRecipe)}
            >
                {showRecipe ? "Hide Recipe" : "View Recipe"}
            </button>

            {showRecipe && (
                <div className="recipe-details">

                    <div className="ingredients">
                        <h3>Ingredients</h3>

                        <ul>
                            {ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="instructions">
                        <h3>Instructions</h3>
                        <p>{instructions}</p>
                    </div>

                </div>
            )}

        </div>
    );
}

export default MyRecipesComponent;