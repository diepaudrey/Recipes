<template>
    <div class="drag-item rounded-1 p-2">
        <h2>Information</h2>
        <div class="d-flex">
            <p class="field">Name : </p>
            <p>{{itemData?.name}}</p>
        </div>
        <div class="d-flex">
            <p class="field">Order :</p>
            <p>{{itemData?.currentPosition}}</p>
        </div>
        <div class="d-flex">
            <p class="field">New Order :</p>
            <p>{{itemData?.newPosition}}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    itemData: {
        type: Object,
    }
})
</script>

<style scoped>
.drag-item {
    background-color: var(--medium-grey);
}
.field {
    color: var(--purple)
}
p,h2 {
    margin : 2%;
}
</style>