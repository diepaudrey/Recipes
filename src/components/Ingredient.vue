<template>
    <div class="ingredient rounded-1 px-2 d-flex justify-content-between">
        <div class="d-flex align-items-center">
        <img class="drag-icon" src="../assets/drag-icon.svg" alt="drag and drop icon">
        <div class="mx-4">
            <p>{{ item.name }}</p>
            <p class="quantity m-0">x{{ item.quantity }}</p>
        </div>
        </div>
        <button class="settings" @click="dragStore.removeIngredient(recipeName, item.name)">
        <img src="../assets/settings.svg" alt="drag and drop icon">
        </button>
    </div>
</template>

<script setup lang="ts">
import { useDragStore } from '@/stores/dragStore'

const dragStore = useDragStore()
const props = defineProps({
    recipeName: {
        type: String,
        default :"Recipe name"
    },
    item: {
        type: Object,
        default: {name: "Default Ingredient", quantity: 1}
    }
})
</script>

<style scoped>
.ingredient {
  background-color: white;
  width: 250px;
}
.quantity {
  color: var(--purple);
  font-size: 13px;
}
</style>