const apiUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

let fullMealData = [];

function searchMeals() {
    console.log("searchMeals function is called");
    const searchText = document.getElementById('searchInput').value;
    console.log("Search text:", searchText);
    fetch(apiUrl + searchText)
        .then(response => response.json())
        .then(data => {
            console.log("Data received:", data);
            fullMealData = data.meals || [];
            displayMeals(fullMealData.slice(0, 5));
            document.getElementById('showAllButton').style.display = fullMealData.length > 5 ? 'block' : 'none';
        }).catch(error => console.error("API fetch error:", error));
    }

    function displayMeals(meals) {
        const mealContainer = document.getElementById('mealContainer');
        mealContainer.innerHTML = ''; // Clear previous results
        meals.forEach(meal => {
            const mealElement = document.createElement('div');
            mealElement.className = 'd-flex flex-row mb-3'; // Horizontal layout
            mealElement.innerHTML = `
                <div class="card flex-fill">
                    <div class="row g-0">
                        <div class="col-lg-3 col-md-4">
                            <img src="${meal.strMealThumb}" class="img-fluid rounded-start" alt="${meal.strMeal}">
                        </div>
                        <div class="col-lg-9 col-md-8">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-6">
                                        <h5 class="card-title">${meal.strMeal}</h5>
                                        <p class="card-text">ID: ${meal.idMeal}</p>
                                        <ul class="ingredients-grid">${getIngredients(meal)}</ul>
                                    </div>
                                    <div class="col-md-6">
                                        <p><strong>Instructions:</strong></p>
                                        <div class="instructions">${meal.strInstructions}</div>
                                    </div>
                                </div>
                                <button class="btn btn-success mt-3" onclick="showInstructions('${meal.idMeal}')">Full Details</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            mealContainer.appendChild(mealElement);
        });
    }
    
    function getIngredients(meal) {
        let ingredients = '';
        for (let i = 1; i <= 20; i++) { // Assuming there are up to 20 ingredients
            if (meal[`strIngredient${i}`]) {
                ingredients += `<li class="col-6">${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}</li>`;
            }
        }
        return ingredients;
    }
    
    function showInstructions(id) {
        const meal = fullMealData.find(m => m.idMeal === id);
        if (meal) {
            // Assuming you want to display this in an alert or modal
            alert(meal.strInstructions); // You might want to replace this with modal logic
        }
    }
    
    

document.getElementById('showAllButton').addEventListener('click', () => {
    displayMeals(fullMealData);
    document.getElementById('showAllButton').style.display = 'none';
});
