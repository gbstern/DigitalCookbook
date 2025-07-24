let state = {
    users: [
        { id: 1, firstName: "", lastName: "", email: "stern5375156@gmail.com", phoneNumber: "", userName: "gitty", password: "1234" }
    ],
    recipes: [
        {
            id: 1, category: "", name: "4 ingredients sugar cookies", img: "img/cookies.JPG", desc: "Parve", time: "30 Minuts", qty: "30 Cookies",
            ingredients: [
                { title: "Cookies", ing: ["3 cups flour", "2 stiks margarine", "1 egg", "1 cup Sugar"] },
                { title: "Frosting", ing: ["1 egg white", "1 cup confectioners sugar"] }
            ],

            instroction: [
                {
                    title: "prepare the cookies", ins: ["In a mixer beat margarine and sugar well, Add eggs and beat untill smooth.",
                        "Pour in flour and mix untill soft dough forms. dough may be a bit sticky.",
                        "Sprinkle some flour in a baking sheet, roll out dough between two sheets.",
                        "Cut out cookies with cookie cutter, bake on 180 for 15 minut"]
                },
                { title: "make the icing", ins: ["beat eggwhite untill peaks form.", "add sugar gentely and continue beating for 2 minut.", "add desired colors of food coloring and mix well"] }

            ]
        },
        {
            id: 2, category: "", name: "creamed potatos", img: "img/potatos.jpg", desc: "Dairy", time: "20 Minuts", qty: "5 Servings",
            ingredients: [
                { title: "Potatos", ing: ["8 - 9 cubed potatos", "100 gr butter", "5 Tbsp soup mix", "5 Tbsp chilli sauce"] },
                { title: "Sauce", ing: ["250 ml cream", "180 ml milk", "1 package mashroom sauce mix"] }
            ],

            instroction: [
                {
                    title: "prepare the potatoes",
                    ins: ["cook potatos untill very soft.", "add butter, soup mix, chilli sauce, cover pot untill butter melts, and Stirr carefully."]
                },
                {
                    title: "make the sauce",
                    ins: ["Cook all sauce ingredient untill boiling.", "place potatos in a baking pan, pour sauce over potatos, bake on 180 for 1/2 hour"]
                },


            ]
        },
        {
            id: 3, category: "", name: "strawberry sorbet", img: "img/drink.jpg", desc: "parve", time: "15 minuts", qty: "10 Servings",
            ingredients: [
                { title: "sorbet", ing: ["250 gr strawberries", "2 eggs", "1/3 cup oil", "3/4 cup sugar", "2 tbsp jelly", "1/2 tbsp lemon juice"] }
            ],
            instroction: [
                {
                    title: "prepare the sorbet",
                    ins: ["blend all ingredient well", "freeze for a couple hours"]
                },

            ]
        },
        {
            id: 4, category: "", name: "chocolate pudding", img: "img/pudding.jpg", desc: "dairy", time: "10 minuts", qty: "2 Servings",
            ingredients: [
                { title: "pudding", ing: ["1 cup milk", "1 cup water", "1 tbsp cocoa", "2 tbsp suagar", "1 vanilla sugar", "3 tbsp corn starch"] }
            ],
            instroction: [
                {
                    title: "prepare the pudding",
                    ins: ["In a small put boil milk with cocoa and sugar.", "In a cup mix water with starch.", "add the water to the boiling milk and mix untill puding is ready", "serve warm"]
                },

            ]
        },
        {
            id: 5, category: "", name: "sweet 'n sour salmon", img: "img/salmon.jpg", desc: "parve", time: "25 minuts", qty: "5 Servings",
            ingredients: [
                { title: "salmon", ing: ["5 salmon fillets", "3 tbsp soy sauce", "1/4 cup ketchup", "1 tbsp viniger", "2 tsp sugar"] }
            ],
            instroction: [
                {
                    title: "prepare the fish",
                    ins: ["Mix all sauce ingredient well.", "Spread onto the fish", "bake the fish on 240 for 10 minuts"]
                }
            ]
        }

    ],
    filteredRecipes: [],
    myRecipes: []
}


