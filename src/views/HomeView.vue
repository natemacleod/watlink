<template>
  <div class="home">
    <SidePane @submit-event="addNewEvent" />
    <EventView :events="events"/>
  </div>
</template>

<script>
import EventView from '@/components/EventView';
import SidePane from '@/components/SidePane';
import { db } from '@/firebaseInit';
import { collection, getDocs, addDoc } from "firebase/firestore";

export default {
  name: 'HomeView',
  components: {
    SidePane,
    EventView,
  },
  data() {
    return {
      events: [],
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

      } catch (err) {
        console.error("Error adding document: ", err);
      }
    },
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