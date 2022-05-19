<template>
  <MenuBar :model="items" />
  <ToastNotif />
  <div class="home">
    <DialogBox modal='true' header="Add Event" v-model:visible="dispAddEvent" >
      <AddEvent @submit-event="addNewEvent"/>
    </DialogBox>
    <SidePane />
    <EventView :events="events" @delete-event="deleteEvent" />
  </div>
</template>

<script>
import EventView from '@/components/EventView';
import AddEvent from '@/components/AddEvent';
import SidePane from '@/components/SidePane';
import { db } from '@/firebaseInit';
import { collection, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore";

export default {
  name: 'HomeView',
  components: {
    SidePane,
    EventView,
    AddEvent,
  },
  data() {
    return {
      events: [],
      dispAddEvent: false,
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
          label: "User",
          icon: 'pi pi-fw pi-user',
          items: [
            {
              label: 'My Profile',
              icon: 'pi pi-fw pi-user-edit',

            },
            {
              label: 'Sign Out',
              icon: 'pi pi-fw pi-sign-out',

            },
          ]
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

      } catch (err) {
        console.error("Error adding document: ", err);
      }
    },
    async deleteEvent(id) {
      try {
        await deleteDoc(doc(db, "events", id));
        this.events = this.events.filter((e) => e.id !== id);
        this.$toast.add({severity:'success', summary: 'Success', detail:'Event was deleted successfully.', life: 3000});
      } catch (err) {
        console.error("Error deleting document: ", err);
      }
    },
    toggleAddEvent() {
      this.dispAddEvent = !this.dispAddEvent;
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
  }
}
</script>