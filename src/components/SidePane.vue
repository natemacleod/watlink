<template>
    <div id="spdiv">
        <nav>
            <button :class="sidePaneStatus === 'search' ? 'btn btnred' : 'btn btngreen'" @click="showSearch">Search</button>
            <button :class="sidePaneStatus === 'addEvent' ? 'btn btnred' : 'btn btngreen'" @click="showAddEvent">Add</button>
            <button :class="sidePaneStatus === 'profile' ? 'btn btnred' : 'btn btngreen'" @click="showProfile">Profile</button>
        </nav>
        <SearchPane v-if="this.sidePaneStatus === 'search'" />
        <AddEvent @submit-event="passEvent" v-if="this.sidePaneStatus === 'addEvent'" />
    </div>
</template>

<script>
import SearchPane from '@/components/SearchPane';
import AddEvent from '@/components/AddEvent';

export default {
    name: 'SidePane',
    data() {
        return {
            sidePaneStatus: "search"
        }
    },
    components: {
        SearchPane,
        AddEvent,
    },
    methods: {
        showAddEvent() {
            this.sidePaneStatus = "addEvent";
        },
        showProfile() {
            this.sidePaneStatus = "profile";
        },
        showSearch() {
            this.sidePaneStatus = "search";
        },
        passEvent(e) {
            this.$emit('submit-event', e);
            this.sidePaneStatus = 'search';
        }
    },
    emits: ['submit-event'],
}
</script>

<style scoped>
#spdiv {
    border: 1px solid red;
    float: left;
    height: 90vh;
    width: 25%;
}

.btnred { 
    background-color: red;
}

.btngreen { 
    background-color: green;
}

nav * {
    display: inline-block;
    margin: 10px;
    padding: 10px;
}
</style>