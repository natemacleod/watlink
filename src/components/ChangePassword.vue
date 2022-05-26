<template>
    <form id="changePass">
        <span class="p-float-label">
        <PasswordInput id="cpass" :feedback="false" toggleMask inputStyle="width:300px;" v-model="cpass" />
        <label for="cpass">Current Password</label>
        </span>
        <br><br>
        <span class="p-float-label">
        <PasswordInput id="npass" :feedback="false" toggleMask inputStyle="width:300px;" v-model="npass" />
        <label for="npass">New Password</label>
        </span>
        <br><br>
        <span class="p-float-label">
        <PasswordInput id="npass2" :feedback="false" toggleMask inputStyle="width:300px;" v-model="npass2" />
        <label for="npass2">Repeat New Password</label>
        </span>
        <br><br>   
        <PrimeButton label="Change Password" class="pi-button-primary" icon="pi pi-check" @click="onSubmit" />
    </form>
</template>

<script>
export default {
    name: "ChangePassword",
    data() {
        return {
            cpass: "",
            npass: "",
            npass2: "",
        };
    },
    methods: {
        onSubmit(e) {
            e.preventDefault();

            if (this.cpass.length === 0) this.err("Please enter your current password.");
            else if (this.npass !== this.npass2) this.err("New passwords do not match.");
            else if (this.npass.length < 8) this.err("New password should be 8 or more characters.");
            else {
                this.$emit('new-pw', this.cpass, this.npass);

                this.cpass = "";
                this.npass = "";
                this.npass2 = "";
            }
        },
        err(message) {
            this.$toast.add({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
        }
    }
}
</script>

<style scoped>
#changePass {
    margin: 50px 30px 30px 30px;
}
</style>