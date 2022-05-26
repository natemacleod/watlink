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
        query: String,
    },
    components: {
        EventInfo,
    },
    emits: ['delete-event', 'edit-event', 'join-event', 'leave-event'],
    methods: {
        matchesQuery(e) {
            const q = this.query.toLowerCase();
            if (e.title.toLowerCase().includes(q) || e.time.toLowerCase().includes(q) || e.desc.toLowerCase().includes(q)) return true;
            else return false;
        }
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