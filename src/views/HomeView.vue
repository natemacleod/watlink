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
      <SignIn @new-user="createNewUser" @sign-in="signInUser"/>
    </DialogBox>
    <SidePane />
    <EventView :events="events" @delete-event="deleteEvent" @edit-event="toggleEditEvent" />
  </div>
</template>

<script>
import EventView from '@/components/EventView';
import AddEvent from '@/components/AddEvent';
import EditEvent from '@/components/EditEvent';
import SidePane from '@/components/SidePane';
import SignIn from '@/components/SignIn';
import { db, auth } from '@/firebaseInit';
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
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
    async addNewEvent(e) {
      try {
        const docRef = await addDoc(collection(db, "events"), {
          title: e.title,
          desc: e.desc,
          time: e.time,
        });

        this.events.push({
          id: docRef.id,
          title: e.title,
          desc: e.desc,
          time: e.time,
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
              desc: e.desc
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
    async createNewUser(email, password, name) {
      await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(this.user, {displayName: name});
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