<template>
    <div id="outer">
        <div class="event" :key="event.id" v-for="event in events">
            <EventInfo :event="event" :user="user" @delete-event="$emit('delete-event', event.id)"
                @edit-event="$emit('edit-event', event)" @join-event="$emit('join-event', event.id)"
                @leave-event="$emit('leave-event', event.id)" />
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
    },
    components: {
        EventInfo,
    },
    emits: ['delete-event', 'edit-event', 'join-event', 'leave-event'],
}
</script>

<style scoped>
#outer {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    border: 1px solid green;
    height: 90vh;
    overflow: auto;
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