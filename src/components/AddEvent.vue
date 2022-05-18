<template>
    <div class="add-form">
        <form @submit="onSubmit">
            <div class="form-control">
                <label>Title</label>
                <input type="text" v-model="title" name="title" placeholder="Add Title" />
            </div>
            <div class="form-control">
                <label>Day & Time</label>
                <input type="text" v-model="time" name="day/time" placeholder="Add Day & Time" />
            </div>
            <div class="form-control">
                <label>Description</label>
                <input type="text" v-model="desc" name="desc" placeholder="Add Description" />
            </div>

            <input type="submit" value="Save Event" class="btn btn-block" />
        </form>
        <button id="close" @click="openSe" class="btn btn-block">Close</button>
    </div>
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
.add-form {
    margin-bottom: 40px;
    border: 1px solid orange;
}

#close {
    padding: 10px;
    margin: 20px;
}

.form-control {
    margin: 20px 0;
}

.form-control label {
    display: block;
}

.form-control input {
    width: 80%;
    height: 40px;
    margin: 5px;
    padding: 3px 7px;
    font-size: 17px;
}

.form-control-check {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.form-control-check label {
    flex: 1;
}

.form-control-check input {
    flex: 2;
    height: 20px;
}
</style>