import { useState, useEffect } from 'react';
import MyRecipesComponent from './MyRecipesComponent';
import './App.css';

function App() {

    const [mySearch, setMySearch] = useState("");
    const [myRecipes, setMyRecipes] = useState([]);
    const [wordSubmitted, setWordSubmitted] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getRecipe = async () => {
            setLoading(true);

            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${wordSubmitted}`);
            const data = await response.json();

            setMyRecipes(data.meals || []);
            setLoading(false);
        }

        getRecipe();
    }, [wordSubmitted]);

    const myRecipeSearch = (e) => {
        setMySearch(e.target.value);
    }

    const finalSearch = (e) => {
        e.preventDefault();
        setWordSubmitted(mySearch.trim());
    }

    const getIngredients = (recipe) => {
        const ingredients = [];

        for (let i = 1; i <= 20; i++) {
            const ingredient = recipe[`strIngredient${i}`];
            const measure = recipe[`strMeasure${i}`];

            if (ingredient && ingredient.trim()) {
                ingredients.push(`${measure || ""} ${ingredient}`);
            }
        }

        return ingredients;
    }

    return (
        <div className="App">

            <div className="container">

                <video
                    className="hero-video"
                    src="/food.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                />

                <div className="hero-overlay"></div>

                <div className="hero-content">
                    <h1>My Favorite Recipes</h1>
                    <p>Discover delicious recipes from around the world.</p>
                </div>

            </div>

            <form className="search-form" onSubmit={finalSearch}>
                <input
                    className="search"
                    placeholder="Search recipes..."
                    onChange={myRecipeSearch}
                    value={mySearch}
                />

                <button
                    className="search-btn"
                    type="submit"
                    aria-label="Search recipes"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    >
                        <circle cx="10.5" cy="10.5" r="6.5" />
                        <line x1="16" y1="16" x2="21" y2="21" />
                    </svg>
                </button>
            </form>

            {loading ? (
                <p className="search-message">Loading recipes...</p>
            ) : myRecipes.length === 0 ? (
                <p className="search-message">
                    No recipes found. Try another search!
                </p>
            ) : (
                <div className="recipes-container">
                    {myRecipes.map(element => (
                        <MyRecipesComponent
                            key={element.idMeal}
                            label={element.strMeal}
                            image={element.strMealThumb}
                            category={element.strCategory}
                            area={element.strArea}
                            ingredients={getIngredients(element)}
                            instructions={element.strInstructions}
                        />
                    ))}
                </div>
            )}

        </div>
    );
}

export default App;