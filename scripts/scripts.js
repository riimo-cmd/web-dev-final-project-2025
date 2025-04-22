

/** TODO: Handle newsletter input
 * put form inputs into local storage
 * clear the form div and replace it with a confirmation message that includes the inputs from local storage
 * give custom error messages for invalid inputs
 * make sure it doesn't submit until you've added valid inputs
*/

let firstNameBox = document.getElementById("name");
let emailBox = document.getElementById("newsletter-email");
let submitBtn = document.getElementById("newsletter-submit");
let newsletter = document.getElementById("newsletter")
let submitted = false;

let firstName = firstNameBox.value;
let email = emailBox.value;

let welcomeTemplate = `<h3>Thanks for subscribing ${firstName}!</h3><p>A confirmation email will be sent to ${email} soon. Make sure to check your spam folder if you can't find it - sometimes letters get lost!`;

submitBtn.addEventListener("click", () => {
    newsletter.innerHTML = "";
    newsletter.insertAdjacentHTML("beforeend", welcomeTemplate);
});


/** TODO: Custom object
 * review chapter 8
*/




