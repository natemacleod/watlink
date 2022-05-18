<template>
<CardContainer>
    <template #title>
        {{ event.title }}
    </template>
    <template #subtitle>
        {{ event.time }}
    </template>
    <template #content>
        {{ event.desc }}
    </template>
    <template #footer>
        <PrimeButton icon="pi pi-pencil" label="Edit" />
        <PrimeButton icon="pi pi-trash" label="Delete" class="p-button-danger" style="margin-left: .5em" @click="deleteEvent"/>
    </template>
</CardContainer>
</template>

<script>
export default {
    name: 'EventInfo',
    props: {
        event: Object,
    },
    methods: {
        deleteEvent(e) {
            
        }
    }
}
</script>

<style>

</style>