let loggedInUser;
showPage('homePage', 'home');
renderRecipes();



//----------------------------------------פונקציות לוגיקה----------------------------------------------------
//------------------------------------------------------------------------------------------------------------

//this is a search function
function search() {
    let input = document.getElementById("searchNav").value;
    const result = state.recipes.filter(r => r.name.includes(input));
    state.filteredRecipes = result;
    renderFilteredRecipes();
}

//this function prints the recipes when the icon is clicked
function printList() {
    window.print();
}

//---------------sign-in fuctions--------------------

let currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

// This function deals with validation of the form fields
function validateForm() {
    let x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
        // If a field is empty...
        if (y[i].value == "") {
            // add an "invalid" class to the field:
            y[i].className += " invalid";
            // and set the current valid status to false
            valid = false;
        }
    }
    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid; // return the valid status
}

//this function adds a user to the user arr
function addUser(user) {
    if (state.users.findIndex(u => u.email == user.email) != -1)
        return false;
    state.users.push(user);
    return true;
}

//saves the information that was inserted
function onRegisterSubmit(event) {
    event.preventDefault();
    const firstName = event.target.fName.value;
    const lastName = event.target.lName.value;
    const email = event.target.email.value;
    const phoneNumber = event.target.phone.value;
    const userName = event.target.userName.value;
    const psw = event.target.psw.value;
    const pswRepeat = event.target.repeatPsw.value;
    console.log(firstName, lastName, email, phoneNumber, userName, psw);
    if (psw == pswRepeat) {
        let newUser = addUser({ id: null, firstName: firstName, lastName: lastName, email: email, phoneNumber: phoneNumber, userName: userName, password: psw });
        if (newUser == true) {
            document.getElementById("password_error").innerHTML = "";
            alert("hi " + userName);
        }

        else
            document.getElementById("register_error").innerHTML = "sorry, this email already exists";
    }
    else {
        document.getElementById("password_error").innerHTML = "your passwords do not match";

    }
    console.log(state.users);
}


//-------------------log-in functions------------------
//this function checks if the user that logged-in is registered
function loginUser(email, password) {
    return state.users.find(u => u.email == email && u.password == password);
}

//this function logges in the user
function onLoginSubmit(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.psw.value;
    loggedInUser = loginUser(email, password);
    if (loggedInUser != undefined) {
        alert("hi " + loggedInUser.userName);
        showMyRecipe();
    }
    else {
        document.getElementById("login_error").innerHTML = "One of your details is wrong";
    }
}


//------------my Recipe functions-----------------------
//this function adds a recipe to my recipes when the heart button is clicked
function addRecipe(id) {
    if (loggedInUser != undefined) {
        alert("your recipe was added");
        state.myRecipes.push(state.recipes[id]);
        // console.log(state.myRecipes);
        state.myRecipes[i].id = state.myRecipes.length;
        // console.log(state.myRecipes[i].id);
    }
    showMyRecipe();

}

//this function runs through all of my recipes and finds the recipe that needs to be deleted
function deleteRecipe(id) {
    for (let i = 0; i < state.myRecipes.length; i++) {
        if (state.myRecipes[i].id == id) {
            const deletedRecipe = state.myRecipes.splice(i, 1)[0];
            console.log("deleted recipe ", deletedRecipe);
            break;
        }
    }
}

//------------------------------------------פונקציות תצוגה---------------------------------------------------
//------------------------------------------------------------------------------------------------------------

//--------------------render------------------------------

//this function renders all recipes
function renderRecipes() {
    const allRecipes = document.getElementById("recipesDiv");
    allRecipes.innerHTML = "";
    // console.log("allRecipes" , allRecipes);
    for (let i = 0; i < state.recipes.length; i++) {
        const recipe = state.recipes[i];
        const recipeComponent = `
        <div class="recipe">
            <div id="img">
                <img src="${recipe.img}" width="100%" onclick="seeDetails(${i})" id="food">
                <img src="img/heart.png" title="add to your recipes" id="heart" onclick="addRecipe(${i})">
            </div>
            <p>${recipe.desc} | ${recipe.qty} | ${recipe.time}</p>
            <h2>${recipe.name}</h2>
        </div>
        `
        // console.log("recipeComponent" + recipeComponent);
        allRecipes.innerHTML += recipeComponent;
        // console.log("allRecipes" , allRecipes);
    }
}

