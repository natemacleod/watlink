<template>
    <div id="outer">
        <div v-for="event in events" :key="event.id">
            <div class="event" v-if="matchesQuery(event)">
                <EventInfo :event="event" :user="user" @delete-event="$emit('delete-event', event.id)"
                    @edit-event="$emit('edit-event', event)" @join-event="$emit('join-event', event.id)"
                    @leave-event="$emit('leave-event', event.id)" />
            </div>
        </div>
    </div>
</template>

<script>
import EventInfo from '@/components/EventInfo';

export default {
    name: 'EventView',
    props: {
        events: Array,
        user: Object,
        query: Array,
    },
    components: {
        EventInfo,
    },
    emits: ['delete-event', 'edit-event', 'join-event', 'leave-event'],
    methods: {
        matchesQuery(e) {
            const q = this.query[0].toLowerCase();
            if (e.title.toLowerCase().includes(q) || e.time.toLowerCase().includes(q) || e.desc.toLowerCase().includes(q)) {
                if (!this.user) return true;
                else return (this.sat1(e) && (this.query[2] === this.sat2(e) || this.query[3] !== this.sat2(e)) && (this.query[4] === this.sat4(e) || this.query[5] !== this.sat4(e)));
            } else return false;
        },
        sat1(e) {
            if (this.query[1]) return true;
            else if (!e.maxGoing) return true;
            else return (e.going.length < e.maxGoing);
        },
        sat2(e) {
            return (e.creator === this.user.uid);
        },
        sat4(e) {
            return (e.going.includes(this.user.uid));
        },
    }
}
</script>

<style scoped>
#outer {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    border: 1px solid green;
    align-items: flex-start;
}

.event {
    margin: 1%;
    border: 1px solid blue;
    overflow: hidden;
    width: 400px;
    height: 500px;
}
</style>