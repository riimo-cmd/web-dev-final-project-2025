

// Name: Katie Dustin
// Project: Final Project Spring 2025 - Recipe Blog

/*get elements*/ 
let header = document.getElementById("header");
let footer = document.getElementById("footer");

/*link variables*/
let home = "./index.html";
let latest = "./index.html#latest";

/*HTML to insert*/
let headerContent = `<img src="../images/orange.png" alt="Dreamcicle Recipes" id="logo">
        <h1>Dreamcicle Recipes</h1>
        <nav id="navbar">
            <ul>
                <li><a href="${home}">Home</a></li>
                <li>About</li>
                <li><a href="${latest}">Latest</a></li>
                <li>Contact</li>
            </ul>
        </nav>`;
let footerContent = `<ul>
        <li>About</li>
        <li>Blog</li>
        <li>Sitemap</li>
        <li><a href="./index.html#newsletter">Newsletter</a></li>
        <li>Contact</li>
      </ul>
      `; //<p>copyright goes here</p>
      
/*Insert html*/
header.insertAdjacentHTML("afterbegin", headerContent);
footer.insertAdjacentHTML("afterbegin", footerContent);

