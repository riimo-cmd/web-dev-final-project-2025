

/*get elements*/ 
let header = document.getElementById("header");
let footer = document.getElementById("footer");

/*link variables*/
let home = "./index.html";

/*HTML to insert*/
let headerContent = `<img src="../images/orange.png" alt="Dreamcicle Recipes" id="logo">
        <h1>Dreamcicle Recipes</h1>
        <nav id="navbar">
            <ul>
                <li><a href="${home}">Home</a></li>
                <li><a href="${home}">Home</a></li>
                <li><a href="${home}">Home</a></li>
                <li><a href="${home}">Home</a></li>
            </ul>
        </nav>`;
let footerContent = `<ul>
        <li><a href="${home}">About</a></li>
        <li><a href="${home}">Blog</a></li>
        <li><a href="${home}">Sitemap</a></li>
        <li><a href="${home}">Newsletter</a></li>
        <li><a href="${home}">Contact</a></li>
      </ul>
      <p>copyright goes here</p>`;
      
/*Insert html*/
header.insertAdjacentHTML("afterbegin", headerContent);
footer.insertAdjacentHTML("afterbegin", footerContent);

