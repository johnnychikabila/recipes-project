import {useState, useEffect} from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import {getMealById} from '../api'
import { Preloader } from '../components/Preloader';

export const Recipe = () => {
    const [recipe, setRecipe] = useState([]);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getMealById(id).then((data) => setRecipe(data.meals[0]))
    }, [id]);
    return <>
    
    {
        !recipe.idMeal ? (
            <Preloader />
        ) : (
        <div>
            <button className='btn purple darken-4' style={{margin: '2rem 0 1.5rem'}} onClick={() => {navigate(-1)}}>Back</button>
            <div style={{margin: '0 0 1.5rem'}}>
          <span><Link to="/" style={{fontSize: '14px'}} >Home</Link></span>
          <span> / </span>
          <span><Link to={`/category/${recipe.strCategory}`} style={{fontSize: '14px'}} >{recipe.strCategory}</Link></span>
          <span> / </span>
          <span><Link to={`/meal/${recipe.idMeal}`} style={{fontSize: '14px'}} >{recipe.strMeal}</Link></span>
            </div>
        <div className="recipe">
            
            <img className='recipesImg' src={recipe.strMealThumb} alt={recipe.strMeal} />
            
            <h1>{recipe.strMeal}</h1>
            <h6>Category: {recipe.strCategory}</h6>
            {recipe.strArea ? <h6 style={{fontSize: '14px'}}>Area: {recipe.strArea}</h6> : null}
            <p className='recipesDescription'>{recipe.strInstructions}</p>
            
            <table className='highlight recipesTable' >
                <thead>
                    <tr>
                        <th>Ingredient</th>
                        <th>Measure</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(recipe).map(key => {
                            if (key.includes('Ingredient') && recipe[key]) {
                                return (
                                    <tr key={key}>
                                        <td>{recipe[key]}</td>
                                        <td>{
                                        recipe[`strMeasure${key.slice(13)}`]
                                        }</td>
                                    </tr>
                                )
                            }
                            return null;
                        })
                    }
                </tbody>
            </table>
            {recipe.strYoutube ? (
                <div>
                    <h5 style={{margin: '2rem 0 1.5rem'}}>Video recipe</h5>
                    <iframe title={id} src={`https://www.youtube.com/embed/${recipe.strYoutube.slice(-11)}`} allowFullScreen />
                </div>
            ) : null}
            
            </div>
        </div>
        
    )}
    </>
}