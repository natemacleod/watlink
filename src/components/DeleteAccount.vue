<template>
    <div id="delete">
        <h3 style="color:red;" >Deleting your account is irreversible.</h3>
        <h3>All your data will be permanently lost, <br>including
            all events that you have created.</h3>
        <br>
        <CheckBox id="agree" binary v-model="box" />
        <label for="agree" id="margin">I understand that this process cannot be undone.</label>
        <br><br><br>
        <span class="p-float-label">
            <PasswordInput id="pass" :feedback="false" toggleMask inputStyle="width:300px;" v-model="pass" />
            <label for="pass">Current Password</label>
        </span>
        <br>
        <PrimeButton class="center p-button-danger" label="Delete Account" icon="pi pi-trash" @click="onSubmit" />
    </div>
</template>

<script>
export default {
    name: "DeleteAccount",
    data() {
        return {
            box: false,
            pass: ''
        }
    },
    methods: {
        onSubmit(e) {
            e.preventDefault();

            if (!this.box) this.err("Check the box to continue.");
            else if (this.pass.length === 0) this.err("Please enter your password.");
            else {

                this.$emit('delete-account', this.pass);
                
                this.box = false;
                this.pass = "";
            }
        },
        err(message) {
            this.$toast.add({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
        }
    }
}
</script>

<style scoped>
#delete {
    margin: 30px 30px 30px 30px;
}

#margin {
    margin: 0 0 0 10px;
}
</style>