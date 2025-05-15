


/**
 * Logic for opening the recipe in a new tab
 * Expanded version of the summary work, more or less.
*/
window.addEventListener("load", () => {

      //get elements
      let recipeArray = JSON.parse(localStorage.getItem('recipes'));
      //Main section on the new tab. Has a unique name so I don't get confused.
      let popoutMain = document.getElementById("popout-main"); 
      let recipeNum = localStorage.getItem("requested-recipe");
      let ingredientsHTML = ``; //set as an empty string now to make my life easier later
      let stepsHTML = ``; //see previous comment 
      //set the ingredients and steps arrays to their own variables. 
      //I didn't do these to the other recipe values because they only get called once.
      let ingredientsList = recipeArray[recipeNum].ingredients;
      let stepsList  = recipeArray[recipeNum].steps;
      
      //turns the ingredients and steps lists into a block of list items
      for (let i = 1; i < ingredientsList.length; i++){
        ingredientsHTML += `<li>` + ingredientsList[i] + `</li>`;
      }
      for (let i = 1; i < stepsList.length; i++){
        stepsHTML += `<li>` + stepsList[i] + `</li>`;
      }
      
      //puts items from the recipeArray into their own HTML elements and adds it to <main>
      let recipeHTML = `
      <article>
      <h3>${recipeArray[recipeNum].title}</h3>
      <a href="#recipe-${recipeNum}"><button>Jump to Recipe</button></a>
      <p><b>Skill Level:</b> ${recipeArray[recipeNum].difficulty}</p>
      <p>${recipeArray[recipeNum].post}</p>
      <p>${recipeArray[recipeNum].description}</p>
      <p><b>Prep Time:</b> ${recipeArray[recipeNum].prepTime} minutes</p>
      <p><b>Cook Time:</b> ${recipeArray[recipeNum].cookTime} minutes</p>
      <p><b>Total:</b> ${recipeArray[recipeNum].totalTime} minutes</p>
      <div class="recipe" id="recipe-${recipeNum}">
      <div class="ingredients">
      <h4>Ingredients</h4>
      <ul>
      ${ingredientsHTML}
      </ul>
      </div>
      <div class="steps">
      <h4>Directions</h4>
      <ol>
                 ${stepsHTML}
               </ol>
             </div>
           </div>
         </article>`;
    
         popoutMain.insertAdjacentHTML("afterbegin", recipeHTML);
    }
);
