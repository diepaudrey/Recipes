<template>
    <div class="recipe p-1 rounded-1">
        <div class="px-3 d-flex justify-content-between">
        <div class="settings-input d-flex justify-content-between align-items-center">
            <img class="drag-icon" src="../assets/drag-icon.svg" alt="drag and drop icon">
            <input class="ps-4" v-if="recipe.isEditing" type="text" v-model="inputValue" @keyup.enter="dragStore.editRecipeName(recipe, inputValue)">
            <h2  v-else class="mx-4 my-0"> {{ recipe.name }} </h2>
        </div>
        <button class="settings" @click="dragStore.toggleRecipeSettings(recipe)">
            <div class="settings-options rounded-1" v-show="recipe.showSettings">
                <div class="d-flex flex-column">
                    <img class="settings-icon" src="@/assets/edit.svg" alt="edition" @click="dragStore.editingRecipe(recipe)">
                    <img class="settings-icon" src="@/assets/delete.svg" alt="delete" @click="dragStore.removeRecipe(recipe.name)">
                </div>        
            </div>
            <img src="../assets/settings.svg" alt="drag and drop icon">
        </button>
        </div>
        <div class="px-2">
        <VueDraggableNext
            v-model="recipe.items"
            group="items"
            @start="(event) => onDragStart(event, recipe)"
            @change="(event) => onDragMove(event, recipe)"
            @end="onDragEnd"
        >
            <div
            v-for="(item, i) in recipe.items"
            :key="i"
            class="item mb-2"
            >
            <Ingredient ref="ingredient":recipe-name="recipe.name" :item="item"/>
            </div>
        </VueDraggableNext>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
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

const inputValue = ref(props.recipe.name);

function onDragStart(event: any, recipe: any) {
    const draggedItemData = {
        name: recipe.name,
        currentPosition: event.oldIndex,
        newPosition: null,
    }
    Object.assign(dragStore.currentDraggedItem, draggedItemData);
    
}

function onDragMove(event: any, recipe: any) {
    if(dragStore.currentDraggedItem && event.moved) {
        dragStore.currentDraggedItem.name = recipe.name
        dragStore.currentDraggedItem.newPosition = event.moved.newIndex
    }
}

function onDragEnd() {
    clearTimeout(dragStore.draggedTimeout)
    dragStore.draggedTimeout = setTimeout(() => {
        dragStore.currentDraggedItem = {}
    }, 3000)

}


</script>

<style scoped>
.recipe {
  cursor: grab;
  border: 0;
  background-color: var(--medium-grey);
  width: 270px;
}
</style>