<template>
    <div id="box">
        <form id="signInForm" class="authForm">
            <h3>Sign In</h3>
            <br>
            <span class="p-float-label">
                <InputText class="spacing" id="email" type="email" v-model="email" />
                <label for="email">Email</label>
            </span>
            <br><br>
            <span class="p-float-label">
                <PasswordInput class="spacing" id="pass" :feedback="false" toggleMask inputStyle="width:300px;" v-model="pass" />
                <label for="pass">Password</label>
            </span>
            <br><br>
            <PrimeButton class="center" label="Sign In" icon="pi pi-sign-in" @click="onSubmit" />
        </form>
        <DividerLine layout="vertical" class="authForm" />
        <form id="createForm" class="authForm">
            <h3>or Create an Account</h3>
            <br>
            <span class="p-float-label">
                <InputText class="spacing" id="cemail" type="email" v-model="cemail" />
                <label for="cemail">Email</label>
            </span>
            <br><br>
            <span class="p-float-label">
                <InputText class="spacing" id="cname" type="text" v-model="cname" />
                <label for="cname">Your Name</label>
            </span>
            <br><br>
            <span class="p-float-label">
                <PasswordInput class="spacing" id="cpass" v-model="cpass" :feedback="false" toggleMask inputStyle="width:300px;" />
                <label for="cpass">Password</label>
            </span>
            <br><br>
            <span class="p-float-label">
                <PasswordInput class="spacing" id="cpass2" :feedback="false" toggleMask inputStyle="width:300px;" v-model="cpass2" />
                <label for="cpass2">Repeat Password</label>
            </span>
            <br><br>
            <PrimeButton class="center" label="Create Account" icon="pi pi-check" @click="createAccount" />
        </form>
    </div>
</template>

<script>
export default {
    name: 'SignIn',
    data() {
        return {
            email: "",
            pass: '',
            cemail: '',
            cpass: '',
            cpass2: '',
            cname: '',
        };
    },
    methods: {
        onSubmit(e) {
            e.preventDefault();
            const re = new RegExp(/^[\w-.+]+@([\w-]+\.)+[\w-]{2,4}$/i);

            if (this.email.trim().length === 0) this.err("You must include an email address.");
            else if (!re.test(this.email)) this.err("Invalid email.");
            else {
                this.$emit('sign-in', this.email, this.pass);

                this.email = "";
                this.pass = '';
                this.cemail = '';
                this.cpass = '';
                this.cpass2 = '';
                this.cname = '';
            }
        },
        createAccount(e) {
            e.preventDefault();

            const re = new RegExp(/^[\w-.+]+@([\w-]+\.)+[\w-]{2,4}$/i);

            if (this.cemail.trim().length === 0) this.err("You must include an email address.");
            else if (this.cname.trim().length === 0) this.err("You must include a display name.");
            else if (this.cname.length > 50) this.err("Display name should be 50 or fewer characters.");
            else if (!re.test(this.cemail)) this.err("Invalid email.");
            else if (this.cpass.length < 8) this.err("Password should be 8 or more characters.");
            else if (this.cpass2.length === 0) this.err("Please confirm your password.");
            else if (this.cpass !== this.cpass2) this.err("Passwords do not match.");
            else {
                this.$emit('new-user', this.cemail, this.cpass, this.cname);

                this.email = "";
                this.pass = '';
                this.cemail = '';
                this.cpass = '';
                this.cpass2 = '';
                this.cname = '';
            }
        },
        err(message) {
            this.$toast.add({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
        }
    }
}
</script>

<style scoped>
#box {
    display: flex;
}

.authForm {
    margin: 30px;
}

.spacing {
    min-width: 300px;
}
</style>