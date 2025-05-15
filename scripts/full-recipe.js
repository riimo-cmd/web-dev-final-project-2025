


/**
 * Logic for opening the recipe in a new tab
 * Expanded version of the summary work, more or less.
*/
window.addEventListener("load", () => {
    
      //Main section on the new tab. Has a unique name so I don't get confused.
      let popoutMain = document.getElementById("popout-main"); 
      let recipeNum = localStorage.getItem("requested-recipe");
      let ingredientsHTML = ``;
      let ingredientsList = localStorage.getItem("ingredients" + recipeNum);
      console.log(ingredientsHTML);
      console.log(recipeNum);
      let stepsHTML = ``;
      let stepsList  = localStorage.getItem("steps" + recipeNum);
      
      for (let i = 0; i < ingredientsList.length; i++){
        ingredientsHTML += `<li>` + ingredientsList[i] + `</li>`;
      }
        for (let i = 0; i < stepsList.length; i++){
        stepsHTML += `<li>` + stepsList[i] + `</li>`;
      }
      console.log("hi");
      
      
      let recipeHTML = `
      <article>
      <h3>${localStorage.getItem("title" + recipeNum)}</h3>
      <a href="#recipe-${recipeNum}"><button>Jump to Recipe</button></a>
      <div class="blog-post">
      <p>${localStorage.getItem("description" + recipeNum)}</p>
      <p><b>Prep Time:</b> ${localStorage.getItem("prep-time" + recipeNum)} minutes</p>
      <p><b>Cook Time:</b> ${localStorage.getItem("cook-time" + recipeNum)} minutes</p>
      <p><b>Total:</b> ${localStorage.getItem("total-time" + recipeNum)} minutes</p>
      </div>
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
