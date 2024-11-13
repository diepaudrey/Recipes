<template>
    <div class="modal-container d-flex justify-content-center align-items-center">
        <div class="content rounded-1">
            <h2 class="modal-title p-2 d-flex justify-content-center align-items-center">{{ modalName }}</h2>
            <p v-show="showError" class="text-error px-2"> Some information are missing </p>
            <div v-for="(field, index) in fields">
                
                <div class="px-2 w-100 d-flex flex-column">
                    <label :for="`input-${index}`">{{field.name}}</label>
                    <input v-model="field.value" :type="field.type"  :id="`input-${index}`" :placeholder="field.placeholder">
                </div>
            </div>
            <div class="d-flex justify-content-center align-items-center">
                <button @click="submit">Add</button>
                <button @click="clearInputs">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useDragStore } from '@/stores/dragStore'

const dragStore = useDragStore()

const props = defineProps({
    modalName: String,
    fields: {
        type: Array<{name: string, type: string, placeholder: string, value?: any}>,
        default: () => [
            { name: "Ingredient", type: "text", placeholder: "Enter ingredient", value: "" },
            { name: "Quantity", type: "text", placeholder: "Enter quantity", value: "" }
        ]
    },

})
const fields = reactive(props.fields.map(field => ({...field, value:''})))
const showError = ref(false)

const clearInputs = () => {
    fields.forEach(field => field.value = '')
    showError.value = false
    dragStore.closeModal()
}
const emit = defineEmits([`submit`]);
const submit = () => {
    const formData = fields.reduce((acc, field) => {
        acc[field.name.toLowerCase()] = field.value;
        return acc;
    }, {} as Record<string, any>);
    if(fields.some(field => field.value === '')) {
        showError.value = true
        return
    }

    emit('submit', formData);
    clearInputs()
}
</script>

<style scoped>
.modal-container {
    width: 100vw;
    height: 100vh;
    background-color: var(--transparent-grey);
    position: fixed;
    top:0;
    left: 0;
}
.content {
    width: 400px;
    background-color: var(--medium-grey);
}

label {
    color: var(--dark-blue);
    font-weight: 500;
}
input {
    border-radius: 5px;
    border:0; 
    background-color: var(--white);
    padding: 5px;
    width: 100%;
}
input:focus {
    border-color: var(--white-soft);
    outline: none;
}
::placeholder {
    color: var(--white-soft);
}

button {
    width: 30%;
}

.modal-title {
    color: var(--purple);
}

</style>
