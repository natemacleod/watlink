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
        <div id="maxBar">
            <label for="max" id="maxlbl">Maximum Members</label>
            <InputNumber id="max" v-model="max" showButtons buttonLayout="horizontal" :step="1" 
                decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success" inputStyle="width:50px; text-align:center"
                incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" :min="1" />
            <CheckBox id="unltd" v-model="unlimited" :binary="true" style="margin: 0 10px 0 25px" />
            <label for="unltd" id="unltdlbl">Unlimited</label>
        </div>
        <br><br>
        <PrimeButton class="center" label="Submit" icon="pi pi-check" @click="onSubmit" />
    </form>
</template>

<script>
export default {
    name: "AddEvent",
    data() {
        return {
            title: "",
            time: "",
            desc: "",
            max: 1,
            unlimited: false
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
            else if (!this.max && !this.unlimited) this.err("Please include a maximum number of participants, or check the \"Unlimited\" box.");
            else {
                if (this.time.length === 0) this.time = "No time specified";
                if (this.unlimited) this.max = false;

                const newEvent = {
                    title: this.title,
                    time: this.time,
                    desc: this.desc,
                    maxGoing: this.max,
                }

                this.$emit('submit-event', newEvent);

                this.title = "";
                this.time = "";
                this.desc = "";
                this.max = 1;
                this.unlimited = false;
            }
        },
        err(message) {
            this.$toast.add({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
        }
    },
}
</script>

<style scoped>
#addForm {
    margin: 20px 50px 30px 50px;
    align-items: center;
}

#maxBar {
    display: flex;
    align-items: center;
}

#maxlbl {
    margin: 0 10px 0 0;
}

#max {
    margin: 0 20px 0 0;
}

#unltd {
    margin: 0 10px 0 0;
}

.spacing {
    width: 400px;
}

</style>