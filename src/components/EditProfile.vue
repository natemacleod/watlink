<template>
    <form id="changeProfile">
        <span class="p-float-label">
        <InputText id="email" type="email" v-model="email" style="width:340px;" />
        <label for="email">Email (Private)</label>
        </span>
        <br><br>
        <span class="p-float-label">
        <InputText id="dn" type="text" v-model="dn" style="width:340px;" />
        <label for="dn">Display Name (Public)</label>
        </span>
        <br><br>
        <span class="p-float-label">
        <PasswordInput id="pass" :feedback="false" toggleMask inputStyle="width:340px;" v-model="pass" />
        <label for="pass">Current Password</label>
        </span>
        <br><br>
        <PrimeButton class="center" label="Submit Changes" icon="pi pi-check" @click="onSubmit" />
    </form>
</template>

<script>
export default {
    name: "EditProfile",
    props: {
        user: Object,
    },
    data() {
        return {
            email: this.user.email,
            dn: this.user.displayName,
            pass: "",
        };
    },
    methods: {
        onSubmit(e) {
            e.preventDefault();

            const re = new RegExp(/^[\w-.+]+@([\w-]+\.)+[\w-]{2,4}$/i);

            if (this.pass.length === 0) this.err("Please enter your password.");
            else if (this.dn.trim().length === 0) this.err("You must include a display name.");
            else if (this.dn.length > 50) this.err("Display name should be 50 or fewer characters.");
            else if (this.email.trim().length === 0) this.err("Please enter an email.");
            else if (!re.test(this.email)) this.err("Invalid email.");
            else {
                const userInfo = {
                    email: this.email,
                    dn: this.dn,
                    pass: this.pass,
                };

                this.$emit('edit-profile', userInfo);

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
#changeProfile {
    margin: 50px 30px 30px 30px;
}
</style>