$(document).ready(function () {
  getCocktail();

  function getCocktail() {
    const drinkId = grabParameterFromQueryString("drinkID");
    var cocktailDetails = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`;
    fetch(cocktailDetails)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        displayIngredients(data.drinks[0]);
        displayDrinkPic(data.drinks[0]);
      });
  }

  function grabParameterFromQueryString(parameter) {
    const urlParameters = window.location.search;
    if (urlParameters.indexOf(parameter) === -1) {
      return; //not found
    }
    const startOfValue = urlParameters.slice(urlParameters.indexOf(parameter) + parameter.length + 1);
    const endOfValue = startOfValue.indexOf("&") !== -1 ? startOfValue.indexOf("&") : startOfValue.length;
    return (value = startOfValue.slice(0, endOfValue));
  }

  function displayIngredients(ingredients) {
    $("#drinkName").text(ingredients.strDrink);
    for (let i = 1; i <= 15; i++) {
      var ingredient = eval(`ingredients.strIngredient${i}`);
      if (!ingredient) {
        break;
      }

      var measurement = eval(`ingredients.strMeasure${i}`);

      var liEl = measurement
        ? `<li class='collection-item'>${ingredient} - ${measurement}</li>`
        : `<li class='collection-item'>${ingredient}</li>`;
      $("#ingredients").append(liEl);

      $("#drinkInstructions").text(ingredients.strInstructions);
    }
  }
  //display large drink pic on screen
  function displayDrinkPic(drinkPic) {
    var drinkPic = $(`<img class='responsive-img' src=${drinkPic.strDrinkThumb}>`);
    $("#drinkPic").append(drinkPic);
  }
});
