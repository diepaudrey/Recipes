<template>
    <div class="ingredient rounded-1 px-2 d-flex justify-content-between">
        <div class="d-flex align-items-center">
        <img class="drag-icon" src="../assets/drag-icon.svg" alt="drag and drop icon">
        <div class="ms-4">
            <div class="settings-input d-flex align-items-center" v-if="item.isEditing">
                <div class="d-flex flex-column">
                    <input class="my-1" type="text" v-model="inputName">
                    <input class="my-1" type="text" v-model="inputQuantity">
                </div>
                
                <div class="d-flex justify-content-end w-100">
                    <img class="icon" src="@/assets/check.svg" alt="check icon" @click="dragStore.editIngredient(recipeName, newIngredient)">
                    <img class="icon" src="@/assets/crossIngredient.svg" alt="check icon" @click="item.isEditing = !item.isEditing">
                </div>
      </div>
            <div v-else>
                <p>{{ item.name }}</p>
                <p class="quantity m-0">{{ item.quantity }}</p>
            </div>
            
        </div>
        </div>
        <button class="settings" @click="dragStore.toggleIngredientSettings(item)">
            <div class="settings-options rounded-1" v-show="item.showSettings">
                <div class="d-flex flex-column">
                    <img class="settings-icon" src="@/assets/edit.svg" alt="edition" @click="dragStore.editingIngredient(item)">
                    <img class="settings-icon" src="@/assets/delete.svg" alt="delete" @click="dragStore.removeIngredient(recipeName, item.name)">
                </div>        
            </div>
            <img src="../assets/settings.svg" alt="drag and drop icon">
        </button>
        
    </div>
</template>

<script setup lang="ts">
import { useDragStore } from '@/stores/dragStore'
import { computed, ref } from 'vue'

const dragStore = useDragStore()
const props = defineProps({
    recipeName: {
        type: String,
        default :"Recipe name"
    },
    item: {
        type: Object,
        default: {name: "Default Ingredient", quantity: 1, isEditing: false}
    }
})

const inputName = ref(props.item.name)
const inputQuantity = ref(props.item.quantity)
const newIngredient = computed(() => ({
    oldName: props.item.name,
    name : inputName.value,
    quantity: inputQuantity.value,
    isEditing: false
}))
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
.icon {
    width: 25px;
}
</style>