//this function renders the recipes details
function renderRecipesDetails(k) {
    const name = document.getElementById("title");
    name.innerHTML = "";
    const comp = `
        <h1>${state.recipes[k].name}</h1>
    `
    const rate = `
        <div class="rate">
                    <p>4.0</p>
                    <div id="stars">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path
                                d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path
                                d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path
                                d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path
                                d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>

                        <svg width="16" height="16" fill="currentColor">
                            <path
                                d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                        </svg>
                    </div>

                    <p>(21)</p>
                </div>
    `
    name.innerHTML += comp;
    name.innerHTML += rate;

    const image = document.getElementById("image");
    image.innerHTML = "";
    const imgComponent = `
        <img src="${state.recipes[k].img}" width="40%" id="picture">
    `
    image.innerHTML += imgComponent;

    const recipeIngredient = document.getElementById("ingrList");
    recipeIngredient.innerHTML = "";
    for (let i = 0; i < state.recipes[k].ingredients.length; i++) {
        const ingredient = `
            <h2>${state.recipes[k].ingredients[i].title}</h2> 
        `
        recipeIngredient.innerHTML += ingredient;

        for (let j = 0; j < state.recipes[k].ingredients[i].ing.length; j++) {
            const ingredient = `
                <li>- ${state.recipes[k].ingredients[i].ing[j]}</li> 
            `
            recipeIngredient.innerHTML += ingredient;
        }

    }

    const recipeInstruction = document.getElementById("instList");
    recipeInstruction.innerHTML = "";
    const instruction = `
            <h2>Prepare the ${state.recipes[k].ingredients.title}</h2>
        `
    for (let i = 0; i < state.recipes[k].instroction.length; i++) {
        const instruction = `
            <h2>${state.recipes[k].instroction[i].title}</h2> 
        `
        recipeInstruction.innerHTML += instruction;

        for (let j = 0; j < state.recipes[k].instroction[i].ins.length; j++) {
            const instruction = `
            <div id="num">
                <h1>.${j + 1}</h1>
                <li>${state.recipes[k].instroction[i].ins[j]}</li>
            </div>
            `
            recipeInstruction.innerHTML += instruction;
        }
    }

}

