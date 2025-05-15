

/** TODO: Handle newsletter input
 * put form inputs into local storage
 * clear the form div and replace it with a confirmation message that includes the inputs from local storage
 * give custom error messages for invalid inputs
 * make sure it doesn't submit until you've added valid inputs
 * 
 * I'm doing this in the wrong order - display confirmation by default, add replace w/ signup message if not found
*/

let firstNameBox = document.getElementById("name");
let emailBox = document.getElementById("newsletter-email");
let newsletterSubmitBtn = document.getElementById("newsletter-submit");
let newsletter = document.getElementById("newsletter")
let submitted = false;

let firstName = localStorage.getItem("name");
let email = localStorage.getItem("email");

newsletterSubmitBtn.addEventListener("click", () => {
  firstName = firstNameBox.value;
  email = emailBox.value;
  
  let welcomeTemplate = `<h3>Thanks for subscribing ${firstName}!</h3><p>A confirmation email will be sent to ${email} soon. Make sure to check your spam folder if you can't find it - sometimes letters get lost!`;
  
  localStorage.setItem("name", firstName);
  localStorage.setItem("email", email);
    newsletter.innerHTML = "";
    newsletter.insertAdjacentHTML("beforeend", welcomeTemplate);
});

if(firstName != null && email != null) {
  newsletter.innerHTML = `<h3>Looks like you're subscribed!</h3><p>Make sure to keep an eye on your email for all our delicious recipes.</p>`;
}

let recipeSubmitBtn = document.getElementById("recipe-submit");
let newTitle = document.getElementById("recipe-title");
let newDesc = document.getElementById("recipe-desc"); //recipe description
let newPrepTime = document.getElementById("recipe-prep-time");
let newCookTime = document.getElementById("recipe-cook-time");

let main = document.getElementById("main");


//these two I need for both the submission logic and the add/remove button logic. 
let ingredientCount = 1;
let stepsCount = 1;

function recipeSubmit(){
  let totalTime = parseInt(newPrepTime.value) + parseInt(newCookTime.value);
  let currentIngredient;
  let currentStep;
  let submittedRecipes = localStorage.getItem("total-submitted");
  
  for(let i = 1; i <= ingredientCount; i++){
    currentIngredient = document.getElementById("recipe-ingredient-" + i);
    ingredientsArray[i] = currentIngredient.value;
    ingredientsHTML += `<li>` + ingredientsArray[i] + `</li>`;
  }
  
  for(let i = 1; i <= stepsCount; i++){
    currentStep = document.getElementById("recipe-steps-" + i);
    stepsArray[i] = currentStep.value;
    stepsHTML += `<li>` + stepsArray[i] + `</li>`;
  }
  
  if(submittedRecipes == null){
    submittedRecipes = 1;
  }
  else{
    submittedRecipes++;
  }
  
  
  //add it all to local storage
  localStorage.setItem("title" + submittedRecipes, newTitle.value);
  localStorage.setItem("description" + submittedRecipes, newDesc.value);
  localStorage.setItem("difficulty" + submittedRecipes, 1);
  localStorage.setItem("prep-time" + submittedRecipes, newPrepTime.value);
  localStorage.setItem("cook-time" + submittedRecipes, newCookTime.value);
  localStorage.setItem("total-time" + submittedRecipes, totalTime);
  localStorage.setItem("ingredients" + submittedRecipes, ingredientsArray);
  localStorage.setItem("steps" + submittedRecipes, stepsArray);
  localStorage.setItem("total-submitted", submittedRecipes);
  
}

/**
 * Grabs submitted recipes from localstorage on load
*/
window.addEventListener("load", () => {
  
  for(let i = 1; i <= localStorage.getItem("total-submitted"); i++){
    let summaryHTML = `
    <article>
    <h3>${localStorage.getItem("title" + i)}</h3>
    <a href="#recipe-${i}"><button>Jump to Recipe</button></a>
    <div class="blog-post">
    <p>${localStorage.getItem("description" + i)}</p>
    <a target="_blank" href="./recipe.html"><button id="new-tab-button-${i}" onclick="requestRecipe(${i})">View Recipe</button></a>
    </article>`
    
    
    main.insertAdjacentHTML("afterbegin", summaryHTML);
    
  }
});

//separate function because the full recipe button wouldn't work otherwise
function requestRecipe(number){
  localStorage.setItem("requested-recipe", number);
}


recipeSubmitBtn.addEventListener("click", recipeSubmit);

/** logic for adding and removing ingredients
 *  clunk incarnate but it does what it needs to do
*/
let ingredientBtn = document.getElementById("ingredient-btn");
let ingredientRemove = document.getElementById("ingredient-remover");
let ingredientErrorMsg = `<p id="ingredient-error-msg">A recipe has to have ingredients!</p>`;

ingredientBtn.addEventListener("click", addIngredientButton);
function addIngredientButton() {
  
  let ingredientError = document.getElementById("ingredient-error-msg");
  if (ingredientError != null){
    ingredientError.innerHTML = ``;
  }
  ingredientCount++;
  let newIngredientDiv = document.getElementById("ingredient-" + ingredientCount);
  let ingredientTemplate = `<label for="recipe-ingredient-${ingredientCount}">Ingredient #${ingredientCount}:</label> <input id="recipe-ingredient-${ingredientCount}" name="recipe-ingredient-${ingredientCount}" type="text" required>`;
  if (newIngredientDiv != null){
    newIngredientDiv.insertAdjacentHTML("afterbegin", ingredientTemplate);
  }
  else {
    ingredientBtn.insertAdjacentHTML("beforebegin", `<div id="ingredient-${ingredientCount}">` + ingredientTemplate + `</div>`);
  }
  
}

ingredientRemove.addEventListener("click", () => {
  try{
    let toRemove = document.getElementById("ingredient-" + ingredientCount);
    toRemove.innerHTML = ""
    ingredientCount--;
  }
  catch(typeError){
    addIngredientButton();
    ingredientRemove.insertAdjacentHTML("afterend", ingredientErrorMsg);
  }
});

/** logic for the directions
 *  it's the same as the ingredients, just with some changed names
 *  I could probably consolidate them
 *  probably won't though
*/
let stepsBtn = document.getElementById("steps-btn");
let stepsRemove = document.getElementById("steps-remover");
let stepsErrorMsg = `<p id="steps-error-msg">A recipe has to have steps!</p>`;

stepsBtn.addEventListener("click", addStepsButton);
function addStepsButton() {
  
  let stepsError = document.getElementById("steps-error-msg");
  if (stepsError != null){
    stepsError.innerHTML = ``;
  }
  stepsCount++;
  let newStepsDiv = document.getElementById("steps-" + stepsCount);
  let stepsTemplate = `<label for="recipe-steps-${stepsCount}">Step ${stepsCount}:</label> <input id="recipe-steps-${stepsCount}" name="steps-ingredient-${stepsCount}" type="text" required>`;
  if (newStepsDiv != null){
    newStepsDiv.insertAdjacentHTML("afterbegin", stepsTemplate);
  }
  else {
    stepsBtn.insertAdjacentHTML("beforebegin", `<div id="steps-${stepsCount}">` + stepsTemplate + `</div>`);
  }
  
}

stepsRemove.addEventListener("click", () => {
  try{
    let toRemove = document.getElementById("steps-" + stepsCount);
    toRemove.innerHTML = ""
    stepsCount--;
  }
  catch(typeError){
    addStepsButton();
    stepsRemove.insertAdjacentHTML("afterend", stepsErrorMsg);
  }
});




