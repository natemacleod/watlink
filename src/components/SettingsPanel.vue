<template>
    <div id="settings">
        <TabMenu :model="items" />
        <EditProfile v-if="dispProfile" :user="user" @edit-profile="editProfile" />
        <ChangePassword v-if="dispPass" @new-pw="newPass" />
        <DeleteAccount v-if="dispDelete" @delete-account="deleteAcc" />
    </div>
</template>

<script>
import ChangePassword from './ChangePassword.vue';
import EditProfile from './EditProfile.vue';
import DeleteAccount from './DeleteAccount.vue';
export default {
    name: "SettingsPanel",
    components: {
        ChangePassword,
        EditProfile,
        DeleteAccount,
    },
    props: {
        user: Object,
    },
    data() {
        return {
            items: [
                { label: 'Edit Profile', icon: 'pi pi-fw pi-user-edit', command: () => this.showProfile() },
                { label: 'Change Password', icon: 'pi pi-fw pi-lock', command: () => this.showPassword() },
                { label: 'Delete Account', icon: 'pi pi-fw pi-trash', command: () => this.showDelete() },
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
        },
        editProfile(userInfo) {
            this.$emit('edit-profile', userInfo);
        },
        deleteAcc(pass) {
            this.$emit('delete-account', pass);
        }
    },
    emits: ['new-pw', 'edit-profile', 'delete-account']
}
</script>

<style scoped>
#settings {
    width: 400px;
    height: 400px;
}
</style>