import { defineStore } from 'pinia'

export const useDragStore = defineStore('drag', {
    state : () => ({
        recipes: [
            { id: 1, name: 'Pasta alla Bolegnese', items: [{name: "Tomatoes", quantity: 4}, {name: "Pasta", quantity: 1}, {name: "Linguine de la mama todo ben", quantity: 1}], },
            { id: 2, name: 'Recipe 2', items: [{name: "Ingredient 3", quantity: 8}, {name: "Ingredient 4", quantity: 3}] },
            { id: 3, name: 'Recipe 3', items: [{name: "Ingredient 5", quantity: 8}, {name: "Ingredient 6", quantity: 3}] },
            { id: 4, name: 'Recipe 4', items: [{name: "Ingredient 5", quantity: 8}, {name: "Ingredient 6", quantity: 3}] },
            { id: 5, name: 'Recipe 5', items: [{name: "Ingredient 5", quantity: 8}, {name: "Ingredient 6", quantity: 3}] }
          ],
        showNewIngredientModal: false,
        showNewRecipeModal: false,
    }),
    actions : {
        addRecipe(recipeName: string) {
            this.recipes.push({id: this.recipes.length + 1, name: recipeName, items: []})
        }, 
        addIngredient(recipeId: number, ingredientInfo: any) {
            const recipe = this.recipes.find(recipe => recipe.id === recipeId)
            if(recipe) {
                recipe.items.push(ingredientInfo)
            }
        },
        removeRecipe(recipeName: string) {
            this.recipes = this.recipes.filter(recipe => recipe.name !== recipeName)
        },
        toggleNewIngredientModal() {
            this.showNewIngredientModal = !this.showNewIngredientModal
        },
        toggleNewRecipeModal() {
            this.showNewRecipeModal = !this.showNewRecipeModal
        },
        removeIngredient(recipeName: string, ingredientName: string) {
            const recipe = this.recipes.find(recipe => recipe.name === recipeName)
            if(recipe) {
                recipe.items = recipe.items.filter((item) => item.name !== ingredientName);
            }
        },
        closeModal() {
            this.showNewIngredientModal = false
            this.showNewRecipeModal = false
        }
    }
})