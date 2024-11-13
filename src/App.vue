<template>
  <div class="m-0">
    <div class="d-flex align-items-center mb-1">
      <img class="logo" src="@/assets/logo.svg" alt="Food logo">
      <h1>All Recipes</h1>
    </div>
    
    <div class="row">
      <div class="container col-9">
        <div class="row">
          <VueDraggableNext
            v-model="dragStore.recipes"
            group="shared"
            :sort="true"
            class="d-flex start flex-wrap "
          >
          <div v-for="(recipe, index) in dragStore.recipes"
          :key="index" class="p-1">
            <Recipe :recipe="recipe"/>
          </div>
          </VueDraggableNext>
        </div>
      </div>
      <div class="col">
        <div class="p-2" v-if="dragStore.currentDraggedItem">
          <DragItem :item-data="dragStore.currentDraggedItem"/>
        </div>
      </div>
    </div>
    <div class="row">
      <div>
      </div>
      <div class="d-flex justify-center">
        <button @click="dragStore.toggleNewRecipeModal">
          Add Recipe
        </button>
        <button @click="dragStore.toggleNewIngredientModal">
          Add ingredient
        </button>
      </div>
    </div>
    <div v-show="dragStore.showNewRecipeModal">
      <Modal :fields="recipeFields" modal-name="New Recipe" @submit="handleNewRecipe"/>
    </div>
    <div v-show="dragStore.showNewIngredientModal">
      <Modal :fields="ingredientsFields" modal-name="New Ingredient" @submit="handleNewIngredient"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VueDraggableNext } from 'vue-draggable-next';
import { useDragStore } from '@/stores/dragStore'
import Modal from './components/Modal.vue'
import DragItem from './components/DragItem.vue';
import Recipe from './components/Recipe.vue';

const dragStore = useDragStore()

const ingredientsFields = [{name: "Ingredient", type: "string", placeholder:"Tomatoes"}, {name: "Quantity", type: "string", placeholder:"5"}, {name: "Recipe", type: "string", placeholder:"Pasta alla Bolognese"}]
const recipeFields = [{name: "Recipe", type: "string", placeholder:"Pasta alla Bolognese"}]


const handleNewRecipe = (formData: any) => {
  dragStore.addRecipe(formData.recipe)
}

const handleNewIngredient = (formData:any) => {
  const recipe = dragStore.recipes.filter(recipe => recipe.name.toLowerCase() === formData.recipe.toLowerCase())
  const recipeId = recipe[0].id
  const ingredient = {
    name : formData.ingredient,
    quantity : formData.quantity
  }
  dragStore.addIngredient(recipeId, ingredient)
}



</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
