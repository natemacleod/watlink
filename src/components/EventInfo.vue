<template>
    <DialogBox :modal='true' header="Event Details" v-model:visible='dispDetails'>
        <div id="details">
            <h2 style="overflow-wrap: break-word;">{{ event.title }}</h2>
            <br>
            <h4 style="overflow-wrap: break-word;">{{ event.time }}</h4>
            <div v-if="event.class">
                <h4>for {{ event.class }} {{ event.clnum }}</h4>
            </div>
            <br><br>
            <p style="overflow-wrap: break-word;"><i class="pi pi-eye"></i><strong> Public Description: </strong>{{
                    event.desc
            }}</p>
            <br>
            <div id="pdesc" v-if="user && event.going.includes(user.uid)">
                <p style="overflow-wrap: break-word;"><i class="pi pi-eye-slash"></i><strong> Private Description:
                    </strong>{{ event.pd }}</p>
                <br>
            </div>
            <p v-if="event.maxGoing === false"> <strong>{{ event.going.length }}</strong> joined</p>
            <p v-else> <strong>{{ event.going.length }}</strong> / {{ event.maxGoing }} joined</p>
            <br>
            <p>Created by <strong>{{ event.crName }}</strong></p>
            <br><br>
            <div id="buttons">
                <PrimeButton icon="pi pi-user-plus" label="Join" @click="$emit('join-event', event.id)"
                    style="margin-right: .5em; width: 32%;" v-if="user && !event.going.includes(user.uid)" />
                <PrimeButton icon="pi pi-user-minus" label="Leave" @click="$emit('leave-event', event.id)"
                    style="margin-right: .5em; width: 32%;" v-if="user && event.going.includes(user.uid)" />
                <PrimeButton label="Sign In to Join" disabled="disabled" style="width: 100%;" v-if="!user" />
                <PrimeButton icon="pi pi-pencil" label="Edit" class="p-button-secondary"
                    @click="$emit('edit-event', event)" style="width: 32%;" v-if="user && event.creator === user.uid" />
                <PrimeButton icon="pi pi-trash" label="Delete" class="p-button-danger"
                    style="margin-left: .5em; width: 32%" v-if="user && event.creator === user.uid"
                    @click="deleteEvent" />
                <ConfirmPopup />
            </div>
        </div>
    </DialogBox>
    <CardContainer class="constsize">
        <template #title>
            <h4 style="overflow-wrap: break-word;">{{ event.title.length > 40 ? event.title.substring(0, 39) + "..." :
                    event.title
            }}</h4>
        </template>
        <template #subtitle>
            <h4 style="overflow-wrap: break-word;">{{ event.time.length > 30 ? event.time.substring(0, 29) + "..." :
                    event.time
            }}</h4>
            <div v-if="event.class">
                <h4>for {{ event.class }} {{ event.clnum }}</h4>
            </div>
        </template>
        <template #content>
            <p style="overflow-wrap: break-word;">{{ event.desc.length > 200 ? event.desc.substring(0, 199) + "..." :
                    event.desc
            }}</p>
            <br>
            <p v-if="event.maxGoing === false"> <strong>{{ event.going.length }}</strong> joined</p>
            <p v-else> <strong>{{ event.going.length }}</strong> / {{ event.maxGoing }} joined</p>
            <br>
            <p>Created by <strong>{{ event.crName }}</strong></p>
        </template>
        <template #footer>
            <div id="foot">
                <PrimeButton icon="pi pi-plus" label="Expand" style="display: block; width: 368px; margin-bottom: .5em;"
                    @click="toggleDetails" />
                <PrimeButton icon="pi pi-user-plus" label="Join" @click="$emit('join-event', event.id)"
                    style="margin-right: .5em; width: 118px;" v-if="user && !event.going.includes(user.uid)" />
                <PrimeButton icon="pi pi-user-minus" label="Leave" @click="$emit('leave-event', event.id)"
                    style="margin-right: .5em; width: 118px;" v-if="user && event.going.includes(user.uid)" />
                <PrimeButton label="Sign In to Join" disabled="disabled" style="width: 368px;" v-if="!user" />
                <div id="footer" v-if="user && event.creator === user.uid">
                    <PrimeButton icon="pi pi-pencil" label="Edit" class="p-button-secondary"
                        @click="$emit('edit-event', event)" style="width: 117px;" />
                    <PrimeButton icon="pi pi-trash" label="Delete" class="p-button-danger"
                        style="margin-left: .5em; width: 117px" @click="deleteEvent" />
                    <ConfirmPopup />
                </div>
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
        name: String,
    },
    data() {
        return {
            dispDetails: false
        };
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
        toggleDetails() {
            this.dispDetails = !this.dispDetails;
            console.log(this.dispDetails);
        }
    }
}
</script>

<style>
.constsize {
    border-radius: 10px !important;
    height: 500px;
    position: relative;
}

#footer {
    display: inline-block;
}

#details {
    min-width: 400px;
    max-width: 45vw;
}

#foot {
    position: absolute;
    bottom: 5%;
}

#buttons {
    display: flex;
    justify-content: space-evenly;
}

</style>