//this function renders my-recipes if loged-in
function showMyRecipe() {
    if (loggedInUser != undefined) {
        showPage('myRecipesPage', 'myRecipes');
        let myRecipesDiv = document.getElementById("myRecipesDiv");
        myRecipesDiv.innerHTML = "";
        console.log("myRecipesDiv", myRecipesDiv);
        for (let i = 0; i < state.myRecipes.length; i++) {
            const component = `
                <div class="myRecipe">
                </div>
            `
            myRecipesDiv.innerHTML += component;
        }


        for (let i = 0; i < state.myRecipes.length; i++) {

            let myRecipe = document.getElementsByClassName("myRecipe")[i];
            myRecipe.innerHTML = "";
            const myImg = `
                <div id="myImg">
                    <img src="${state.myRecipes[i].img}" width="60%" id="food">
                    <p>${state.myRecipes[i].desc} | ${state.myRecipes[i].qty} | ${state.myRecipes[i].time}</p>
                </div>
            `
            myRecipe.innerHTML += myImg;

            const myRecipesDetails = `
                <div id="myRecipesDetails">
                    <h1 id="myTitle">${state.myRecipes[i].name}</h1>
                    <button class="accordion" id="ingr" onclick="openAccordion(${(state.myRecipes[i].id) * 2 - 2})">Ingredients</button>
                    <div id="panel">
                        <ul id="myIngredients">          
                        </ul>
                    </div>
                    <button class="accordion" id="inst" onclick="openAccordion(${(state.myRecipes[i].id) * 2 - 1})">Directions</button>
                    <div id="panel2">
                        <ol id="myInstructions">          
                        </ol>
                    </div>
                </div>
            `

            myRecipe.innerHTML += myRecipesDetails;

            const panel = document.getElementById("panel");

            const myIngredients = document.getElementById("myIngredients");
            for (let j = 0; j < state.myRecipes[i].ingredients.length; j++) {

                const myIngTitle = `
                    <h2>${state.myRecipes[i].ingredients[j].title}</h2>
                `

                myIngredients.innerHTML += myIngTitle;
                for (let k = 0; k < state.myRecipes[i].ingredients[j].ing.length; k++) {
                    const myIng = `
                        <li>${state.myRecipes[i].ingredients[j].ing[k]}</li>
                    `
                    myIngredients.innerHTML += myIng;
                }

            }
            myRecipesDetails.innerHTML += myIngredients;
            const panel2 = document.getElementById("panel2");

            const myInstructions = document.getElementById("myInstructions");
            for (let j = 0; j < state.myRecipes[i].instroction.length; j++) {

                const myInsTitle = `
                    <h2>${state.myRecipes[i].instroction[j].title}</h2>
                `
                myInstructions.innerHTML += myInsTitle;
                for (let k = 0; k < state.myRecipes[i].instroction[j].ins.length; k++) {
                    const myIns = `
                        <li>${state.myRecipes[i].instroction[j].ins[k]}</li>
                    `
                    myInstructions.innerHTML += myIns;
                }

            }

            myRecipesDetails.innerHTML += myInstructions;

            const icons = `
                <div id="icons">
                    <svg onclick="deletedRecipeClick(${state.myRecipes[i].id})" width="30" height="30" fill="currentColor"
                        class="bi bi-trash3" viewBox="0 0 16 16">
                        <path
                            d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                    </svg>
                    <svg onclick="printList()" width="30" height="30" fill="currentColor" class="bi bi-printer"
                        viewBox="0 0 16 16">
                        <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1" />
                        <path
                            d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1" />
                    </svg>
                </div>
            `
            myRecipe.innerHTML += icons;
            console.log("myRecipe ", myRecipe);


            // myRecipesDiv.innerHTML += myRecipe;
            console.log("myRecipesDiv", myRecipesDiv);
        }

    }

    else {
        document.getElementById("myRecipesPageError").style.display = "flex";
        const error = document.getElementById("myRecipesPageError");
        error.innerHTML = "";
        const component = `
            <h1>You need to <a onclick="showPage('loginPage', 'login')">login</a> to access My Recipes</h1>
        `
        error.innerHTML += component;
    }
}

//this function renders the filltered recipes
function renderFilteredRecipes() {
    const allRecipes = document.getElementById("recipesDiv");
    allRecipes.innerHTML = "";
    for (let i = 0; i < state.filteredRecipes.length; i++) {
        const recipe = state.filteredRecipes[i];
        console.log("recipe ", recipe);
        const recipeComponent = `
        <div class="recipe">
            <div id="img">
                <img src="${recipe.img}" width="100%" onclick="seeDetails(${i})" id="food">
                <img src="img/heart.png" title="add to your recipes" id="heart" onclick="addRecipe(${i})">
            </div>
            <p>${recipe.desc} | ${recipe.qty} | ${recipe.time}</p>
            <h2>${recipe.name}</h2>
        </div>
        `
        console.log("recipeComponent" + recipeComponent);
        allRecipes.innerHTML += recipeComponent;
    }
}



//---------------------event----------------------------
//this fuction finds the right recipe to be shown
function seeDetails(i) {
    document.getElementById("recipesPage").style.display = "none";
    document.getElementById("recipesDetailPage").style.display = "flex";
    renderRecipesDetails(i);
}

//this function deletes a recipe from my recipes when the delete button is clicked
function deletedRecipeClick(id) {
    console.log("you want to delete recipe num " + id);
    deleteRecipe(id);
    console.log("you deleted recipe num " + id);
    showMyRecipe();
}

