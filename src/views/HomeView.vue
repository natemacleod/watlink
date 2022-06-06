<template>
    <div id="load" v-if="loading" >
        <ProgressSpinner />
    </div>
    <div id="site" v-else>
    <MenuBar :model="items">
        <template #end>
            <InputText type="text" v-model="query[0]" placeholder="Search" style="margin-right: 1em;" />
            <PrimeButton icon="pi pi-filter" label="Advanced Search" @click="toggleAdvSearch" v-if="user" />
        </template>
    </MenuBar>
    <ToastNotif />
    <div class="home">
        <DialogBox :modal='true' header="Add Event" v-model:visible="dispAddEvent">
            <AddEvent @submit-event="addNewEvent" />
        </DialogBox>
        <DialogBox :modal='true' header="Edit Event" v-model:visible="dispEditEvent">
            <EditEvent :event="eventToEdit" @submit-edit="editEvent" />
        </DialogBox>
        <DialogBox :modal='true' header="Sign In" v-model:visible="dispSignIn">
            <SignIn @new-user="createNewUser" @sign-in="signInUser" />
        </DialogBox>
        <DialogBox :modal='true' header="Settings" v-model:visible="dispSettings">
            <SettingsPanel :user="user" @new-pw="newPassword" @edit-profile="editProfile" @delete-account="deleteAcc" />
        </DialogBox>
        <DialogBox :modal='true' header="Advanced Search" v-model:visible="dispAdvSearch">
            <AdvancedSearch :query="query" @set-filters="setFilters" />
        </DialogBox>
        <ScrollPanel style="width:100%; height:90vh; display:inline-block" class="custom">
        <EventView :events="events" :user="user" :query="query" @delete-event="deleteEvent" @edit-event="toggleEditEvent"
            @join-event="joinEvent" @leave-event="leaveEvent" />
        </ScrollPanel>
    </div>
    </div>
</template>

