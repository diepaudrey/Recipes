<template>
  <div class="container">
    <h1>Recipes</h1>
    <div class="row">
      <VueDraggableNext
        v-for="(recipe, index) in dragStore.recipes"
        :key="index"
        class="col"
        v-model="recipe.items"
        group="shared"
        :sort="true"
        @end="onDragEnd"
      >
        <div class="card rounded-1">
          <div class="px-3 d-flex justify-content-between">
            <div class="d-flex justify-content-between align-items-center">
              <img class="drag-icon" src="./assets/drag-icon.svg" alt="drag and drop icon">
              <h2 class="mx-4 my-0"> {{ recipe.name }} </h2>
            </div>
            <button class="settings">
              <img src="./assets/settings.svg" alt="drag and drop icon">
            </button>
          </div>
          <div class="px-2">
            <VueDraggableNext
              v-model="recipe.items"
              group="items"
              :move="checkMove"
              @end="onDragEnd"
            >
              <div
                v-for="(item, i) in recipe.items"
                :key="i"
                class="card mb-2"
              >
                <div class="ingredient rounded-1 px-2 d-flex justify-content-between">
                  <div class="d-flex align-items-center">
                    <img class="drag-icon" src="./assets/drag-icon.svg" alt="drag and drop icon">
                    <div class="mx-4">
                      <p>{{ item.name }}</p>
                      <p class="quantity m-0">x{{ item.quantity }}</p>
                    </div>
                  </div>
                  <button class="settings">
                    <img src="./assets/settings.svg" alt="drag and drop icon">
                  </button>
                </div>

              </div>
            </VueDraggableNext>
          </div>
        </div>
      </VueDraggableNext>
    </div>
    <div class="d-flex justify-center ">
      <button>
        Add Recipe
      </button>
      <button>
        Add ingredient
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
import { useDragStore } from '@/stores/dragStore'

const dragStore = useDragStore()


// Fonction appelée lorsque le drag est terminé
function onDragEnd() {
  console.log("Drag terminé !");
}

// Fonction pour vérifier si un déplacement est permis
function checkMove(evt: any) {
  return true;
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}
.card {
  cursor: grab;
  border: 0;
  background-color: var(--medium-grey);
}

.ingredient {
  background-color: white;
  width: 100%;
}

.quantity {
  color: var(--purple);
  font-size: 13px;
}

.settings {
  background-color: transparent;
}

.drag-icon {
  width: 15px;
}
</style>