//this function opens & closes my-Recipe-Details
function openAccordion(i) {
    let acc = document.getElementsByClassName("accordion");
    console.log("i" + i);
    acc[i].classList.toggle("active");

    console.log("acc[i]" + acc[i]);
    let panel = acc[i].nextElementSibling;
    console.log(panel);
    if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
        panel.style.padding = "0";

    } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
        panel.style.paddingTop = "18px";
        panel.style.paddingBottom = "18px";
    }
}

//this function changes the nav, and shows and hides pages
function showPage(pageId, link) {
    //מעביר לעמוד שעליו לחצו
    for (let i = 0; i < 8; i++) {
        document.getElementsByClassName("page")[i].style.display = "none";
    }
    document.getElementById(pageId).style.display = "block";


    //מגביה את הסימניה עם הלינק שעליו לחצו
    for (let i = 0; i < 4; i++) {
        document.getElementsByTagName("a")[i].style.height = "17px";
        document.getElementsByTagName("a")[i].style.marginTop = "5px";
    }
    document.getElementById(link).style.height = "22px";
    document.getElementById(link).style.marginTop = "0";


    // const video = document.getElementById("myVideo");
    // if (pageId == 'homePage') {
    //     video.play();
    //   } else {
    //     video.pause();
    //   }
}

//-------------------sign in------------------------

//this function will display the specified tab of the form...
function showTab(num) {
    let tabs = document.getElementsByClassName("tab");
    tabs[num].style.display = "flex";
    //... and fix the Previous/Next buttons:
    if (num == 0) {
        document.getElementById("prevBtn").style.display = "none";
        document.getElementById("submit").style.display = "none";
        document.getElementById("nextBtn").style.display = "inline";
    }
    if (num > 0 && num < (tabs.length - 1)) {
        document.getElementById("prevBtn").style.display = "inline";
        document.getElementById("nextBtn").style.display = "inline";
        document.getElementById("submit").style.display = "none";
    }
    if (num == (tabs.length - 1)) {
        document.getElementById("submit").style.display = "inline";
        document.getElementById("nextBtn").style.display = "none";
        document.getElementById("nextBtn").style.display = "none";
        //... and run a function that will display the correct step indicator:
        fixStepIndicator(num)
    }
}

//this function will figure out which tab to display
function nextPrev(num) {
    let tab = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (num == 1 && !validateForm()) return false;
    // Hide the current tab:
    tab[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + num;
    // if you have reached the end of the form...
    if (currentTab >= tab.length) {
        // ... the form gets submitted:
        document.getElementById("regForm").submit();
        return false;
    }
    document.getElementById("password_error").innerHTML = "";
    document.getElementById("register_error").innerHTML = "";

    showTab(currentTab);
}

//this function removes the "active" class of all steps...
function fixStepIndicator(num) {
    let i, step = document.getElementsByClassName("step");
    for (i = 0; i < step.length; i++) {
        step[i].className = step[i].className.replace(" active", "");
    }
    //... and adds the "active" class on the current step:
    step[num].className += " active";
}

//this function shows and hides the psw
function showPsw() {
    const psw = document.getElementById("psw");
    const pswr = document.getElementById("repeatPsw");
    if (psw.type === "password") {
        psw.type = "text";
        pswr.type = "text"
    }
    else {
        psw.type = "password";
        pswr.type = "password";
    }
}


//--------------------log-in-------------------------

//this function shows and hides the psw
function showPsw2() {
    const psw = document.getElementById("psw2");
    if (psw.type === "password") {
        psw.type = "text";
    }
    else {
        psw.type = "password";
    }
}

//this function shows an error message if one or more of the details are wrong
function renderError(errorDivId, text) {
    const errorDiv = document.getElementById(errorDivId);
    errorDiv.innerHTML = text;
}

//this function rotates betwwen the sigh-in to log-in form
function showForm(showFormId, hideFormId) {
    document.getElementById(hideFormId).style.display = "none";
    document.getElementById(showFormId).style.display = "block";
    document.getElementById("login_error").innerHTML = "";
}
