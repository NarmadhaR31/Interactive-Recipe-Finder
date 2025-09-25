const apiKey = a1bfc52d28484ef4b72ccffb663f8392; // Replace with your key

async function getRecipes() {
  const ingredients = document.getElementById("ingredients").value;
  const diet = document.getElementById("diet").value;
  const cuisine = document.getElementById("cuisine").value;
  const time = document.getElementById("time").value;

  let url = `https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${ingredients}&number=6&apiKey=${apiKey}`;

  if (diet) url += `&diet=${diet}`;
  if (cuisine) url += `&cuisine=${cuisine}`;
  if (time) url += `&maxReadyTime=${time}`;

  const response = await fetch(url);
  const data = await response.json();
  console.log(data);

  let output = "";
  if (data.results.length === 0) {
    output = "<p>No recipes found. Try different filters!</p>";
  } else {
    data.results.forEach(recipe => {
      output += `
        <div class="recipe-card">
          <img src="${recipe.image}" alt="${recipe.title}">
          <h3>${recipe.title}</h3>
          <p>⏱ Cooking time: ${recipe.readyInMinutes || "N/A"} mins</p>
          <a href="https://spoonacular.com/recipes/${recipe.title.replace(/ /g, "-")}-${recipe.id}" target="_blank">
            View Recipe
          </a>
        </div>
      `;
    });
  }

  document.getElementById("recipe-results").innerHTML = output;
}
