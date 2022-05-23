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

            if (this.title.trim().length === 0) this.err("You must include a title.");
            else if (this.title.length > 50) this.err("Title should be 50 characters or less.");
            else if (this.desc.trim().length === 0) this.err("You must include a description.");
            else if (this.desc.length > 500) this.err("Description should be 500 characters or less.");
            else if (this.time.trim().length > 150) this.err("Date/time should be 150 characters or less.");
            else {
                if (this.time.length === 0) this.time = "No time specified";
                
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
        },
        err(message) {
            this.$toast.add({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
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