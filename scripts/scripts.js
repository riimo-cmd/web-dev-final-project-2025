

// Name: Katie Dustin
// Project: Final Project Spring 2025 - Recipe Blog

//get elements needed for the newsletter inputs
let firstNameBox = document.getElementById("name");
let emailBox = document.getElementById("newsletter-email");
let newsletterSubmitBtn = document.getElementById("newsletter-submit");
let newsletter = document.getElementById("newsletter")
let submitted = false;

//get name and email out of local storage
let firstName = localStorage.getItem("name");
let email = localStorage.getItem("email");

//gets the newsletter input and prints out a thank you message
newsletterSubmitBtn.addEventListener("click", () => {
  firstName = firstNameBox.value;
  email = emailBox.value;
  
  let welcomeTemplate = `<h3>Thanks for subscribing ${firstName}!</h3><p>A confirmation email will be sent to ${email} soon. Make sure to check your spam folder if you can't find it - sometimes letters get lost!`;
  
  localStorage.setItem("name", firstName);
  localStorage.setItem("email", email);
    newsletter.innerHTML = "";
    newsletter.insertAdjacentHTML("beforeend", welcomeTemplate);
});

//replaces thank you message if name and email are found in localstorage
if(firstName != null && email != null) {
  newsletter.innerHTML = `<h3>Looks like you're subscribed!</h3><p>Make sure to keep an eye on your email for all our delicious recipes.</p>`;
}

//get elements needed for the recipe input
let recipeSubmitBtn = document.getElementById("recipe-submit");
let newTitle = document.getElementById("recipe-title");
let newDesc = document.getElementById("recipe-desc"); //recipe description
let newPrepTime = document.getElementById("recipe-prep-time");
let newCookTime = document.getElementById("recipe-cook-time");
let newSkillLevel = document.getElementById("recipe-skill");
let newPost = document.getElementById("recipe-blog-post");
let main = document.getElementById("main");

//these two I need for both the submission logic and the add/remove button logic. 
let ingredientCount = 1;
let stepsCount = 1;

function recipeSubmit(){
  //calculates the total time so the user doesn't have to
  let totalTime = parseInt(newPrepTime.value) + parseInt(newCookTime.value);

  //creates variables to be used in the ingredients and steps loops
  let currentIngredient;
  let ingredientsArray = [""];
  let stepsArray = [""];
  let currentStep;

  //turns all the ingredient and steps inputs into their respective arrays
  for(let i = 1; i <= ingredientCount; i++){
    currentIngredient = document.getElementById("recipe-ingredient-" + i);
    ingredientsArray[i] = currentIngredient.value;
  }
  for(let i = 1; i <= stepsCount; i++){
    currentStep = document.getElementById("recipe-steps-" + i);
    stepsArray[i] = currentStep.value;
  }
  
  //creates variables to use recipes object
  let submittedRecipes = localStorage.getItem("total-submitted");
  let recipeArray = JSON.parse(localStorage.getItem('recipes')) || [];
  
  //sets submittedRecipes if it's not found in localstorage
  if(submittedRecipes == null){
    submittedRecipes = 0;
  }
  else{
    submittedRecipes++;
  }
  
  //add the inputs to an object
  let newRecipe = {
    title : newTitle.value,
    description : newDesc.value,
    post : newPost.value,
    difficulty : newSkillLevel.value,
    prepTime : newPrepTime.value,
    cookTime : newCookTime.value,
    totalTime : totalTime,
    ingredients : ingredientsArray,
    steps : stepsArray
  }
  
  //add recipe object to array
  recipeArray[submittedRecipes] = newRecipe;
  
  //store the recipe object and the recipe counter
  localStorage.setItem("total-submitted", submittedRecipes);
  localStorage.setItem("recipes", JSON.stringify(recipeArray));  
}

