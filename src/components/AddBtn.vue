<template>
    <button @click="$emit('add-event')">Add</button>
</template>

<script>
export default {
    name: 'AddBtn',
}
</script>

<style scoped>
button {
    border-radius: 50%;
    width: 5vw;
    height: 5vw;
    position: absolute;
    bottom: 4%;
    right: 4%;
    
}
</style>