<template>
    <div id="outer">
        <div v-for="event in events.slice(0, getLimit())" :key="event.id">
            <div class="eventshell" v-if="matchesQuery(event)">
                <div class="event">
                    <EventInfo :event="event" :user="user" @delete-event="$emit('delete-event', event.id)"
                        @edit-event="$emit('edit-event', event)" @join-event="$emit('join-event', event.id)"
                        @leave-event="$emit('leave-event', event.id)" />
                </div>
            </div>
        </div>
    </div>
    <h4 style="margin: 0 5px 20px 15px; color:#dedede; display: inline-block;">Showing <strong>{{ amountShown
    }}</strong> of {{ events.length }} events</h4>
    <PrimeButton icon="pi pi-plus" label="Show More" @click="lim += 25"
        style="margin: 10px; align-self:center; display: inline-block;" />
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
    data() {
        return {
            lim: 25,
            amountShown: 0,
        }
    },
    emits: ['delete-event', 'edit-event', 'join-event', 'leave-event'],
    methods: {
        matchesQuery(e) {
            if (!e) return false;
            const q = this.query[0].toLowerCase();
            if (e.title.toLowerCase().includes(q) || (e.time != "No time specified" && e.time.toLowerCase().includes(q)) || e.desc.toLowerCase().includes(q) ||
                (e.class + "" + e.clnum).toLowerCase().includes(q) || (e.class + " " + e.clnum).toLowerCase().includes(q)) {
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
        getLimit() {
            let howManyLeft = this.lim;
            let i = 0;
            while (howManyLeft > 0) {
                if (this.matchesQuery(this.events[i])) howManyLeft--;
                i++;
                if (i >= this.events.length) break;
            }
            this.amountShown = this.lim - howManyLeft;
            return i;
        },
    }
}
</script>

<style scoped>
#outer {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    align-items: flex-start;
    min-height: 90%;
}

.eventshell {
    margin: 0 0.5vw 0.5% 0;
    overflow: hidden;
    width: 400px;
    height: 505px;
}
</style>