/**
 * Grabs submitted recipes from localstorage on load
*/
window.addEventListener("load", () => {

  //adds stored summaries to the homepage
  let recipeArray = JSON.parse(localStorage.getItem('recipes'));
  let newestRecipe = localStorage.getItem("total-submitted");

  //create the summarized recipe variable
  let summaryHTML = ``
  try{
    //create the html for each recipe summary and add them together
    for(let i = localStorage.getItem("total-submitted"); i >= 0; i--){
      summaryHTML += `
      <article>
      <h3>${recipeArray[i].title}</h3>
      <p>${recipeArray[i].description}</p>
      <p><b>Skill Level:</b> ${recipeArray[i].difficulty}</p>
      <a target="_blank" href="./recipe.html"><button id="new-tab-button-${i}" onclick="requestRecipe(${i})">View Recipe</button></a>
      </article>
      <hr>`
    }
    //adds the latest recipe to the latest section
    let latest = document.getElementById("latest");
    latest.innerHTML = ``;
    latest.innerHTML = `<h3>Latest Post</h3><h4>${recipeArray[newestRecipe].title}</h4>
    <a target="_blank" href="./recipe.html"><button id="new-tab-button-${newestRecipe}" onclick="requestRecipe(${newestRecipe})">View Recipe</button></a>`;
  }
  catch(error){
    //the user shouldn't see this unless for whatever reason the if statement on line 71 doesn't work
    summaryHTML = `<p>An unexpected error occurred. Please contact the site administrator.</p>`
  }
  finally{
    //submits the summary HTML either way
    //the latest recipe HTML only gets added if recipes are found
    main.insertAdjacentHTML("afterbegin", summaryHTML);
  }
});

//separate function because the full recipe button wouldn't work otherwise
function requestRecipe(number){
  localStorage.setItem("requested-recipe", number);
}

recipeSubmitBtn.addEventListener("click", recipeSubmit);

//get elements to add and remove buttons
let ingredientBtn = document.getElementById("ingredient-btn");
let ingredientRemove = document.getElementById("ingredient-remover");
let ingredientErrorMsg = `<p id="ingredient-error-msg">A recipe has to have ingredients!</p>`;

ingredientBtn.addEventListener("click", addIngredientButton);
function addIngredientButton() {
  
  //clears the ingredient error if found
  let ingredientError = document.getElementById("ingredient-error-msg");
  if (ingredientError != null){
    ingredientError.innerHTML = ``;
  }
  //creates new ingredient input
  ingredientCount++;
  let newIngredientDiv = document.getElementById("ingredient-" + ingredientCount);
  let ingredientTemplate = `<label for="recipe-ingredient-${ingredientCount}">Ingredient #${ingredientCount}:</label> <input id="recipe-ingredient-${ingredientCount}" name="recipe-ingredient-${ingredientCount}" type="text" required placeholder="Remember to add measurements!">`;
  if (newIngredientDiv != null){
    newIngredientDiv.insertAdjacentHTML("afterbegin", ingredientTemplate); //creates special ingredient input if ingredients aren't found
  }
  else {
    ingredientBtn.insertAdjacentHTML("beforebegin", `<div id="ingredient-${ingredientCount}">` + ingredientTemplate + `</div>`);
  }
  
}

//removes last ingredient
ingredientRemove.addEventListener("click", () => {
  try{
    let toRemove = document.getElementById("ingredient-" + ingredientCount);
    toRemove.innerHTML = ""
    ingredientCount--;
  }
  //adds an ingredient for the user if there's no ingredient inputs on screen
  catch(typeError){
    addIngredientButton();
    ingredientRemove.insertAdjacentHTML("afterend", ingredientErrorMsg);
  }
});

//get elements to add and remove buttons
let stepsBtn = document.getElementById("steps-btn");
let stepsRemove = document.getElementById("steps-remover");
let stepsErrorMsg = `<p id="steps-error-msg">A recipe has to have steps!</p>`;

stepsBtn.addEventListener("click", addStepsButton);
function addStepsButton() {
  
  let stepsError = document.getElementById("steps-error-msg");
  if (stepsError != null){
    stepsError.innerHTML = ``;
  }
  //creates new steps input
  stepsCount++;
  let newStepsDiv = document.getElementById("steps-" + stepsCount);
  let stepsTemplate = `<label for="recipe-steps-${stepsCount}">Step ${stepsCount}:</label> <input id="recipe-steps-${stepsCount}" name="steps-ingredient-${stepsCount}" type="text" required>`;
  if (newStepsDiv != null){
    newStepsDiv.insertAdjacentHTML("afterbegin", stepsTemplate); //creates special steps input if no steps are found
  }
  else {
    stepsBtn.insertAdjacentHTML("beforebegin", `<div id="steps-${stepsCount}">` + stepsTemplate + `</div>`);
  }
  
}

//removes previous steps
stepsRemove.addEventListener("click", () => {
  try{
    let toRemove = document.getElementById("steps-" + stepsCount);
    toRemove.innerHTML = ""
    stepsCount--;
  }
  //adds a step for the user if there's no step inputs on screen
  catch(typeError){
    addStepsButton();
    stepsRemove.insertAdjacentHTML("afterend", stepsErrorMsg);
  }
});
