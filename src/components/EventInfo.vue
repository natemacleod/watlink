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
        <PrimeButton icon="pi pi-pencil" label="Edit" @click="$emit('edit-event', event)" />
        <PrimeButton icon="pi pi-trash" label="Delete" class="p-button-danger" style="margin-left: .5em" @click="deleteEvent"/>
        <ConfirmPopup />
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
            this.$confirm.require({
                target: e.currentTarget,
                message: `Are you sure you want to delete ${this.event.title}? This is irreversible.`,
                icon: "pi pi-exclamation-triangle",
                accept: () => this.sendDeleteEvent(),
                reject: null,
            });
        },
        sendDeleteEvent() {
            this.$emit('delete-event', this.event.id);
        }
    }
}
</script>

<style>

</style>