<template>
<div id="outer">
    <div class="event" :key="event.id" v-for="event in events">
        <EventInfo :event="event" @delete-event="$emit('delete-event', event.id)" @edit-event="$emit('edit-event', event)" />
    </div>
</div>
</template>

<script>
import EventInfo from '@/components/EventInfo';

export default {
    name: 'EventView',
    props: {
        events: Array,
    },
    components: {
        EventInfo,
    },
    emits: ['delete-event', 'edit-event'],
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
    padding: 10px;
    margin: 1%;
    border: 1px solid blue;
    border-radius: 20px;
    overflow: hidden;
    width: 400px;
    height: 500px;
}
</style>