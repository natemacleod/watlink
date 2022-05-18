<template>
    <form id="addForm">
        <span class="p-float-label">
            <InputText class="spacing" id="title" type="text" v-model="title" />
            <label for="title">Event Title</label>
        </span>
        <span class="p-float-label">
            <InputText class="spacing" id="time" type="text" v-model="time" />
            <label for="time">Date & Time</label>
        </span>
        <span class="p-float-label">
            <InputText class="spacing" id="desc" type="text" v-model="desc" />
            <label for="desc">Description</label>
        </span>
        <PrimeButton label="Submit" class="spacing" icon="pi pi-check" @click="onSubmit" />
    </form>
</template>

<script>
export default {
    name: "AddTask",
    data() {
        return {
            title: "",
            time: "",
            desc: ""
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

            this.$emit('submit-event', newEvent);

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
    margin: 15px 0;
    min-width: 300px;
}

</style>