<script>
import EventView from '@/components/EventView';
import AddEvent from '@/components/AddEvent';
import EditEvent from '@/components/EditEvent';
import SignIn from '@/components/SignIn';
import SettingsPanel from '@/components/SettingsPanel';
import AdvancedSearch from '@/components/AdvancedSearch';
import { db, auth } from '@/firebaseInit';
import { collection, getDocs, getDoc, addDoc, doc, deleteDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { EmailAuthProvider, deleteUser, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut, reauthenticateWithCredential, updatePassword, updateEmail } from '@firebase/auth';

export default {
    name: 'HomeView',
    components: {   
        EventView,
        AddEvent,
        EditEvent,
        SignIn,
        SettingsPanel,
        AdvancedSearch
    },
    data() {
        return {
            events: [],
            user: null,

            query: ["", true, true, true, true, true],

            dispAddEvent: false,
            dispSignIn: false,
            dispEditEvent: false,
            dispSettings: false,
            dispAdvSearch: false,

            eventToEdit: null,

            loading: true,

            items: [
                {
                    label: "Home",
                    icon: 'pi pi-fw pi-home',
                },
                {
                    label: 'Add',
                    icon: 'pi pi-fw pi-plus',
                    command: () => this.toggleAddEvent(),
                    visible: () => this.user !== null,
                },
                {
                    label: 'Settings',
                    icon: 'pi pi-fw pi-cog',
                    command: () => this.toggleSettings(),
                    visible: () => this.user !== null,
                },
                {
                    label: "Sign In",
                    icon: 'pi pi-fw pi-sign-in',
                    command: () => this.toggleSignIn(),
                    visible: () => this.user === null,
                },
                {
                    label: "Sign Out",
                    icon: 'pi pi-fw pi-sign-out',
                    command: () => this.signOutUser(),
                    visible: () => this.user !== null,
                },
            ]
        }
    },
    methods: {
        // Event functions
        async addNewEvent(e) {
            try {
                const docRef = await addDoc(collection(db, "events"), {
                    title: e.title,
                    desc: e.desc,
                    time: e.time,
                    creator: this.user.uid,
                    class: e.class,
                    clnum: e.clnum,
                    going: [this.user.uid],
                    maxGoing: e.maxGoing
                });

                this.events.push({
                    id: docRef.id,
                    title: e.title,
                    desc: e.desc,
                    time: e.time,
                    creator: this.user.uid,
                    crName: this.user.displayName,
                    class: e.class,
                    clnum: e.clnum,
                    going: [this.user.uid],
                    maxGoing: e.maxGoing
                });

                this.dispAddEvent = false;
                this.$toast.add({ severity: 'success', summary: 'Success', detail: 'Event was created successfully.', life: 3000 });

            } catch (err) {
                console.error("Error adding document: ", err);
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'An error occurred. Please try again.', life: 3000 });
            }
        },
        async editEvent(id, e) {
            try {
                const docRef = doc(db, "events", id);

                await updateDoc(docRef, {
                    title: e.title,
                    time: e.time,
                    desc: e.desc,
                    class: e.class,
                    clnum: e.clnum,
                    maxGoing: e.maxGoing
                });

                this.dispEditEvent = false;
                this.eventToEdit = null;

                this.events = this.events.map(function (ev) {
                    if (ev.id === id) {
                        return {
                            id: ev.id,
                            title: e.title,
                            time: e.time,
                            desc: e.desc,
                            class: e.class,
                            clnum: e.clnum,
                            creator: ev.creator,
                            crName: ev.crName,
                            going: ev.going,
                            maxGoing: e.maxGoing,
                        };
                    } else return ev;
                });

                this.$toast.add({ severity: 'success', summary: 'Success', detail: 'Event was edited successfully.', life: 3000 });

            } catch (err) {
                console.error("Error editing document: ", err);
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'An error occurred. Please try again.', life: 3000 });
            }
        },
        async deleteEvent(id) {
            try {
                await deleteDoc(doc(db, "events", id));
                this.events = this.events.filter((e) => e.id !== id);
                this.$toast.add({ severity: 'success', summary: 'Success', detail: 'Event was deleted successfully.', life: 3000 });
            } catch (err) {
                console.error("Error deleting document: ", err);
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'An error occurred. Please try again.', life: 3000 });
            }
        },
        async joinEvent(id) {
            try {
                const event = doc(db, "events", id);
                const eventSnap = await getDoc(event);
                const evGoing = await eventSnap.data().going;
                const max = await eventSnap.data().maxGoing;

                if (evGoing.length === max) throw new Error("This event is full.");

                evGoing.push(this.user.uid);

                await updateDoc(event, {
                    going: arrayUnion(this.user.uid)
                });

                this.events = this.events.map(function (ev) {
                    if (ev.id === id) {
                        return {
                            id: ev.id,
                            title: ev.title,
                            time: ev.time,
                            desc: ev.desc,
                            creator: ev.creator,
                            crName: ev.crName,
                            class: ev.class,
                            clnum: ev.clnum,
                            going: evGoing,
                            maxGoing: ev.maxGoing
                        };
                    } else return ev;
                });

                this.$toast.add({ severity: 'success', summary: 'Success', detail: 'You have joined ' + await eventSnap.data().title, life: 3000 });
            } catch (err) {
                if (err.message === "This event is full.") this.$toast.add({ severity: 'error', summary: 'Event Full', detail: 'Sorry, this event is already full', life: 3000 });
                else {
                    console.error("Error joining event: ", err);
                    this.$toast.add({ severity: 'error', summary: 'Error', detail: 'An error occurred. Please try again.', life: 3000 });
                }
            }
        },
        async leaveEvent(id) {
            try {
                const event = doc(db, "events", id);
                const eventSnap = await getDoc(event);
                const evGoing = await eventSnap.data().going;

                for (let i = 0; i < evGoing.length; i++) {
                    if (evGoing[i] === this.user.uid) evGoing.splice(i, 1);
                }

                await updateDoc(event, {
                    going: arrayRemove(this.user.uid)
                });

                this.events = this.events.map(function (ev) {
                    if (ev.id === id) {
                        return {
                            id: ev.id,
                            title: ev.title,
                            time: ev.time,
                            desc: ev.desc,
                            creator: ev.creator,
                            crName: ev.crName,
                            class: ev.class,
                            clnum: ev.clnum,
                            going: evGoing,
                            maxGoing: ev.maxGoing
                        };
                    } else return ev;
                });

                this.$toast.add({ severity: 'success', summary: 'Success', detail: 'You have left ' + await eventSnap.data().title, life: 3000 });
            } catch (err) {
                console.error("Error leaving event: ", err);
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'An error occurred. Please try again.', life: 3000 });
            }
        },
        setFilters(filters) {
            this.query = filters[0];
            if (filters[1]) this.dispAdvSearch = false;
        },

        // Toggles
        toggleAddEvent() {
            this.dispAddEvent = !this.dispAddEvent;
        },
        toggleEditEvent(e) {
            this.eventToEdit = e;
            this.dispEditEvent = !this.dispEditEvent;
        },
        toggleSignIn() {
            this.dispSignIn = !this.dispSignIn;
        },
        toggleSettings() {
            this.dispSettings = !this.dispSettings;
        },
        toggleAdvSearch() {
            this.dispAdvSearch = !this.dispAdvSearch;
        },

        // Auth functions
        async createNewUser(email, password, name) {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                await addDoc(collection(db, "users"), {
                    name: name,
                    email: email
                });
                updateProfile(this.user, { displayName: name });
                this.$toast.add({ severity: 'success', summary: 'Success', detail: `Welcome, ${name}!`, life: 3000 });
                this.toggleSignIn();
            } catch (err) {
                if (err.message === 'Firebase: Error (auth/email-already-in-use).') {
                    this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Email already in use. Did you mean to sign in?', life: 3000 });
                } else this.$toast.add({ severity: 'error', summary: 'Error', detail: 'An error occurred.' + err.message, life: 3000 });
            }
        },
        async signInUser(email, password) {
            try {
                await signInWithEmailAndPassword(auth, email, password);
                this.$toast.add({ severity: 'success', summary: 'Success', detail: `Welcome back, ${this.user.displayName}!`, life: 3000 });
                this.toggleSignIn();
            } catch (err) {
                if (err.message === 'Firebase: Error (auth/wrong-password).') {
                    this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Incorrect password.', life: 3000 });
                } else if (err.message === 'Firebase: Error (auth/user-not-found).') {
                    this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Account not found.', life: 3000 });
                } else this.$toast.add({ severity: 'error', summary: 'Error', detail: 'An error occurred.', life: 3000 });
            }
        },
        async signOutUser() {
            try {
                await signOut(auth);
                this.$toast.add({ severity: 'success', summary: 'Success', detail: 'Signed out successfully.', life: 3000 });
            } catch (err) {
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'An error occurred.', life: 3000 });
            }
        },
        async reAuth(pw) {
            try {
                const credential = EmailAuthProvider.credential(auth.currentUser.email, pw);
                const res = await reauthenticateWithCredential(auth.currentUser, credential);
                return res;
            } catch (e) {
                if (e.message === "Firebase: Error (auth/wrong-password).") this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Incorrect password.', life: 3000 });
                else this.$toast.add({ severity: 'error', summary: 'Error', detail: 'An error occurred.', life: 3000 });
            }
        },
        async newPassword(cpass, npass) {
            const res = await this.reAuth(cpass);
            if (res) {
                try {
                    updatePassword(this.user, npass);
                    this.$toast.add({ severity: 'success', summary: 'Success', detail: 'Password changed successfully.', life: 3000 });
                } catch (e) {
                    this.$toast.add({ severity: 'error', summary: 'Error', detail: 'An error occurred.', life: 3000 });
                }
            }
        },
        async editProfile(info) {
            const res = await this.reAuth(info.pass);
            if (res) {
                try {
                    if (info.dn !== this.user.displayName) {
                        updateProfile(this.user, {displayName: info.dn});
                        this.$toast.add({ severity: 'success', summary: 'Success', detail: 'Profile changed succesfully. You may need to refresh to see changes.', life: 3000 })
                    }
                    if (info.email !== this.user.email) {
                        updateEmail(this.user, info.email);
                        this.$toast.add({ severity: 'success', summary: 'Success', detail: 'A new verification email has been sent to ' + info.email + '.', life: 3000 })
                    }
                    await updateDoc(doc(db, "users", this.user.uid), {
                        name: info.dn,
                        email: info.email
                    });
                } catch (err) {
                    this.$toast.add({ severity: 'error', summary: 'Error', detail: 'An error occurred.', life: 3000 });
                }
            }
        },
        async deleteAcc(pass) {
            // Remove all events created by uid, Remove all instances of uid from events
            const querySnapshot = await getDocs(collection(db, "events"));
            querySnapshot.forEach((d) => {
                if (d.data().creator === this.user.uid) {
                    deleteDoc(doc(db, "events", d.id));
                } else if (d.data().going.includes(this.user.uid)) updateDoc(doc(db, "events", d.id), {
                    going: arrayRemove(this.user.uid)
                });
            });

            // Reauthenticate
            await this.reAuth(pass);

            // Remove uid from system
            await deleteDoc(doc(db, "users", this.user.uid));
            await deleteUser(this.user);
            this.$toast.add({ severity: 'success', summary: 'Success', detail: 'Account deleted successfully. You may need to refresh to see changes.', life: 3000 });
            this.toggleSettings();
        }
    },
    async created() {
        const querySnapshot = await getDocs(collection(db, "events"));
        querySnapshot.forEach(event => {
            this.events.push({
                id: event.id,
                title: event.data().title,
                desc: event.data().desc,
                time: event.data().time,
                creator: event.data().creator,
                class: event.data().class,
                clnum: event.data().clnum,
                going: event.data().going,
                maxGoing: event.data().maxGoing
            });
        });

        for (let i = 0; i < this.events.length; i++) {
            const userRef = await getDoc(doc(db, "users", this.events[i].creator));
            this.events[i] = {
                id: this.events[i].id,
                title: this.events[i].title,
                desc: this.events[i].desc,
                time: this.events[i].time,
                creator: this.events[i].creator,
                crName: userRef.data().name,
                class: this.events[i].class,
                clnum: this.events[i].clnum,
                going: this.events[i].going,
                maxGoing: this.events[i].maxGoing
            };
        }

        onAuthStateChanged(auth, (u) => {
            if (u) {
                this.user = u;
            } else this.user = null;
        });
        this.loading = false;
    },
}
</script>

<style>

:root {
    --primary-color: rgb(255, 213, 61) !important;
}

* {
    margin: 0;
}

.p-progress-spinner-svg {
    height: 95% !important;
}

.custom .p-scrollpanel-wrapper {
    border-right: 9px solid #cccccc !important;
}

.custom .p-scrollpanel-bar {
    background-color: #1976d2 !important;
    opacity: 1;
    transition: background-color .3s;
}

.custom .p-scrollpanel-bar:hover {
    background-color: #135ba1 !important;
}

#load {
    margin: auto;
    width: 10%;
    display: table;
    height: 100vh;
}

#load * {
    width: 100%;
    display: table-cell;
    vertical-align: middle;
}

</style>