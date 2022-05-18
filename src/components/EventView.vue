<template>
<div id="outer">
    <div class="event" :key="event.id" v-for="event in events">
        <EventInfo :event="event" />
    </div>
    <!--<AddBtn @add-event="$emit('add-event')" />-->
</div>
</template>

<script>
import EventInfo from '@/components/EventInfo';
//import AddBtn from '@/components/AddBtn';

export default {
    name: 'EventView',
    props: {
        events: Array,
    },
    components: {
        EventInfo,
        //AddBtn
    },
    //emits: ['add-event'],
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