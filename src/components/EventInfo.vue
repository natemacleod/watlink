<template>
    <h1>{{event.title}}</h1>
    <h3>{{event.time}}</h3>
    <p>{{event.desc}}</p>
</template>

<script>
export default {
    name: 'EventInfo',
    props: {
        event: Object,
    }
}
</script>

<style>

</style>