<template>
<CardContainer class="constsize">
    <template #title>
        {{ event.title }}
    </template>
    <template #subtitle>
        {{ event.time }}
    </template>
    <template #content>
        {{ event.desc }}
        <br>
        {{ event.going.length }} joined
    </template>
    <template #footer>
        <PrimeButton icon="pi pi-user-plus" label="Join" @click="$emit('join-event', event.id)" style="margin-right: .5em" v-if="user && !event.going.includes(user.uid)"/>
        <PrimeButton icon="pi pi-user-minus" label="Leave" @click="$emit('leave-event', event.id)" style="margin-right: .5em" v-if="user && event.going.includes(user.uid)"/>
        <PrimeButton icon="pi pi-user-plus" label="Sign In to Join" disabled="disabled" style="margin-right: .5em" v-if="!user"/>
        <div id="footer" v-if="user && event.creator === user.uid">
            <PrimeButton icon="pi pi-pencil" label="Edit" class="p-button-secondary" @click="$emit('edit-event', event)" />
            <PrimeButton icon="pi pi-trash" label="Delete" class="p-button-danger" style="margin-left: .5em" @click="deleteEvent"/>
            <ConfirmPopup />
        </div>
    </template>
</CardContainer>
</template>

<script>
export default {
    name: 'EventInfo',
    props: {
        event: Object,
        user: Object,
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
        },
    }
}
</script>

<style>
.constsize {
    width: 400px;
    height: 500px;
}
#footer {
    display: inline-block;
}
</style>