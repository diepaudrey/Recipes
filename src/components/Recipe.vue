<template>
    <div class="recipe p-1 rounded-1">
        <div class="px-3 d-flex justify-content-between">
        <div class="d-flex justify-content-between align-items-center">
            <img class="drag-icon" src="../assets/drag-icon.svg" alt="drag and drop icon">
            <h2 class="mx-4 my-0"> {{ recipe.name }} </h2>
        </div>
        <button class="settings" @click="dragStore.removeRecipe(recipe.name)">
            <img src="../assets/settings.svg" alt="drag and drop icon">
        </button>
        </div>
        <div class="px-2">
        <VueDraggableNext
            v-model="recipe.items"
            group="items"
        >
            <div
            v-for="(item, i) in recipe.items"
            :key="i"
            class="item mb-2"
            >
            <Ingredient :recipe-name="recipe.name" :item="item"/>
            </div>
        </VueDraggableNext>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useDragStore } from '@/stores/dragStore'
import { VueDraggableNext } from 'vue-draggable-next';
import Ingredient from './Ingredient.vue';

const dragStore = useDragStore()
const props = defineProps({
    recipe: {
        type: Object,
        default: { id: 0, name: 'Default Recipe', items: [{name: "Default Ingredient", quantity: 1}], }
    }
})

</script>

<style scoped>
.recipe {
  cursor: grab;
  border: 0;
  background-color: var(--medium-grey);
}
</style>