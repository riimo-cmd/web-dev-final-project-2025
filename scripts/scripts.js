

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
  
  localStorage.setItem("name", firstName.value);
  localStorage.setItem("email", firstName.value);
    newsletter.innerHTML = "";
    newsletter.insertAdjacentHTML("beforeend", welcomeTemplate);
});

if(firstName != null && email != null) {
  newsletter.innerHTML = `<h3>Looks like you're subscribed!</h3><p>Make sure to keep an eye on your email for all our delicious recipes.</p>`;
}


/** TODO: Custom object
 * review chapter 8
*/

let recipeSubmitBtn = document.getElementById("recipe-submit");
let newTitle = document.getElementById("recipe-title");
let newDesc = document.getElementById("recipe-desc"); //recipe description
let newPrepTime = document.getElementById("recipe-prep-time");
let newCookTime = document.getElementById("recipe-cook-time");

let main = document.getElementById("main");


let submittedRecipes = 0;

//these two I need for both the submission logic and the add/remove button logic. 
let ingredientCount = 1;
let stepsCount = 1;

function recipeSubmit(){
    let totalTime = parseInt(newPrepTime.value) + parseInt(newCookTime.value);
    let ingredientsList = ``;
    let currentIngredient;
    let stepsList = ``;
    let currentStep;

    for(let i = 1; i <= ingredientCount; i++){
      currentIngredient = document.getElementById("recipe-ingredient-" + i);
      ingredientsList += `<li>` + currentIngredient.value + `</li>`;
    }

    for(let i = 1; i <= stepsCount; i++){
      currentStep = document.getElementById("recipe-steps-" + i);
      stepsList += `<li>` + currentStep.value + `</li>`;
    }
    
    let recipeHTML = `
    <article>
        <h3>${newTitle.value}</h3>
        <a href="#recipe-${submittedRecipes}"><button>Jump to Recipe</button></a>
        <div class="blog-post">
        <p>${newDesc.value}</p>
        <p><b>Prep Time:</b> ${newPrepTime.value} minutes</p>
        <p><b>Cook Time:</b> ${newCookTime.value} minutes</p>
        <p><b>Total:</b> ${totalTime} minutes</p>
        </div>
        <div class="recipe" id="recipe-${submittedRecipes}">
          <div class="ingredients">
            <h4>Ingredients</h4>
            <ul>
              ${ingredientsList}
            </ul>
          </div>
          <div class="steps">
            <h4>Directions</h4>
            <ol>
              ${stepsList}
            </ol>
          </div>
        </div>
      </article>`;

    main.insertAdjacentHTML("afterbegin", recipeHTML);
    submittedRecipes++;


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


