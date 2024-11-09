import { defineStore } from 'pinia'

export const useDragStore = defineStore('drag', {
    state : () => ({
        recipes: [
            { id: 1, name: 'Pasta alla Bolegnese', items: [{name: "Tomatoes", quantity: 4}, {name: "Pasta", quantity: 1}, {name: "Linguine de la mama", quantity: 1}], },
            { id: 2, name: 'Recipe 2', items: [{name: "Ingredient 3", quantity: 8}, {name: "Ingredient 4", quantity: 3}] },
            { id: 3, name: 'Recipe 3', items: [{name: "Ingredient 5", quantity: 8}, {name: "Ingredient 6", quantity: 3}] },
          ],
    }),
    actions : {
        addRecipe(recipeName: string) {
            this.recipes.push({id: this.recipes.length + 1, name: recipeName, items: []})
        }, 
        addIngredient(recipeId: number, ingredient: any) {
            const recipe = this.recipes.find(ingredient => ingredient.id === recipeId)
            recipe?.items.push(ingredient)
        }
    }
})