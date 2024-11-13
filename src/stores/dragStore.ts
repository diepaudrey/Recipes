import { defineStore } from 'pinia'

export const useDragStore = defineStore('drag', {
    state : () => ({
        recipes: [
            { id: 1, position: 0, name: 'Pasta alla Bolegnese', items: [{name: "Tomatoes", showSettings: false, isEditing: false}, {name: "Pasta", quantity: 1, showSettings: false, isEditing: false}, {name: "Beef", quantity: "500g", showSettings: false, isEditing: false}, {name: "Carrot", quantity: "2", showSettings: false, isEditing: false}], showSettings: false, isEditing: false},
            { id: 2, position: 1, name: 'Wrap', items: [{name: "Salad", quantity: 1, showSettings: false, isEditing: false}, {name: "Tomatoes", quantity: 1, showSettings: false, isEditing: false}, {name: "Cheddar", quantity: "1 serving", showSettings: false, isEditing: false}, {name: "Chicken", quantity: "100g", showSettings: false, isEditing: false}], showSettings: false, isEditing: false },
            { id: 3, position: 1, name: 'Banana cake', items: [{name: "Flour", quantity: "250g", showSettings: false, isEditing: false}, {name: "Sugar", quantity: "80g", showSettings: false, isEditing: false}, {name: "Banana", quantity: 4, showSettings: false, isEditing: false}, {name: "Eggs", quantity: 4, showSettings: false, isEditing: false}], showSettings: false, isEditing: false },
          ],
        showNewIngredientModal: false,
        showNewRecipeModal: false,
        currentDraggedItem: {},
        draggedTimeout: 0,
    }),
    actions : {
        //Recipes methods
        addRecipe(recipeName: string) {
            this.recipes.push({id: this.recipes.length + 1, position: this.recipes.length, name: recipeName, items: [], showSettings: false, isEditing: false })
        }, 
        removeRecipe(recipeName: string) {
            this.clearSettings()
            this.recipes = this.recipes.filter(recipe => recipe.name !== recipeName)
            
        },
        toggleNewRecipeModal() {
            this.showNewRecipeModal = !this.showNewRecipeModal
        },

        toggleRecipeSettings(recipe:any) {
            recipe.showSettings = !recipe.showSettings
        },
        editingRecipe(recipe:any) {
            recipe.isEditing = true
        },
        editRecipeName(recipe:any, recipeNewName:string){
                recipe.name = recipeNewName
                recipe.isEditing = false
        },

        //Ingredient method
        addIngredient(recipeId: number, ingredientInfo: any) {
            const recipe = this.recipes.find(recipe => recipe.id === recipeId)
            ingredientInfo.isEditing = false
            if(recipe) {
                recipe.items.push(ingredientInfo)
                
            }
        },
        toggleNewIngredientModal() {
            this.showNewIngredientModal = !this.showNewIngredientModal
        },
        removeIngredient(recipeName: string, ingredientName: string) {
            this.clearSettings()
            const recipe = this.recipes.find(recipe => recipe.name === recipeName)
            if(recipe) {
                recipe.items.forEach(ingredient => ingredient.showSettings = false)
                recipe.items = recipe.items.filter((item) => item.name !== ingredientName);
            }
        },
        toggleIngredientSettings(ingredient:any) {
            ingredient.showSettings = !ingredient.showSettings
        },
        editingIngredient(ingredient:any) {
            ingredient.isEditing = true
        },
        editIngredient(recipeName: any, newIngredient:any) {
            const recipe = this.recipes.find(recipe => recipe.name === recipeName)
            if(recipe) {
                const ingredient = recipe.items.find(ingredient => ingredient.name === newIngredient.oldName)
                if(ingredient) {
                    ingredient.name = newIngredient.name
                    ingredient.quantity = newIngredient.quantity
                    ingredient.isEditing = false
                }
            }
        },
        //General methods
        closeModal() {
            this.showNewIngredientModal = false
            this.showNewRecipeModal = false
        },
        clearSettings() {
            this.recipes.forEach(recipe => {
                recipe.showSettings = false;
                recipe.items.forEach(ingredient => {
                    ingredient.showSettings = false;
                });
            });
        }
    }
})