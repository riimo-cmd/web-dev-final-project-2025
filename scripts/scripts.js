

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
let submitBtn = document.getElementById("newsletter-submit");
let newsletter = document.getElementById("newsletter")
let submitted = false;

let firstName = localStorage.getItem("firstNameBox");
let email = localStorage.getItem("emailBox");

let welcomeTemplate = `<h3>Thanks for subscribing ${firstName}!</h3><p>A confirmation email will be sent to ${email} soon. Make sure to check your spam folder if you can't find it - sometimes letters get lost!`;

submitBtn.addEventListener("click", () => {
    localStorage.setItem(firstNameBox.name, firstName.value);
    localStorage.setItem(emailBox.name, firstName.value);
    
    newsletter.innerHTML = "";
    newsletter.insertAdjacentHTML("beforeend", welcomeTemplate);
});


/** TODO: Custom object
 * review chapter 8
*/

let recipeTemplate  = {
    title: "Title",
    description: "oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio oñio ",
    prepTime: 0,
    cookTime: 0,
    //my spellchecker is having a breakdown 
    ingredients: ["oñio", "oñio", "oñio"],
    steps: ["dice oñio", "saute oñio", "appreciate oñio", "become oñio", "reach CHIM via oñio"]
};




