<template>
  <MenuBar :model="items" />
  <ToastNotif />
  <div class="home">
    <DialogBox modal='true' header="Add Event" v-model:visible="dispAddEvent">
      <AddEvent @submit-event="addNewEvent" />
    </DialogBox>
    <DialogBox modal='true' header="Edit Event" v-model:visible="dispEditEvent">
      <EditEvent :event="eventToEdit" @submit-edit="editEvent" />
    </DialogBox>
    <DialogBox modal='true' header="Sign In" v-model:visible="dispSignIn">
      <SignIn @new-user="createNewUser" @sign-in="signInUser" />
    </DialogBox>
    <SidePane />
    <EventView :events="events" :user="user" @delete-event="deleteEvent" @edit-event="toggleEditEvent"
      @join-event="joinEvent" @leave-event="leaveEvent" />
  </div>
</template>

<script>
import EventView from '@/components/EventView';
import AddEvent from '@/components/AddEvent';
import EditEvent from '@/components/EditEvent';
import SidePane from '@/components/SidePane';
import SignIn from '@/components/SignIn';
import { db, auth } from '@/firebaseInit';
import { collection, getDocs, getDoc, addDoc, doc, deleteDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from '@firebase/auth';

export default {
  name: 'HomeView',
  components: {
    SidePane,
    EventView,
    AddEvent,
    EditEvent,
    SignIn,
  },
  data() {
    return {
      events: [],
      user: null,

      dispAddEvent: false,
      dispSignIn: false,
      dispEditEvent: false,
      eventToEdit: null,

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
          label: "Sign In",
          icon: 'pi pi-fw pi-sign-in',
          command: () => this.toggleSignIn(),
          visible: () => this.user === null,
        },
        {
          label: "User",
          icon: 'pi pi-fw pi-user',
          items: [
            {
              label: "Profile",
              icon: 'pi pi-fw pi-profile',
            },
            {
              label: "Sign Out",
              icon: 'pi pi-fw pi-sign-out',
              command: () => this.signOutUser(),
            }
          ],
          visible: () => this.user !== null,
        },
        {
          label: 'Settings',
          icon: 'pi pi-fw pi-cog'
        }
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
          going: [this.user.uid]
        });

        this.events.push({
          id: docRef.id,
          title: e.title,
          desc: e.desc,
          time: e.time,
          creator: this.user.uid,
          going: [this.user.uid]
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
          desc: e.desc
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
              creator: ev.creator,
              going: [ev.going]
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
              going: evGoing,
            };
          } else return ev;
        });

        this.$toast.add({ severity: 'success', summary: 'Success', detail: 'You have joined ' + await eventSnap.data().title, life: 3000 });
      } catch (err) {
        console.error("Error joining event: ", err);
        this.$toast.add({ severity: 'error', summary: 'Error', detail: 'An error occurred. Please try again.', life: 3000 });
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
              going: evGoing,
            };
          } else return ev;
        });

        this.$toast.add({ severity: 'success', summary: 'Success', detail: 'You have left ' + await eventSnap.data().title, life: 3000 });
      } catch (err) {
        console.error("Error joining event: ", err);
        this.$toast.add({ severity: 'error', summary: 'Error', detail: 'An error occurred. Please try again.', life: 3000 });
      }
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

    // Auth functions
    async createNewUser(email, password, name) {
      await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(this.user, { displayName: name });
      this.$toast.add({ severity: 'success', summary: 'Success', detail: `Welcome, ${this.user.displayName}!`, life: 3000 });
      this.toggleSignIn();
    },
    async signInUser(email, password) {
      await signInWithEmailAndPassword(auth, email, password);
      this.$toast.add({ severity: 'success', summary: 'Success', detail: `Welcome, ${this.user.displayName}!`, life: 3000 });
      this.toggleSignIn();
    },
    async signOutUser() {
      await signOut(auth);
      this.$toast.add({ severity: 'success', summary: 'Success', detail: 'Signed out successfully.', life: 3000 });
    }
  },
  async created() {
    const querySnapshot = await getDocs(collection(db, "events"));
    querySnapshot.forEach((doc) => {
      this.events.push({
        id: doc.id,
        title: doc.data().title,
        desc: doc.data().desc,
        time: doc.data().time,
        creator: doc.data().creator,
        going: doc.data().going,
      });
    });
    onAuthStateChanged(auth, (u) => {
      if (u) {
        this.user = u;
      } else this.user = null;
    });
  },
}
</script>