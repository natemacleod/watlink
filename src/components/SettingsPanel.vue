<template>
    <TabMenu :model="items" />
    <EditProfile v-if="dispProfile" :user="user" />
    <ChangePassword v-if="dispPass" :user="user" @new-pw="newPass" />
    <div id="deleteAccount" v-if="dispDelete">
        <p>Delete</p>
    </div>
</template>

<script>
import ChangePassword from './ChangePassword.vue';
export default {
    name: "SettingsPanel",
    components: {
        ChangePassword,
    },
    props: {
        user: Object,
    },
    data() {
        return {
            items: [
                {label: 'Edit Profile', icon: 'pi pi-fw pi-user-edit', command: () => this.showProfile()},
                {label: 'Change Password', icon: 'pi pi-fw pi-lock', command: () => this.showPassword()},
                {label: 'Delete Account', icon: 'pi pi-fw pi-trash', command: () => this.showDelete()},
            ],
            dispProfile: true,
            dispPass: false,
            dispDelete: false,
        }
    },
    methods: {
        showNone() {
            this.dispProfile = false;
            this.dispPass = false;
            this.dispDelete = false;
        },
        showProfile() {
            this.showNone();
            this.dispProfile = true;
        },
        showPassword() {
            this.showNone();
            this.dispPass = true;
        },
        showDelete() {
            this.showNone();
            this.dispDelete = true;
        },
        newPass(cpass, npass) {
            this.$emit('new-pw', cpass, npass);
        }
    },
    emits: ['new-pw']
}
</script>