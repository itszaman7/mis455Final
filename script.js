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
        meals.forEach((meal, index) => {
            const mealElement = document.createElement('div');
            mealElement.className = 'card mb-3'; // Use card layout
            mealElement.innerHTML = `
                <div class="card-body">
                    <div class="row g-0">
                        <div class="col-md-4 d-flex  ">
                            <img src="${meal.strMealThumb}" class="img-fluid rounded" alt="${meal.strMeal}">
                        </div>
                        <div class="col-md-8 d-flex ">
                            <div>
                                <h5 class="card-title">${meal.strMeal}</h5>
                                <p class="card-text">ID: ${meal.idMeal}</p>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-12">
                            <ul class="ingredients-grid">${getIngredients(meal)}</ul>
                        </div>
                        <div class="col-md-12 mt-2">
                            <div id="instructions-${index}" class="instructions" style="display: none;">
                                <strong>Instructions:</strong>
                                <p>${meal.strInstructions}</p>
                            </div>
                            <button class="btn btn-success mt-2" onclick="toggleInstructions(${index})">Full Details</button>
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
            if (meal[`strIngredient${i}`] && meal[`strMeasure${i}`]) {
                ingredients += `<li>${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}</li>`;
            }
        }
        return ingredients;
    }
    
    function toggleInstructions(index) {
        const instructionsElement = document.getElementById(`instructions-${index}`);
        if (instructionsElement.style.display === "none") {
            instructionsElement.style.display = "block";
        } else {
            instructionsElement.style.display = "none";
        }
    }
    
    
    
    

document.getElementById('showAllButton').addEventListener('click', () => {
    displayMeals(fullMealData);
    document.getElementById('showAllButton').style.display = 'none';
});
