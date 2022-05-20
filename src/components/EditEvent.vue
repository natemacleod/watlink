<template>
    <form id="addForm">
        <span class="p-float-label">
            <InputText class="spacing" id="title" type="text" v-model="title" />
            <label for="title">Event Title</label>
        </span>
        <br><br>
        <span class="p-float-label">
            <InputText class="spacing" id="time" type="text" v-model="time" />
            <label for="time">Date & Time</label>
        </span>
        <br><br>
        <span class="p-float-label">
            <InputText class="spacing" id="desc" type="text" v-model="desc" />
            <label for="desc">Description</label>
        </span>
        <br><br>    
        <PrimeButton class="center" label="Submit" icon="pi pi-check" @click="onSubmit" />
    </form>
</template>

<script>
export default {
    name: "EditEvent",
    props: {
        event: Object,
    },
    data() {
        return {
            title: this.event.title,
            time: this.event.time,
            desc: this.event.desc
        }
    },
    methods: {
        onSubmit(e) {
            e.preventDefault();

            // TODO: error control

            const newEvent = {
                title: this.title,
                time: this.time,
                desc: this.desc
            }

            this.$emit('submit-edit', this.event.id, newEvent);

            this.title = "";
            this.time = "";
            this.desc = "";
        }
    }
}
</script>

<style scoped>
#addForm {
    margin: 20px 50px 30px 50px;
    align-items: center;
}

.spacing {
    min-width: 300px;
}

</style>