class MealPages {
    constructor(id){
        api.fetchMeal(id).then(this.buildMealPage.bind(this))
    }

    buildMealPage(meal){
        this.meal = meal
        this.name = meal.name
        this.id = meal.id
        this.ingredients = meal.ingredients
        this.renderMeal()
        this.renderIngredients()
        
    }

    // renderIngredients(ingredients){
    //     ingredients.forEach(ingredient => console.log(ingredient.food_id))
    // }

    renderMeal(){
        const {meal_id, ingredients, meal_name} = this.meal
        const mealCard = document.createElement('div')
        document.body.innerHTML = ""
        // console.log(this.meal)
        this.addButtons()
        const header = document.createElement('h1')
        const idHeader = document.createElement('h3')
        idHeader.innerText = this.id
        idHeader.setAttribute('class', 'text-center')
        header.setAttribute('class', 'text-center')
        header.innerText = this.name
        mealCard.append(header, idHeader)
        document.body.append(mealCard)
        // mealInfo.appendChild(mealIngredients)
        
    }

    renderIngredients(){
        const ingredientAPI = new ApiService('http://localhost:3000/')
        this.ingredients.forEach(ingredient => {
            ingredientAPI.fetchFood(ingredient.food_id).then(data => {
                const ingredientDiv = document.createElement('div')
                const mealInfo = document.createElement('p')
                mealInfo.innerText = JSON.stringify(data.name)
                ingredientDiv.append(mealInfo)
                document.body.append(ingredientDiv)
            })
        })
        
    }

    addButtons(){
        const navBar = document.createElement('nav')
        navBar.setAttribute('class', 'container-fluid')
        const searchBar = document.createElement('p')
        searchBar.innerHTML =`<input type="text" placeholder="Search..">`
        navBar.append(searchBar)
        
        const backButton = document.createElement('button')
        const newButton = document.createElement('button')
        newButton.setAttribute('id', 'newButton')
        newButton.innerText = "Create New Meal"
        setAttributes(newButton, {"class": "btn btn-primary", "data-toggle":"modal", })
        const newModal = document.createElement('div')
        setAttributes(newModal, {"id": "newModal", "class": "modal-fade", "role":"dialog", "aria-hidden":"true", "aria-labelledby":"innerModal"})
        const modalSpan = document.createElement('span')
        modalSpan.setAttribute("class", "close")
        setAttributes(modalSpan, {"aria-hidden":"true"})
        modalSpan.innerText = "&times;"
        const closeButton = document.createElement('button')
        setAttributes(closeButton, {"type": "button", "class":"close"})
        closeButton.append(modalSpan)
        const modalDialog = document.createElement('div')
        setAttributes(modalDialog, {"class": "modal-dialog", "role":"document"})
        
        const modalHeader = document.createElement('div')
        modalHeader.setAttribute("class", "modal-header")
        const modalTitle = document.createElement('h5')
        setAttributes(modalTitle, {"id":"innerModal"})
        modalTitle.innerHTML = "Modal Title"
        modalDialog.append(modalHeader, modalTitle)
        newModal.append(closeButton)
        newModal.append(modalDialog)
        newButton.onclick = function() {
            newModal.style.display = "block";
        }
        modalSpan.onclick = function(){
            newModal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target == newModal) {
              newModal.style.display = "none";
            }
          }
        backButton.setAttribute('class', 'btn btn-outline-primary')
        backButton.innerText = 'Back to Meals '
        backButton.addEventListener('click', function(e){
            e.preventDefault()
            const clearDivs = document.querySelectorAll('div')
            clearDivs.forEach(div => div.remove())
            api.fetchMeals()
        })
        navBar.append(backButton, newButton, newModal)
        document.body.appendChild(navBar)
    }
    
}

function setAttributes(el, attrs) {
    for(var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }